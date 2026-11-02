import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Gamepad2,
  ListChecks,
  Play,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import PageHero from "../components/PageHero/PageHero";
import LevelBadge from "../components/LevelBadge/LevelBadge";
import { disciplinas } from "../data/conteudos";
import { buildQuizQuestions, getQuiz } from "../data/quizzes";

const letters = ["A", "B", "C", "D"];

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getMessage(percent, timeUp) {
  const prefix = timeUp ? "O tempo acabou! " : "";
  if (percent >= 80) return `${prefix}Excelente! Você mandou muito bem.`;
  if (percent >= 50)
    return `${prefix}Bom resultado! Dá para melhorar ainda mais.`;
  return `${prefix}Continue praticando e tente de novo!`;
}

function QuizPlayer({ quiz }) {
  const disciplina = disciplinas.find((d) => d.slug === quiz.disciplina);
  const Icon = disciplina?.icon ?? Gamepad2;
  const disciplinaName = disciplina?.name ?? "Matemática e Português";
  const totalSeconds = quiz.minutes * 60;

  const [status, setStatus] = useState("intro"); // intro | playing | finished
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [result, setResult] = useState(null);

  const answersRef = useRef([]);
  const endsAtRef = useRef(0);
  const advanceRef = useRef(null);

  const finish = useCallback(
    (timeUp) => {
      clearTimeout(advanceRef.current);

      const answers = questions.map((_, i) => answersRef.current[i] ?? null);
      const score = answers.filter(
        (answer, i) => answer === questions[i].answer,
      ).length;
      const secondsUsed = timeUp
        ? totalSeconds
        : Math.min(
            totalSeconds,
            Math.round(totalSeconds - (endsAtRef.current - Date.now()) / 1000),
          );

      setResult({ answers, score, timeUp, secondsUsed });
      setStatus("finished");
    },
    [questions, totalSeconds],
  );

  // Cronômetro: confere o tempo restante e encerra o quiz quando acabar
  useEffect(() => {
    if (status !== "playing") return;

    const timer = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((endsAtRef.current - Date.now()) / 1000),
      );
      setTimeLeft(left);
      if (left === 0) finish(true);
    }, 250);

    return () => clearInterval(timer);
  }, [status, finish]);

  // Limpa o avanço automático ao sair da página
  useEffect(() => () => clearTimeout(advanceRef.current), []);

  function handleStart() {
    setQuestions(buildQuizQuestions(quiz));
    answersRef.current = [];
    endsAtRef.current = Date.now() + totalSeconds * 1000;
    setTimeLeft(totalSeconds);
    setIndex(0);
    setSelected(null);
    setResult(null);
    setStatus("playing");
  }

  function handleSelect(i) {
    if (selected !== null) return;

    answersRef.current[index] = i;
    setSelected(i);

    // Mostra se acertou por um instante e passa para a próxima
    advanceRef.current = setTimeout(() => {
      if (index + 1 === questions.length) {
        finish(false);
      } else {
        setIndex(index + 1);
        setSelected(null);
      }
    }, 900);
  }

  /* ------------------------------ Tela inicial ------------------------------ */

  if (status === "intro") {
    return (
      <main className="min-h-[calc(100vh-90px)] bg-gray-50">
        <PageHero
          icon={Icon}
          title={quiz.title}
          description={`${disciplinaName} · ${quiz.count} questões · ${quiz.minutes} minutos`}
          backTo="/quizzes"
          backLabel="Todos os quizzes"
        />

        <section className="mx-auto max-w-3xl px-4 py-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
            <div className="flex flex-wrap items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <ListChecks size={20} className="text-primary" />
                {quiz.count} questões
              </span>
              <span className="flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                {quiz.minutes} minutos
              </span>
              <LevelBadge level={quiz.level} />
            </div>

            <h2 className="mt-8 text-lg font-semibold text-navy">
              Como funciona
            </h2>
            <ul className="mt-4 space-y-3 text-gray-500">
              <li className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                O cronômetro começa assim que você clicar em “Começar quiz”.
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                Ao escolher uma alternativa, a resposta é confirmada na hora e o
                quiz avança sozinho.
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                As questões são sorteadas, então cada tentativa é diferente.
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                />
                No final você vê a correção com a explicação das respostas que
                errou.
              </li>
            </ul>

            <button
              type="button"
              onClick={handleStart}
              className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-base font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <Play size={20} />
              Começar quiz
            </button>
          </div>
        </section>
      </main>
    );
  }

  /* -------------------------------- Resultado ------------------------------- */

  if (status === "finished") {
    const total = questions.length;
    const percent = Math.round((result.score / total) * 100);

    return (
      <main className="min-h-[calc(100vh-90px)] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xl shadow-navy/5 sm:p-10">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Trophy size={40} />
          </span>

          <h1 className="mt-6 text-2xl font-bold text-navy">
            Você acertou {result.score} de {total}
          </h1>
          <p className="mt-2 text-5xl font-bold text-primary">{percent}%</p>
          <p className="mt-4 text-gray-500">
            {getMessage(percent, result.timeUp)}
          </p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock size={16} className="text-primary" />
            Tempo usado: {formatTime(result.secondsUsed)}
          </p>

          {/* Revisão */}
          <div className="mt-10 space-y-3 text-left">
            <h2 className="font-semibold text-navy">Correção</h2>

            {questions.map((item, i) => {
              const answer = result.answers[i];
              const correct = answer === item.answer;

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
                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p>
                          Sua resposta:{" "}
                          <span className="font-medium text-red-600">
                            {answer === null
                              ? "Sem resposta"
                              : item.options[answer]}
                          </span>
                        </p>
                        <p>
                          Resposta correta:{" "}
                          <span className="font-medium text-green-700">
                            {item.options[item.answer]}
                          </span>
                        </p>
                        <p>{item.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-medium text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <RotateCcw size={18} />
              Jogar de novo
            </button>

            <Link
              to="/quizzes"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 px-8 font-medium text-navy transition-colors hover:border-primary/40 hover:text-primary"
            >
              Outros quizzes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------------- Jogando -------------------------------- */

  const question = questions[index];
  const total = questions.length;
  const lowTime = timeLeft <= 30;

  function optionClass(i) {
    const base =
      "flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-colors disabled:cursor-default";

    if (selected === null) {
      return `${base} border-gray-200 bg-white hover:border-primary/40 hover:bg-primary/5`;
    }
    if (i === question.answer) return `${base} border-green-500 bg-green-50`;
    if (i === selected) return `${base} border-red-500 bg-red-50`;
    return `${base} border-gray-200 bg-white opacity-60`;
  }

  function letterClass(i) {
    const base =
      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold";

    if (selected === null) return `${base} bg-gray-100 text-navy`;
    if (i === question.answer) return `${base} bg-green-500 text-white`;
    if (i === selected) return `${base} bg-red-500 text-white`;
    return `${base} bg-gray-100 text-navy`;
  }

  return (
    <main className="min-h-[calc(100vh-90px)] bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{quiz.title}</p>
            <p className="font-semibold text-navy">
              Questão {index + 1} de {total}
            </p>
          </div>

          <span
            role="timer"
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold tabular-nums ${
              lowTime
                ? "animate-pulse bg-red-50 text-red-600"
                : "bg-primary/10 text-primary"
            }`}
          >
            <Clock size={18} />
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="mb-8 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-10">
          <h2 className="text-xl font-semibold leading-snug text-navy">
            {question.question}
          </h2>

          <div className="mt-8 space-y-3">
            {question.options.map((option, i) => (
              <button
                key={option}
                type="button"
                disabled={selected !== null}
                onClick={() => handleSelect(i)}
                className={optionClass(i)}
              >
                <span className={letterClass(i)}>{letters[i]}</span>
                <span className="text-navy">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Quiz() {
  const { id } = useParams();
  const quiz = getQuiz(id);

  // Endereço inválido, ex.: /quizzes/qualquer-coisa
  if (!quiz) {
    return (
      <main className="min-h-[calc(100vh-90px)] bg-gray-50">
        <PageHero
          icon={Gamepad2}
          title="Quiz não encontrado"
          description="Esse quiz não existe ou ainda não está disponível."
          backTo="/quizzes"
          backLabel="Ver todos os quizzes"
        />
      </main>
    );
  }

  // O "key" reinicia o quiz quando o endereço muda
  return <QuizPlayer key={id} quiz={quiz} />;
}
