import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Code,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  Repeat,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { disciplinas } from "../data/conteudos";
import { exercicios } from "../data/exercicios";

// EDITE os dados abaixo com as suas informações
const developer = {
  name: "Emerson Antonio dos Santos",
  role: "Desenvolvedor Fullstack",
  photo: "/foto-perfil.png", // coloque a sua foto em public/foto-perfil.png
  education: "Engenharia de Software (cursando)",
  bio: [
    "Sou estudante de Engenharia de Software e desenvolvedor fullstack. Gosto de transformar ideias em produtos que funcionam de verdade, cuidando tanto da interface que as pessoas usam quanto da lógica e dos dados que ficam por trás de cada tela.",
    "O Aprende+ reúne o que venho aprendendo ao longo da graduação: da construção das telas com React e Tailwind CSS ao banco de dados e à autenticação com Supabase. Cada exercício, cada quiz e cada detalhe da plataforma foi pensado para tornar o estudo mais simples para quem usa.",
  ],
  // Ex.: { label: "GitHub", href: "https://github.com/seu-usuario" }
  links: [],
};

const offers = [
  {
    icon: BookOpen,
    title: "Disciplinas",
    description:
      "Conteúdos de Matemática e Língua Portuguesa organizados em tópicos, do básico ao avançado.",
  },
  {
    icon: ClipboardCheck,
    title: "Exercícios",
    description:
      "Questões com correção imediata e explicação de cada resposta, para aprender com os erros.",
  },
  {
    icon: Gamepad2,
    title: "Quizzes",
    description:
      "Desafios rápidos, contra o relógio, para testar o que você aprendeu de um jeito mais leve e divertido.",
  },
];

const steps = [
  {
    title: "Crie sua conta",
    description: "O cadastro é rápido e libera o acompanhamento do seu progresso.",
  },
  {
    title: "Estude e pratique",
    description:
      "Escolha uma disciplina, leia os tópicos e resolva exercícios no seu ritmo.",
  },
  {
    title: "Acompanhe sua evolução",
    description:
      "Na Área do aluno você vê seus acertos, seu progresso e suas conquistas.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Clareza",
    description: "Explicações simples e diretas, sem complicar o que é fácil.",
  },
  {
    icon: Repeat,
    title: "Prática constante",
    description: "Aprender de verdade vem de praticar, errar e tentar de novo.",
  },
  {
    icon: TrendingUp,
    title: "Progresso visível",
    description: "Ver a própria evolução motiva a continuar estudando.",
  },
  {
    icon: Clock,
    title: "No seu ritmo",
    description: "Sem pressa e sem ordem obrigatória: você decide como estudar.",
  },
];

// EDITE as dicas e as perguntas como preferir
const tips = [
  {
    icon: CalendarDays,
    title: "Estude um pouco todo dia",
    description:
      "Sessões curtas e frequentes rendem mais do que um dia inteiro de estudo.",
  },
  {
    icon: RotateCcw,
    title: "Refaça o que errou",
    description:
      "Leia a explicação da correção e tente o exercício de novo para fixar.",
  },
  {
    icon: Gamepad2,
    title: "Treine com o relógio",
    description:
      "Os quizzes ajudam a ganhar agilidade e a se acostumar com o tempo de prova.",
  },
  {
    icon: Target,
    title: "Comece pelo nível Fácil",
    description:
      "Avance para o Médio e o Difícil conforme for ganhando confiança.",
  },
];

const faqs = [
  {
    question: "Preciso criar uma conta para estudar?",
    answer:
      "Não. Você pode ver as disciplinas e fazer exercícios e quizzes sem conta. Com a conta, o resultado dos seus exercícios fica salvo e aparece na Área do aluno.",
  },
  {
    question: "Posso refazer um exercício ou quiz?",
    answer:
      "Pode, quantas vezes quiser. Nos exercícios, a ordem das questões e das alternativas muda a cada tentativa, e os quizzes sorteiam questões diferentes.",
  },
  {
    question: "O que aparece na Área do aluno?",
    answer:
      "Quantos exercícios você concluiu, sua taxa de acertos, as questões respondidas, os dias seguidos de estudo, suas conquistas e a atividade recente.",
  },
  {
    question: "Quem pode ver o meu progresso?",
    answer:
      "Só você. Cada pessoa acessa apenas o próprio progresso e os próprios dados, e o login é feito com e-mail e senha.",
  },
  {
    question: "Como falo com a equipe?",
    answer:
      "Pelo formulário da página de Contato. Pode enviar dúvidas, sugestões ou avisar sobre algum problema.",
    link: { to: "/contato", label: "Ir para Contato" },
  },
];

function getInitials(name) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Sobre() {
  const [logged, setLogged] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLogged(Boolean(data.session));
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
  ];

  return (
    <main className="min-h-[calc(100vh-70px)] bg-gray-50">
      {/* Topo */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-28 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15">
            <GraduationCap size={44} />
          </span>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Sobre o Aprende+
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Uma plataforma de estudos pensada para tornar o aprendizado de
            Matemática e Língua Portuguesa mais simples, prático e acessível.
          </p>
        </div>
      </section>

      {/* Propósito */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-navy">Nosso propósito</h2>
          <p className="mt-4 text-gray-500">
            O Aprende+ nasceu da ideia de que estudar não precisa ser
            complicado. Reunimos conteúdos, exercícios e acompanhamento de
            progresso em um só lugar, para que cada pessoa aprenda no seu
            próprio ritmo.
          </p>
          <p className="mt-4 text-gray-500">
            Nosso objetivo é ajudar estudantes a reforçar a base em duas
            disciplinas essenciais, com prática constante e retorno imediato
            sobre o que foi aprendido.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-4xl font-bold text-primary">{value}</p>
              <p className="mt-1 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-navy">
            O que você encontra aqui
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {offers.map(({ icon: Icon, title, description, soon }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </span>

                <h3 className="mt-5 flex items-center gap-3 text-xl font-semibold text-navy">
                  {title}
                  {soon && (
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                      Em breve
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-gray-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* O que você pode estudar */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-3xl font-bold text-navy">
          O que você pode estudar
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Cada disciplina é dividida em tópicos, para você estudar um assunto
          de cada vez.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {disciplinas.map((disciplina) => {
            const Icon = disciplina.icon;

            return (
              <article
                key={disciplina.slug}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={28} />
                  </span>
                  <h3 className="text-2xl font-bold text-navy">
                    {disciplina.name}
                  </h3>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {disciplina.topics.map((topic) => (
                    <li
                      key={topic.title}
                      className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                    >
                      {topic.title}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/disciplinas/${disciplina.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Ver {disciplina.name}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-navy">
            Como funciona
          </h2>

          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map(({ title, description }, index) => (
              <li
                key={title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md shadow-primary/30">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-gray-500">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dicas para estudar melhor */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-3xl font-bold text-navy">
          Dicas para estudar melhor
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Pequenos hábitos que fazem diferença no seu aprendizado.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={24} />
              </span>
              <h3 className="mt-4 font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-navy">
            No que acreditamos
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={26} />
                </span>
                <h3 className="mt-4 font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem faz o Aprende+ */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-3xl font-bold text-navy">
          Quem faz o Aprende+
        </h2>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-5">
          {/* Foto */}
          <div className="flex justify-center lg:col-span-2">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gradient-to-br from-primary to-primary-dark opacity-30"
              />

              <div className="relative h-72 w-72 overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-primary to-primary-dark shadow-xl shadow-primary/20 sm:h-80 sm:w-80">
                {photoFailed ? (
                  <span className="flex h-full w-full items-center justify-center text-7xl font-bold text-white">
                    {getInitials(developer.name)}
                  </span>
                ) : (
                  <img
                    src={developer.photo}
                    alt={`Foto de ${developer.name}`}
                    onError={() => setPhotoFailed(true)}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Apresentação */}
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Code size={16} />
              {developer.role}
            </span>

            <h3 className="mt-4 text-3xl font-bold text-navy">
              {developer.name}
            </h3>

            <div className="mt-5 space-y-4 text-gray-500">
              {developer.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Formação */}
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap size={24} />
              </span>
              <div>
                <p className="text-sm text-gray-500">Formação</p>
                <p className="font-semibold text-navy">{developer.education}</p>
              </div>
            </div>

            {/* Links (aparecem só se você preencher em "links") */}
            {developer.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-5">
                {developer.links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    {label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-navy">
            Perguntas frequentes
          </h2>

          <div className="mt-14 space-y-4">
            {faqs.map(({ question, answer, link }) => (
              <details
                key={question}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 open:border-primary/40 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <p className="mt-4 text-gray-500">{answer}</p>

                {link && (
                  <Link
                    to={link.to}
                    className="mt-4 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-dark"
                  >
                    {link.label}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="mx-auto max-w-6xl px-4 pb-28">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-8 py-14 text-center text-white shadow-xl shadow-primary/20">
          <h2 className="text-3xl font-bold">Pronto para começar a aprender?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Explore as disciplinas e comece a praticar agora mesmo.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={logged ? "/area-do-aluno" : "/cadastro"}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 font-medium text-primary transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              {logged ? "Ir para a Área do aluno" : "Criar conta"}
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/disciplinas"
              className="inline-flex h-12 items-center rounded-xl border border-white/50 px-8 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Ver disciplinas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
