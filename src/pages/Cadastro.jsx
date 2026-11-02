import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserPlus,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const inputClass =
  "h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const iconClass =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";

function Field({ id, label, icon: Icon, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base font-medium text-navy"
      >
        {label}
      </label>
      <div className="relative">
        <Icon size={20} className={iconClass} />
        {children}
      </div>
    </div>
  );
}

function PasswordToggle({ visible, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
    >
      {visible ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
}

export default function Cadastro() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdName, setCreatedName] = useState(null); // abre o pop-up
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Com o pop-up aberto, apertar Esc também leva para o login
  useEffect(() => {
    if (!createdName) return;

    function handleEscape(event) {
      if (event.key === "Escape") navigate("/login");
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [createdName, navigate]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError(
        "As senhas não são iguais. Digite a mesma senha nos dois campos.",
      );
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name },
      },
    });

    if (signUpError) {
      console.error(signUpError);
      setLoading(false);
      setError(
        "Não foi possível criar a conta. O e-mail já pode estar em uso.",
      );
      return;
    }

    // Encerra a sessão aberta automaticamente, para a pessoa entrar pelo login
    await supabase.auth.signOut({ scope: "local" });

    setLoading(false);
    setCreatedName(form.name.trim());
  }

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50 px-4 py-10">
      <section className="w-full max-w-[530px] rounded-3xl bg-white  p-[30px] mb-[250px]  shadow-xl shadow-navy/5 sm:px-12">
        <h1 className="text-4xl font-bold text-navy">Crie sua conta</h1>
        <p className="mt-3 text-lg leading-snug text-gray-500">
          Preencha os dados abaixo para começar a aprender.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Field id="name" label="Nome completo" icon={UserRound}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={inputClass}
            />
          </Field>

          <Field id="email" label="E-mail" icon={Mail}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className={inputClass}
            />
          </Field>

          <Field id="password" label="Senha" icon={LockKeyhole}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo de 8 caracteres"
              className={`${inputClass} pr-12`}
            />
            <PasswordToggle
              visible={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </Field>

          <Field
            id="confirmPassword"
            label="Confirmar senha"
            icon={LockKeyhole}
          >
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              className={`${inputClass} pr-12`}
            />
            <PasswordToggle
              visible={showConfirm}
              onClick={() => setShowConfirm((prev) => !prev)}
            />
          </Field>

          {/* Termos */}
          <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="terms"
              required
              checked={form.terms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-primary"
            />
            <span>
              Li e aceito os{" "}
              <Link
                to="/termos"
                className="font-medium text-primary transition-colors hover:text-primary-dark"
              >
                termos de uso
              </Link>{" "}
              e a{" "}
              <Link
                to="/privacidade"
                className="font-medium text-primary transition-colors hover:text-primary-dark"
              >
                política de privacidade
              </Link>
              .
            </span>
          </label>

          {/* Erro */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Botão Cadastrar */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-base font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <UserPlus size={20} />
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Entrar
          </Link>
        </p>
      </section>

      {/* Pop-up de conta criada */}
      {createdName && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="w-full max-w-[420px] rounded-3xl bg-white px-8 py-10 text-center shadow-2xl">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={44} strokeWidth={1.8} />
            </span>

            <h2
              id="success-title"
              className="mt-6 text-2xl font-bold text-navy"
            >
              Conta criada com sucesso!
            </h2>

            <p className="mt-3 text-gray-500">Seja bem-vindo(a),</p>
            <p className="mt-1 break-words text-xl font-semibold text-primary">
              {createdName}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Agora faça login para começar a aprender.
            </p>

            <button
              type="button"
              autoFocus
              onClick={() => navigate("/login")}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              Ir para o login
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
