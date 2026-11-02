import { useState } from "react";
import { ClipboardCheck, ListChecks } from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { disciplinas, exercicios } from "../data/conteudos";

const levels = ["Todos", "Fácil", "Médio", "Difícil"];

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export default function Exercicios() {
  const [disciplina, setDisciplina] = useState("todas");
  const [level, setLevel] = useState("Todos");

  const filtered = exercicios.filter(
    (exercicio) =>
      (disciplina === "todas" || exercicio.disciplina === disciplina) &&
      (level === "Todos" || exercicio.level === level),
  );

  function getDisciplinaName(slug) {
    return disciplinas.find((d) => d.slug === slug)?.name ?? "";
  }

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50">
      <PageHero
        icon={ClipboardCheck}
        title="Exercícios"
        description="Pratique o que aprendeu com listas de exercícios para cada nível."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        {/* Filtros */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-medium text-navy">
              Disciplina:
            </span>
            <FilterChip
              active={disciplina === "todas"}
              onClick={() => setDisciplina("todas")}
            >
              Todas
            </FilterChip>
            {disciplinas.map((d) => (
              <FilterChip
                key={d.slug}
                active={disciplina === d.slug}
                onClick={() => setDisciplina(d.slug)}
              >
                {d.name}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-medium text-navy">Nível:</span>
            {levels.map((item) => (
              <FilterChip
                key={item}
                active={level === item}
                onClick={() => setLevel(item)}
              >
                {item}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            Nenhum exercício encontrado com esses filtros.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((exercicio) => (
              <article
                key={exercicio.id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {getDisciplinaName(exercicio.disciplina)}
                  </span>
                  <LevelBadge level={exercicio.level} />
                </div>

                <h2 className="mt-4 flex-1 text-lg font-semibold text-navy">
                  {exercicio.title}
                </h2>

                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <ListChecks size={16} className="text-primary" />
                    {exercicio.questions} questões
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    Em breve
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
