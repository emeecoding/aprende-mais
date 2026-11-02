import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  GraduationCap,
  KeyRound,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const inputClass =
  "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

const emptyProfile = {
  name: "",
  cpf: "",
  birth_date: "",
  phone: "",
  pronouns: "",
  bio: "",
  avatar_url: "",
  education_level: "",
  school: "",
  grade: "",
  instagram: "",
  linkedin: "",
};

const tabs = [
  { id: "perfil", label: "Meu Perfil", icon: UserRound },
  { id: "social", label: "Social e Escolaridade", icon: GraduationCap },
  { id: "seguranca", label: "Acesso e Segurança", icon: KeyRound },
];

function maskCPF(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function getInitials(name) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Field({ id, label, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("perfil");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [passwords, setPasswords] = useState({ newPassword: "", confirm: "" });

  useEffect(() => {
    let active = true;

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Só quem está logado pode ver esta página
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const currentUser = session.user;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (!active) return;

      const merged = { ...emptyProfile };
      if (data) {
        for (const key of Object.keys(emptyProfile)) {
          merged[key] = data[key] ?? "";
        }
      }
      if (!merged.name) merged.name = currentUser.user_metadata?.name ?? "";

      setUser(currentUser);
      setProfile(merged);
      setLoading(false);
    }

    load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login", { replace: true });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    let next = value;
    if (name === "cpf") next = maskCPF(value);
    if (name === "phone") next = maskPhone(value);

    setProfile((prev) => ({ ...prev, [name]: next }));
    setMessage(null);
  }

  async function handleSave(event) {
    event.preventDefault();
    setMessage(null);

    if (!profile.name.trim()) {
      setMessage({ type: "error", text: "O nome completo é obrigatório." });
      return;
    }

    setSaving(true);

    const payload = {};
    for (const [key, value] of Object.entries(profile)) {
      payload[key] = typeof value === "string" ? value.trim() || null : value;
    }
    payload.name = profile.name.trim();
    delete payload.avatar_url; // a foto é salva no momento do envio

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", user.id)
      .select();

    if (error || !data?.length) {
      console.error(error);
      setSaving(false);
      setMessage({
        type: "error",
        text: "Não foi possível salvar. Tente novamente.",
      });
      return;
    }

    // Atualiza o nome que aparece no header
    await supabase.auth.updateUser({ data: { name: payload.name } });

    setSaving(false);
    setMessage({ type: "success", text: "Alterações salvas com sucesso!" });
  }

  async function handleAvatar(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Escolha um arquivo de imagem." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "A imagem deve ter até 2 MB." });
      return;
    }

    setUploading(true);
    setMessage(null);

    const path = `${user.id}/avatar`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      console.error(uploadError);
      setUploading(false);
      setMessage({ type: "error", text: "Não foi possível enviar a foto." });
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = `${data.publicUrl}?t=${Date.now()}`;

    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", user.id);

    setUploading(false);

    if (dbError) {
      console.error(dbError);
      setMessage({ type: "error", text: "Não foi possível salvar a foto." });
      return;
    }

    // Avisa o header para trocar a foto na hora
    await supabase.auth.updateUser({ data: { avatar_url: url } });

    setProfile((prev) => ({ ...prev, avatar_url: url }));
    setMessage({ type: "success", text: "Foto atualizada!" });
  }

  async function handlePassword(event) {
    event.preventDefault();
    setMessage(null);

    if (passwords.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "A nova senha precisa ter pelo menos 8 caracteres.",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      setMessage({ type: "error", text: "As senhas não são iguais." });
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: passwords.newPassword,
    });
    setSaving(false);

    if (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Não foi possível alterar a senha. Tente novamente.",
      });
      return;
    }

    setPasswords({ newPassword: "", confirm: "" });
    setMessage({ type: "success", text: "Senha alterada com sucesso!" });
  }

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-90px)] items-center justify-center bg-gray-50">
        <p className="text-gray-500">Carregando perfil...</p>
      </main>
    );
  }

  const saveButton = (
    <div className="mt-8 flex justify-end">
      <button
        type="submit"
        disabled={saving}
        className="h-12 rounded-xl bg-primary px-10 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saving ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-navy">Minha Conta</h1>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start">
          {/* Menu lateral */}
          <nav
            aria-label="Seções da conta"
            className="w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white md:w-64"
          >
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTab(id);
                  setMessage(null);
                }}
                aria-current={tab === id ? "page" : undefined}
                className={`flex w-full items-center gap-3 border-b border-gray-100 px-4 py-4 text-left text-sm font-medium transition-colors last:border-b-0 ${
                  tab === id
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          {/* Conteúdo */}
          <section className="min-w-0 flex-1 rounded-xl bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
            {message && (
              <p
                role="alert"
                className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* ABA: Meu Perfil */}
            {tab === "perfil" && (
              <form onSubmit={handleSave}>
                <h2 className="text-lg font-semibold text-navy">
                  Dados Pessoais
                </h2>

                <div className="mt-8 flex flex-col gap-8 sm:flex-row">
                  {/* Foto */}
                  <div className="flex shrink-0 justify-center sm:block">
                    <div className="relative h-32 w-32">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Foto de perfil"
                          className="h-32 w-32 rounded-full border-4 border-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-100 bg-primary text-4xl font-bold text-white">
                          {getInitials(profile.name)}
                        </div>
                      )}

                      <label
                        htmlFor="avatar"
                        className={`absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-primary-dark ${
                          uploading ? "opacity-70" : ""
                        }`}
                        title="Alterar foto"
                      >
                        <Camera size={18} />
                        <span className="sr-only">Alterar foto de perfil</span>
                      </label>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatar}
                        disabled={uploading}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Nome, CPF e nascimento */}
                  <div className="min-w-0 flex-1 space-y-5">
                    <Field id="name" label="Nome Completo">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={profile.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="cpf" label="CPF">
                        <input
                          id="cpf"
                          name="cpf"
                          type="text"
                          inputMode="numeric"
                          value={profile.cpf}
                          onChange={handleChange}
                          placeholder="000.000.000-00"
                          className={inputClass}
                        />
                      </Field>

                      <Field id="birth_date" label="Data de Nascimento">
                        <input
                          id="birth_date"
                          name="birth_date"
                          type="date"
                          value={profile.birth_date}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <Field id="phone" label="Telefone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="pronouns" label="Pronomes">
                    <input
                      id="pronouns"
                      name="pronouns"
                      type="text"
                      value={profile.pronouns}
                      onChange={handleChange}
                      placeholder="Ex.: Ele/Dele, Ela/Dela, Elu/Delu"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="bio" label="Bio">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={5}
                      maxLength={300}
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Conte um pouco sobre você"
                      className={`${inputClass} h-auto min-h-[130px] resize-y py-3`}
                    />
                    <p className="mt-1 text-right text-xs text-gray-400">
                      {profile.bio.length}/300
                    </p>
                  </Field>
                </div>

                {saveButton}
              </form>
            )}

            {/* ABA: Social e Escolaridade */}
            {tab === "social" && (
              <form onSubmit={handleSave}>
                <h2 className="text-lg font-semibold text-navy">
                  Escolaridade
                </h2>

                <div className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="education_level" label="Nível de escolaridade">
                      <select
                        id="education_level"
                        name="education_level"
                        value={profile.education_level}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Selecione</option>
                        <option>Ensino Fundamental</option>
                        <option>Ensino Médio</option>
                        <option>Ensino Técnico</option>
                        <option>Ensino Superior</option>
                        <option>Pós-graduação</option>
                        <option>Outro</option>
                      </select>
                    </Field>

                    <Field id="grade" label="Série / Ano / Período">
                      <input
                        id="grade"
                        name="grade"
                        type="text"
                        value={profile.grade}
                        onChange={handleChange}
                        placeholder="Ex.: 8º ano, 3º período"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field id="school" label="Instituição de ensino">
                    <input
                      id="school"
                      name="school"
                      type="text"
                      value={profile.school}
                      onChange={handleChange}
                      placeholder="Nome da escola ou universidade"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <h2 className="mt-10 text-lg font-semibold text-navy">
                  Redes sociais
                </h2>

                <div className="mt-6 space-y-5">
                  <Field id="instagram" label="Instagram">
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={profile.instagram}
                      onChange={handleChange}
                      placeholder="@seuusuario"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="linkedin" label="LinkedIn">
                    <input
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      value={profile.linkedin}
                      onChange={handleChange}
                      placeholder="linkedin.com/in/seuusuario"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {saveButton}
              </form>
            )}

            {/* ABA: Acesso e Segurança */}
            {tab === "seguranca" && (
              <form onSubmit={handlePassword}>
                <h2 className="text-lg font-semibold text-navy">
                  Acesso e Segurança
                </h2>

                <div className="mt-6 space-y-5">
                  <Field id="email" label="E-mail de acesso">
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className={inputClass}
                    />
                  </Field>

                  <Field id="newPassword" label="Nova senha">
                    <input
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.newPassword}
                      onChange={(e) => {
                        setPasswords((p) => ({
                          ...p,
                          newPassword: e.target.value,
                        }));
                        setMessage(null);
                      }}
                      placeholder="Mínimo de 8 caracteres"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="confirmPassword" label="Confirmar nova senha">
                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.confirm}
                      onChange={(e) => {
                        setPasswords((p) => ({
                          ...p,
                          confirm: e.target.value,
                        }));
                        setMessage(null);
                      }}
                      placeholder="Digite a nova senha novamente"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="h-12 rounded-xl bg-primary px-10 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Salvando..." : "Alterar senha"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
