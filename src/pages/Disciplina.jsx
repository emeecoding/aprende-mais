import { Link, useParams } from "react-router-dom";
import { BookOpen, ClipboardCheck, Gamepad2, Layers } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { getDisciplina } from "../data/conteudos";

export default function Disciplina() {
  const { slug } = useParams();
  const disciplina = getDisciplina(slug);

  // Endereço inválido, ex.: /disciplinas/historia
  if (!disciplina) {
    return (
      <main className="min-h-[calc(100vh-90px)] bg-gray-50">
        <PageHero
          icon={BookOpen}
          title="Disciplina não encontrada"
          description="Essa disciplina não existe ou ainda não está disponível."
          backTo="/disciplinas"
          backLabel="Ver todas as disciplinas"
        />
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50">
      <PageHero
        icon={disciplina.icon}
        title={disciplina.name}
        description={disciplina.description}
        backTo="/disciplinas"
        backLabel="Todas as disciplinas"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-navy">Tópicos</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {disciplina.topics.map((topic, index) => (
            <article
              key={topic.title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                {index + 1}
              </span>

              <h3 className="mt-4 text-lg font-semibold text-navy">
                {topic.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-gray-500">
                {topic.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Layers size={16} className="text-primary" />
                  {topic.lessons} aulas
                </span>
                <LevelBadge level={topic.level} />
              </div>
            </article>
          ))}
        </div>

        {/* Atalhos */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            to="/exercicios"
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <ClipboardCheck size={28} className="text-primary" />
            <div>
              <p className="font-semibold text-navy">Praticar com exercícios</p>
              <p className="text-sm text-gray-500">Fixe o que você aprendeu</p>
            </div>
          </Link>

          <Link
            to="/quizzes"
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <Gamepad2 size={28} className="text-primary" />
            <div>
              <p className="font-semibold text-navy">Fazer um quiz</p>
              <p className="text-sm text-gray-500">Teste seus conhecimentos</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
