import { Link } from "react-router-dom";
import { ArrowRight, Clock, Gamepad2, ListChecks } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { disciplinas } from "../data/conteudos";
import { quizzes } from "../data/quizzes";

export default function Quizzes() {
  function getDisciplina(slug) {
    return disciplinas.find((d) => d.slug === slug);
  }

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50">
      <PageHero
        icon={Gamepad2}
        title="Quizzes"
        description="Teste seus conhecimentos de forma rápida e divertida, contra o relógio."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const disciplina = getDisciplina(quiz.disciplina);
            const Icon = disciplina?.icon ?? Gamepad2;
            const disciplinaName = disciplina?.name ?? "Matemática e Português";

            return (
              <Link
                key={quiz.id}
                to={`/quizzes/${quiz.id}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <LevelBadge level={quiz.level} />
                </div>

                <p className="mt-4 text-sm font-medium text-primary">
                  {disciplinaName}
                </p>
                <h2 className="mt-1 flex-1 text-lg font-semibold text-navy">
                  {quiz.title}
                </h2>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <ListChecks size={16} className="text-primary" />
                      {quiz.count}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} className="text-primary" />
                      {quiz.minutes} min
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Jogar
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
    </main>
  );
}
