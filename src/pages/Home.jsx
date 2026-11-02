import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Gamepad2,
  Layers,
  ListChecks,
  Shuffle,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Hero from "../components/Hero/Hero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { supabase } from "../lib/supabase";
import { disciplinas } from "../data/conteudos";
import { exercicios, getExercicio } from "../data/exercicios";
import { getQuiz, quizzes } from "../data/quizzes";

// Exercícios que aparecem em destaque (troque os ids se quiser outros)
const featuredIds = [
  "operacoes-inteiros",
  "acentuacao-grafica",
  "interpretacao-de-texto",
];

const features = [
  {
    icon: CheckCircle2,
    title: "Correção imediata",
    description:
      "Veja na hora se acertou e entenda o porquê com a explicação de cada questão.",
  },
  {
    icon: Layers,
    title: "Três níveis de dificuldade",
    description:
      "Fácil, Médio e Difícil: avance conforme for ganhando confiança.",
  },
  {
    icon: Clock,
    title: "Quizzes contra o relógio",
    description:
      "Desafios cronometrados para treinar a agilidade e testar o que você aprendeu.",
  },
  {
    icon: TrendingUp,
    title: "Progresso acompanhado",
    description:
      "A Área do aluno mostra seus acertos, as questões respondidas e os dias seguidos de estudo.",
  },
  {
    icon: Trophy,
    title: "Conquistas",
    description:
      "Destrave medalhas conforme você pratica e mantém o ritmo dos estudos.",
  },
  {
    icon: Shuffle,
    title: "Sempre diferente",
    description:
      "As questões e as alternativas são embaralhadas a cada nova tentativa.",
  },
];

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      setLogged(Boolean(user));
      setFirstName(user?.user_metadata?.name?.split(" ")[0] ?? "");
    });
  }, []);

  // Números reais, calculados a partir dos dados do projeto
  const totalQuestions = exercicios.reduce(
    (sum, exercicio) => sum + exercicio.questions.length,
    0,
  );

  const stats = [
    { value: disciplinas.length, label: "Disciplinas" },
    { value: exercicios.length, label: "Exercícios" },
    { value: totalQuestions, label: "Questões" },
    { value: quizzes.length, label: "Quizzes" },
  ];

  const featured = featuredIds.map(getExercicio).filter(Boolean);
  const featuredQuiz = getQuiz("desafio-aprende-mais") ?? quizzes[0];

  return (
    <main className="bg-gray-50">
      {/* Topo (o seu Hero) */}
      <Hero />

      {/* Faixa de boas-vindas (só para quem está logado) */}
      {logged && (
        <section className="border-y border-primary/20 bg-primary/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
            <p className="font-medium text-navy">
              Que bom te ver de volta{firstName ? `, ${firstName}` : ""}!
              Continue de onde parou.
            </p>
            <Link
              to="/area-do-aluno"
              className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Ir para a Área do aluno
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {/* Números */}
      <section className="bg-white" aria-label="Números da plataforma">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-5xl font-bold text-primary">{value}</p>
              <p className="mt-2 text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disciplinas */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-3xl font-bold text-navy">
          Escolha o que estudar
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Duas disciplinas essenciais, organizadas em tópicos para você estudar
          um assunto de cada vez.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {disciplinas.map((disciplina) => {
            const Icon = disciplina.icon;
            const totalLessons = disciplina.topics.reduce(
              (sum, topic) => sum + topic.lessons,
              0,
            );

            return (
              <Link
                key={disciplina.slug}
                to={`/disciplinas/${disciplina.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={32} />
                </span>

                <h3 className="mt-6 text-2xl font-bold text-navy">
                  {disciplina.name}
                </h3>
                <p className="mt-2 text-gray-500">{disciplina.description}</p>

                <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Layers size={16} className="text-primary" />
                  {disciplina.topics.length} tópicos · {totalLessons} aulas
                </p>

                <span className="mt-6 inline-flex items-center gap-2 font-medium text-primary">
                  Ver conteúdos
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Por que estudar aqui */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-navy">
            Por que estudar no Aprende+
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
            Tudo o que você precisa para praticar, errar, aprender e evoluir.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-gray-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exercícios em destaque */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-navy">
              Comece a praticar
            </h2>
            <p className="mt-3 text-gray-500">
              Alguns exercícios para você dar o primeiro passo.
            </p>
          </div>

          <Link
            to="/exercicios"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Ver todos os exercícios
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((exercicio) => {
            const disciplina = disciplinas.find(
              (d) => d.slug === exercicio.disciplina,
            );

            return (
              <Link
                key={exercicio.id}
                to={`/exercicios/${exercicio.id}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {disciplina?.name}
                  </span>
                  <LevelBadge level={exercicio.level} />
                </div>

                <h3 className="mt-4 flex-1 text-lg font-semibold text-navy">
                  {exercicio.title}
                </h3>

                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <ListChecks size={16} className="text-primary" />
                    {exercicio.questions.length} questões
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Começar
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quizzes */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-xl shadow-primary/20 sm:p-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                <Gamepad2 size={16} />
                Quizzes
              </span>

              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                Aceite o desafio contra o relógio
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                Responda o mais rápido que conseguir e descubra o quanto você
                já sabe. As questões são sorteadas, então cada partida é
                diferente.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/quizzes/${featuredQuiz.id}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 font-medium text-primary transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Jogar agora
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/quizzes"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/50 px-8 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Ver todos os quizzes
                </Link>
              </div>
            </div>

            {/* Quiz em destaque */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur lg:col-span-2">
              <p className="text-sm text-white/70">Quiz em destaque</p>
              <h3 className="mt-1 text-xl font-semibold">
                {featuredQuiz.title}
              </h3>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-2">
                  <ListChecks size={18} />
                  {featuredQuiz.count} questões
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {featuredQuiz.minutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">
          Pronto para começar a aprender?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          {logged
            ? "Acompanhe sua evolução e continue praticando."
            : "Crie sua conta para salvar seu progresso e acompanhar sua evolução."}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={logged ? "/area-do-aluno" : "/cadastro"}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            {logged ? "Ir para a Área do aluno" : "Criar conta"}
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/sobre"
            className="inline-flex h-12 items-center rounded-xl border border-gray-200 bg-white px-8 font-medium text-navy transition-colors hover:border-primary/40 hover:text-primary"
          >
            Conhecer o projeto
          </Link>
        </div>
      </section>
    </main>
  );
}
