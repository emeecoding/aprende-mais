import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { getDisciplina } from "../data/conteudos";
import { getExercicio } from "../data/exercicios";
import { supabase } from "../lib/supabase";

const letters = ["A", "B", "C", "D"];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Embaralha a ordem das questões e das alternativas, mantendo a resposta certa
function shuffleQuestions(questions) {
  return shuffle(questions).map((item) => {
    const options = shuffle(
      item.options.map((text, i) => ({ text, correct: i === item.answer })),
    );

    return {
      ...item,
      options: options.map((option) => option.text),
      answer: options.findIndex((option) => option.correct),
    };
  });
}

function getMessage(percent) {
  if (percent >= 80) return "Excelente! Você domina esse assunto.";
  if (percent >= 50)
    return "Bom trabalho! Mais um pouco de prática e você chega lá.";
  return "Continue praticando. Revise as explicações e tente de novo!";
}

function Player({ exercicio }) {
  const disciplina = getDisciplina(exercicio.disciplina);
  const [questions, setQuestions] = useState(() =>
    shuffleQuestions(exercicio.questions),
  );
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "saved" | "guest" | "error"

  const question = questions[index];
  const score = answers.filter(
    (answer, i) => answer === questions[i].answer,
  ).length;
  const percent = Math.round((score / total) * 100);
  const progress = finished ? 100 : ((index + (checked ? 1 : 0)) / total) * 100;
  const isLast = index + 1 === total;

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
    setAnswers((prev) => [...prev, selected]);
  }

  async function saveResult() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Quem não está logado pode praticar, mas o resultado não é salvo
    if (!session) {
      setSaveStatus("guest");
      return;
    }

    const { error } = await supabase.from("exercise_results").insert({
      user_id: session.user.id,
      exercicio_id: exercicio.id,
      score,
      total,
    });

    if (error) console.error(error);
    setSaveStatus(error ? "error" : "saved");
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      saveResult();
      return;
    }
    setIndex((prev) => prev + 1);
    setSelected(null);
    setChecked(false);
  }

  function handleRestart() {
    setQuestions(shuffleQuestions(exercicio.questions));
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setFinished(false);
    setSaveStatus(null);
  }

  function optionClass(i) {
    const base =
      "flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-colors disabled:cursor-default";

    if (!checked) {
      return `${base} ${
        selected === i
          ? "border-primary bg-primary/5"
          : "border-gray-200 bg-white hover:border-primary/40"
      }`;
    }
    if (i === question.answer) return `${base} border-green-500 bg-green-50`;
    if (i === selected) return `${base} border-red-500 bg-red-50`;
    return `${base} border-gray-200 bg-white opacity-60`;
  }

  function letterClass(i) {
    const base =
      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold";

    if (!checked) {
      return `${base} ${
        selected === i ? "bg-primary text-white" : "bg-gray-100 text-navy"
      }`;
    }
    if (i === question.answer) return `${base} bg-green-500 text-white`;
    if (i === selected) return `${base} bg-red-500 text-white`;
    return `${base} bg-gray-100 text-navy`;
  }

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50">
      <PageHero
        icon={disciplina.icon}
        title={exercicio.title}
        description={`${disciplina.name} · ${total} questões`}
        backTo="/exercicios"
        backLabel="Todos os exercícios"
      />

      <section className="mx-auto max-w-3xl px-4 py-10">
        {/* Barra de progresso */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-navy">
              {finished ? "Concluído" : `Questão ${index + 1} de ${total}`}
            </span>
            <LevelBadge level={exercicio.level} />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!finished ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
            <h2 className="text-xl font-semibold leading-snug text-navy">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  disabled={checked}
                  onClick={() => setSelected(i)}
                  className={optionClass(i)}
                >
                  <span className={letterClass(i)}>{letters[i]}</span>
                  <span className="text-navy">{option}</span>
                </button>
              ))}
            </div>

            {/* Resultado da questão */}
            {checked && (
              <div
                role="status"
                className={`mt-8 flex gap-3 rounded-xl px-4 py-4 ${
                  selected === question.answer
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {selected === question.answer ? (
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0" />
                ) : (
                  <XCircle size={22} className="mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {selected === question.answer
                      ? "Resposta correta!"
                      : "Não foi dessa vez."}
                  </p>
                  <p className="mt-1 text-sm">{question.explanation}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              {!checked ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={selected === null}
                  className="h-12 rounded-xl bg-primary px-8 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  Verificar resposta
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  {isLast ? "Ver resultado" : "Próxima questão"}
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xl shadow-navy/5 sm:p-10">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy size={40} />
            </span>

            <h2 className="mt-6 text-2xl font-bold text-navy">
              Você acertou {score} de {total}
            </h2>
            <p className="mt-2 text-5xl font-bold text-primary">{percent}%</p>
            <p className="mt-4 text-gray-500">{getMessage(percent)}</p>

            {saveStatus === "saved" && (
              <p className="mt-3 text-sm text-green-700">
                Resultado salvo na sua Área do aluno.
              </p>
            )}
            {saveStatus === "guest" && (
              <p className="mt-3 text-sm text-gray-500">
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Entre na sua conta
                </Link>{" "}
                para salvar seu progresso.
              </p>
            )}
            {saveStatus === "error" && (
              <p className="mt-3 text-sm text-red-600">
                Não foi possível salvar o resultado.
              </p>
            )}

            {/* Revisão */}
            <div className="mt-10 space-y-3 text-left">
              <h3 className="font-semibold text-navy">Revisão das questões</h3>

              {questions.map((item, i) => {
                const correct = answers[i] === item.answer;

                return (
                  <div
                    key={i}
                    className="flex gap-3 rounded-xl border border-gray-200 px-4 py-3"
                  >
                    {correct ? (
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                    ) : (
                      <XCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy">
                        {item.question}
                      </p>
                      {!correct && (
                        <p className="mt-1 text-sm text-gray-500">
                          Resposta correta:{" "}
                          <span className="font-medium text-green-700">
                            {item.options[item.answer]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <RotateCcw size={18} />
                Refazer
              </button>

              <Link
                to="/exercicios"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 px-8 font-medium text-navy transition-colors hover:border-primary/40 hover:text-primary"
              >
                Outros exercícios
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default function Exercicio() {
  const { id } = useParams();
  const exercicio = getExercicio(id);

  // Endereço inválido, ex.: /exercicios/qualquer-coisa
  if (!exercicio) {
    return (
      <main className="min-h-[calc(100vh-90px)] bg-gray-50">
        <PageHero
          icon={BookOpen}
          title="Exercício não encontrado"
          description="Esse exercício não existe ou ainda não está disponível."
          backTo="/exercicios"
          backLabel="Ver todos os exercícios"
        />
      </main>
    );
  }

  // O "key" reinicia o exercício quando o endereço muda
  return <Player key={id} exercicio={exercicio} />;
}
