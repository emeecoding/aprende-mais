import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { supabase, setRememberMe } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

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
    setError("");
    setLoading(true);

    // Define onde a sessão será guardada (lembrar ou só nesta aba)
    setRememberMe(form.remember);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    setLoading(false);

    if (authError) {
      console.error(authError);

      if (authError.message.includes("Email not confirmed")) {
        setError("Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.");
      } else {
        setError("E-mail ou senha incorretos.");
      }
      return;
    }

    navigate("/");
  }

  return (
    <main className="flex min-h-[calc(100vh-90px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-[530px] rounded-3xl bg-white px-8 py-12 shadow-xl shadow-navy/5 sm:px-12">
        <h1 className="text-4xl font-bold text-navy">Bem-vindo(a)!</h1>
        <p className="mt-3 text-lg leading-snug text-gray-500">
          Faça login para acessar sua conta e continuar aprendendo.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* E-mail */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-base font-medium text-navy"
            >
              E-mail
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-base font-medium text-navy"
            >
              Senha
            </label>
            <div className="relative">
              <LockKeyhole
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="h-14 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-12 text-sm text-navy placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Lembrar de mim / Esqueceu a senha */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 accent-primary"
              />
              Lembrar de mim
            </label>

            <Link
              to="/esqueci-a-senha"
              className="font-medium text-primary  transition-colors hover:text-primary-dark"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Erro */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-base font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogIn size={20} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Ainda não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
