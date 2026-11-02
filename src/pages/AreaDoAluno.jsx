import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Gamepad2,
  ListChecks,
  Lock,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { disciplinas } from "../data/conteudos";
import { exercicios, getExercicio } from "../data/exercicios";

// Transforma uma data em "2026-10-30" (no horário local) para comparar dias
function dayKey(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// Quantos dias seguidos a pessoa estudou (contando até hoje ou ontem)
function calcStreak(results) {
  const days = new Set(results.map((r) => dayKey(r.created_at)));
  const cursor = new Date();

  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={22} />
      </span>
      <p className="mt-4 text-3xl font-bold text-navy">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default function AreaDoAluno() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Só quem está logado pode ver a área do aluno
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const currentUser = session.user;

      const [resultsResponse, profileResponse] = await Promise.all([
        supabase
          .from("exercise_results")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", currentUser.id)
          .maybeSingle(),
      ]);

      if (!active) return;

      setUser(currentUser);
      setResults(resultsResponse.data ?? []);
      setAvatarUrl(profileResponse.data?.avatar_url ?? "");
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

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-90px)] items-center justify-center bg-gray-50">
        <p className="text-gray-500">Carregando sua área...</p>
      </main>
    );
  }

  // Só conta resultados de exercícios que ainda existem
  const known = results.filter((r) => getExercicio(r.exercicio_id));

  const totalScore = known.reduce((sum, r) => sum + r.score, 0);
  const totalQuestions = known.reduce((sum, r) => sum + r.total, 0);
  const accuracy = totalQuestions
    ? Math.round((totalScore / totalQuestions) * 100)
    : 0;
  const doneIds = new Set(known.map((r) => r.exercicio_id));
  const streak = calcStreak(known);

  const firstName = user.user_metadata?.name?.split(" ")[0] ?? "aluno(a)";
  const photo = user.user_metadata?.avatar_url || avatarUrl;
  const nextExercicio =
    exercicios.find((e) => !doneIds.has(e.id)) ?? exercicios[0];

  const achievements = [
    {
      icon: Target,
      title: "Primeiro passo",
      description: "Conclua seu primeiro exercício",
      unlocked: known.length >= 1,
    },
    {
      icon: Trophy,
      title: "Nota máxima",
      description: "Acerte 100% em um exercício",
      unlocked: known.some((r) => r.score === r.total),
    },
    {
      icon: Award,
      title: "Dedicado",
      description: "Conclua 5 exercícios",
      unlocked: known.length >= 5,
    },
    {
      icon: Flame,
      title: "Em chamas",
      description: "Estude 3 dias seguidos",
      unlocked: streak >= 3,
    },
  ];

  const shortcuts = [
    {
      to: "/disciplinas",
      icon: BookOpen,
      title: "Disciplinas",
      description: "Veja os tópicos de cada matéria",
    },
    {
      to: "/exercicios",
      icon: ClipboardCheck,
      title: "Exercícios",
      description: "Pratique o que aprendeu",
    },
    {
      to: "/quizzes",
      icon: Gamepad2,
      title: "Quizzes",
      description: "Teste seus conhecimentos",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        {/* Boas-vindas */}
        <section className="flex flex-col items-start gap-6 rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-xl shadow-primary/20 sm:flex-row sm:items-center sm:p-10">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-white/20">
            {photo ? (
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound size={36} />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">Olá, {firstName}!</h1>
            <p className="mt-2 text-white/80">
              {known.length === 0
                ? "Que tal começar seu primeiro exercício hoje?"
                : "Continue de onde parou e mantenha o ritmo dos estudos."}
            </p>
          </div>

          <Link
            to={`/exercicios/${nextExercicio.id}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-medium text-primary transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            {known.length === 0 ? "Começar agora" : "Próximo exercício"}
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* Números */}
        <section
          aria-label="Resumo do seu progresso"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            icon={CheckCircle2}
            label="Exercícios concluídos"
            value={known.length}
          />
          <StatCard
            icon={Target}
            label="Taxa de acertos"
            value={`${accuracy}%`}
          />
          <StatCard
            icon={ListChecks}
            label="Questões respondidas"
            value={totalQuestions}
          />
          <StatCard
            icon={Flame}
            label={streak === 1 ? "Dia seguido" : "Dias seguidos"}
            value={streak}
          />
        </section>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Progresso por disciplina */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">
            <h2 className="text-xl font-bold text-navy">
              Progresso por disciplina
            </h2>

            <div className="mt-6 space-y-6">
              {disciplinas.map((disciplina) => {
                const Icon = disciplina.icon;
                const all = exercicios.filter(
                  (e) => e.disciplina === disciplina.slug,
                );
                const done = all.filter((e) => doneIds.has(e.id)).length;
                const percent = all.length
                  ? Math.round((done / all.length) * 100)
                  : 0;

                return (
                  <div key={disciplina.slug}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 font-medium text-navy">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={20} />
                        </span>
                        {disciplina.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {done} de {all.length} exercícios
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Conquistas */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-navy">Conquistas</h2>

            <ul className="mt-6 space-y-4">
              {achievements.map(
                ({ icon: Icon, title, description, unlocked }) => (
                  <li
                    key={title}
                    className={`flex items-center gap-4 ${
                      unlocked ? "" : "opacity-50"
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                        unlocked
                          ? "bg-primary text-white shadow-md shadow-primary/30"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {unlocked ? <Icon size={22} /> : <Lock size={20} />}
                    </span>
                    <div>
                      <p className="font-medium text-navy">{title}</p>
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>

        {/* Atividade recente */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-navy">Atividade recente</h2>

          {known.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">
                Você ainda não fez nenhum exercício.
              </p>
              <Link
                to="/exercicios"
                className="mt-4 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark"
              >
                Ver exercícios
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-gray-100">
              {known.slice(0, 5).map((result) => {
                const exercicio = getExercicio(result.exercicio_id);
                const percent = Math.round((result.score / result.total) * 100);

                return (
                  <li
                    key={result.id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-navy">
                        {exercicio.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(result.created_at).toLocaleDateString(
                          "pt-BR",
                          { day: "2-digit", month: "long" },
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {result.score}/{result.total}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          percent >= 80
                            ? "bg-green-50 text-green-700"
                            : percent >= 50
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {percent}%
                      </span>
                      <Link
                        to={`/exercicios/${exercicio.id}`}
                        className="hidden text-sm font-medium text-primary transition-colors hover:text-primary-dark sm:inline"
                      >
                        Refazer
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Atalhos */}
        <section aria-label="Atalhos" className="grid gap-6 md:grid-cols-3">
          {shortcuts.map(({ to, icon: Icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={26} />
              </span>
              <div>
                <p className="font-semibold text-navy">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
