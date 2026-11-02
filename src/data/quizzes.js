import { exercicios } from "./exercicios";

// Cada quiz sorteia "count" questões entre os exercícios listados em "sources".
// Por isso o quiz muda a cada tentativa. Para criar outro quiz, é só copiar um bloco.
export const quizzes = [
  {
    id: "relampago-matematica",
    title: "Desafio relâmpago de Matemática",
    disciplina: "matematica",
    level: "Fácil",
    count: 10,
    minutes: 5,
    sources: ["operacoes-inteiros", "fracoes-na-pratica"],
  },
  {
    id: "fracoes-e-porcentagem",
    title: "Frações e porcentagem",
    disciplina: "matematica",
    level: "Médio",
    count: 15,
    minutes: 10,
    sources: ["fracoes-na-pratica", "porcentagem-dia-a-dia"],
  },
  {
    id: "geometria-em-acao",
    title: "Geometria em ação",
    disciplina: "matematica",
    level: "Médio",
    count: 10,
    minutes: 8,
    sources: ["area-e-perimetro"],
  },
  {
    id: "quiz-de-ortografia",
    title: "Quiz de ortografia e pontuação",
    disciplina: "portugues",
    level: "Fácil",
    count: 10,
    minutes: 5,
    sources: ["acentuacao-grafica", "pontuacao"],
  },
  {
    id: "gramatica-sem-segredos",
    title: "Gramática sem segredos",
    disciplina: "portugues",
    level: "Médio",
    count: 15,
    minutes: 10,
    sources: ["classes-gramaticais", "concordancia-verbal"],
  },
  {
    id: "mestre-da-interpretacao",
    title: "Mestre da interpretação",
    disciplina: "portugues",
    level: "Difícil",
    count: 12,
    minutes: 12,
    sources: ["interpretacao-de-texto", "producao-textual"],
  },
  {
    id: "desafio-aprende-mais",
    title: "Desafio Aprende+",
    disciplina: "misto", // Matemática e Português juntos
    level: "Médio",
    count: 20,
    minutes: 15,
    sources: exercicios.map((exercicio) => exercicio.id),
  },
];

export function getQuiz(id) {
  return quizzes.find((quiz) => quiz.id === id);
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Sorteia as questões do quiz e embaralha as alternativas
export function buildQuizQuestions(quiz) {
  const pool = exercicios
    .filter((exercicio) => quiz.sources.includes(exercicio.id))
    .flatMap((exercicio) => exercicio.questions);

  return shuffle(pool)
    .slice(0, quiz.count)
    .map((item) => {
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
