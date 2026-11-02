import { Calculator, BookText } from "lucide-react";

// Cores das etiquetas de dificuldade
export const levelStyles = {
  Fácil: "bg-green-50 text-green-700",
  Médio: "bg-amber-50 text-amber-700",
  Difícil: "bg-red-50 text-red-600",
};

// DADOS DE EXEMPLO: troque pelos conteúdos reais do seu projeto
export const disciplinas = [
  {
    slug: "matematica",
    name: "Matemática",
    icon: Calculator,
    description:
      "Do básico ao avançado: aprenda os conceitos com explicações simples e muita prática.",
    topics: [
      {
        title: "Operações básicas",
        description:
          "Adição, subtração, multiplicação e divisão com números inteiros.",
        lessons: 8,
        level: "Fácil",
      },
      {
        title: "Frações e decimais",
        description: "Representação, comparação e operações com frações.",
        lessons: 10,
        level: "Fácil",
      },
      {
        title: "Porcentagem",
        description: "Descontos, acréscimos e juros no dia a dia.",
        lessons: 6,
        level: "Médio",
      },
      {
        title: "Geometria",
        description: "Figuras planas, perímetro, área e volume.",
        lessons: 12,
        level: "Médio",
      },
      {
        title: "Equações",
        description: "Equações do 1º e do 2º grau, passo a passo.",
        lessons: 9,
        level: "Difícil",
      },
      {
        title: "Estatística e probabilidade",
        description: "Média, mediana, leitura de gráficos e chances.",
        lessons: 7,
        level: "Médio",
      },
    ],
  },
  {
    slug: "portugues",
    name: "Português",
    icon: BookText,
    description:
      "Gramática, leitura e escrita: domine a língua portuguesa com clareza e confiança.",
    topics: [
      {
        title: "Ortografia e acentuação",
        description: "Regras de acentuação gráfica e o uso correto das letras.",
        lessons: 8,
        level: "Fácil",
      },
      {
        title: "Classes gramaticais",
        description: "Substantivo, adjetivo, verbo, advérbio e muito mais.",
        lessons: 10,
        level: "Fácil",
      },
      {
        title: "Pontuação",
        description: "Vírgula, ponto, dois-pontos e como usá-los bem.",
        lessons: 6,
        level: "Fácil",
      },
      {
        title: "Concordância",
        description: "Concordância verbal e nominal sem mistério.",
        lessons: 7,
        level: "Médio",
      },
      {
        title: "Interpretação de texto",
        description: "Estratégias para entender e analisar diferentes textos.",
        lessons: 9,
        level: "Médio",
      },
      {
        title: "Produção textual",
        description: "Como escrever redações, cartas e textos dissertativos.",
        lessons: 8,
        level: "Difícil",
      },
    ],
  },
];

export const exercicios = [
  {
    id: 1,
    title: "Operações com números inteiros",
    disciplina: "matematica",
    level: "Fácil",
    questions: 10,
  },
  {
    id: 2,
    title: "Frações na prática",
    disciplina: "matematica",
    level: "Fácil",
    questions: 12,
  },
  {
    id: 3,
    title: "Porcentagem no dia a dia",
    disciplina: "matematica",
    level: "Médio",
    questions: 10,
  },
  {
    id: 4,
    title: "Área e perímetro",
    disciplina: "matematica",
    level: "Médio",
    questions: 15,
  },
  {
    id: 5,
    title: "Equações do 2º grau",
    disciplina: "matematica",
    level: "Difícil",
    questions: 8,
  },
  {
    id: 6,
    title: "Acentuação gráfica",
    disciplina: "portugues",
    level: "Fácil",
    questions: 12,
  },
  {
    id: 7,
    title: "Classes gramaticais",
    disciplina: "portugues",
    level: "Fácil",
    questions: 10,
  },
  {
    id: 8,
    title: "Concordância verbal",
    disciplina: "portugues",
    level: "Médio",
    questions: 10,
  },
  {
    id: 9,
    title: "Interpretação de texto",
    disciplina: "portugues",
    level: "Médio",
    questions: 8,
  },
];

export const quizzes = [
  {
    id: 1,
    title: "Desafio relâmpago de Matemática",
    disciplina: "matematica",
    level: "Fácil",
    questions: 10,
    minutes: 5,
  },
  {
    id: 2,
    title: "Frações e porcentagem",
    disciplina: "matematica",
    level: "Médio",
    questions: 15,
    minutes: 10,
  },
  {
    id: 3,
    title: "Geometria em ação",
    disciplina: "matematica",
    level: "Médio",
    questions: 12,
    minutes: 8,
  },
  {
    id: 4,
    title: "Quiz de ortografia",
    disciplina: "portugues",
    level: "Fácil",
    questions: 10,
    minutes: 5,
  },
  {
    id: 5,
    title: "Gramática sem segredos",
    disciplina: "portugues",
    level: "Médio",
    questions: 15,
    minutes: 10,
  },
  {
    id: 6,
    title: "Mestre da interpretação",
    disciplina: "portugues",
    level: "Difícil",
    questions: 12,
    minutes: 12,
  },
];

export function getDisciplina(slug) {
  return disciplinas.find((d) => d.slug === slug);
}
