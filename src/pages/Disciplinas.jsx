import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import { disciplinas } from "../data/conteudos";

export default function Disciplinas() {
  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50">
      <PageHero
        icon={BookOpen}
        title="Disciplinas"
        description="Escolha uma disciplina e comece a estudar no seu ritmo."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
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

                <h2 className="mt-6 text-2xl font-bold text-navy">
                  {disciplina.name}
                </h2>
                <p className="mt-2 text-gray-500">{disciplina.description}</p>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Layers size={16} className="text-primary" />
                  {disciplina.topics.length} tópicos · {totalLessons} aulas
                </div>

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
    </main>
  );
}
