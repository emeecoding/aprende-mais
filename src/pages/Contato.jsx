import { useEffect, useState } from "react";
import {
  AtSign,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import { supabase } from "../lib/supabase";

// TROQUE pelos dados reais do seu projeto
const contactInfo = [
  {
    icon: Mail,
    title: "E-mail",
    value: "emersonestagiario@outlook.com",
    href: "mailto:contato@aprendemais.com.br",
  },
  {
    icon: AtSign,
    title: "Redes sociais",
    value: "@aprendemais",
  },
  {
    icon: Clock,
    title: "Horário de atendimento",
    value: "Segunda a sexta, das 8h às 18h",
  },
];

const subjects = [
  "Dúvida sobre os conteúdos",
  "Problema técnico",
  "Sugestão ou elogio",
  "Parceria",
  "Outro assunto",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "", // campo escondido: se vier preenchido, é um robô
};

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contato() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Se a pessoa estiver logada, já preenche nome e e-mail
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (!user) return;

      setForm((prev) => ({
        ...prev,
        name: prev.name || user.user_metadata?.name || "",
        email: prev.email || user.email || "",
      }));
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Robôs costumam preencher o campo escondido: finge que enviou e não salva
    if (form.website) {
      setSent(true);
      return;
    }

    setSending(true);

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });

    setSending(false);

    if (insertError) {
      console.error(insertError);
      setError(
        "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
      );
      return;
    }

    setSent(true);
  }

  function handleAnother() {
    setForm((prev) => ({ ...prev, subject: "", message: "" }));
    setSent(false);
  }

  return (
    <main className=" bg-gray-50">
      <PageHero
        icon={MessageCircle}
        title="Fale com a gente"
        description="Tem uma dúvida, sugestão ou encontrou algum problema? Envie sua mensagem e responderemos o mais rápido possível."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-5">
        {/* Informações de contato */}
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map(({ icon: Icon, title, value, href }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={24} />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{title}</p>
                {href ? (
                  <a
                    href={href}
                    className="block truncate font-medium text-navy transition-colors hover:text-primary"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-medium text-navy">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Formulário */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10 lg:col-span-3">
          {sent ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle2 size={44} strokeWidth={1.8} />
              </span>

              <h2 className="mt-6 text-2xl font-bold text-navy">
                Mensagem enviada!
              </h2>
              <p className="mt-3 max-w-sm text-gray-500">
                Obrigado pelo contato. Vamos responder para o e-mail{" "}
                <span className="font-medium text-navy">{form.email}</span> o
                quanto antes.
              </p>

              <button
                type="button"
                onClick={handleAnother}
                className="mt-8 h-12 rounded-xl border border-gray-200 px-8 font-medium text-navy transition-colors hover:border-primary/40 hover:text-primary"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-navy">
                Envie sua mensagem
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Nome">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className={`${inputClass} h-12`}
                  />
                </Field>

                <Field id="email" label="E-mail">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={150}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`${inputClass} h-12`}
                  />
                </Field>
              </div>

              <Field id="subject" label="Assunto">
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={`${inputClass} h-12`}
                >
                  <option value="">Selecione um assunto</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="message" label="Mensagem">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  minLength={10}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escreva aqui sua mensagem"
                  className={`${inputClass} resize-y py-3`}
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.message.length}/1000
                </p>
              </Field>

              {/* Campo escondido contra robôs */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={handleChange}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-base font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={20} />
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
