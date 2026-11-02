// Cada exercício tem uma lista de questões.
// "answer" é a posição da resposta certa em "options" (0 = A, 1 = B, 2 = C, 3 = D).
// Para adicionar mais questões, é só copiar um bloco { question, options, answer, explanation }.

export const exercicios = [
  {
    id: "operacoes-inteiros",
    title: "Operações com números inteiros",
    disciplina: "matematica",
    level: "Fácil",
    questions: [
      {
        question: "Quanto é 15 − 28?",
        options: ["−13", "13", "−43", "43"],
        answer: 0,
        explanation:
          "28 − 15 = 13, mas como 28 é maior que 15, o resultado fica negativo: −13.",
      },
      {
        question: "Quanto é (−6) × (−4)?",
        options: ["−24", "24", "−10", "10"],
        answer: 1,
        explanation:
          "Multiplicando dois números com o mesmo sinal, o resultado é positivo: 6 × 4 = 24.",
      },
      {
        question: "Quanto é 48 ÷ (−6)?",
        options: ["8", "−8", "−42", "42"],
        answer: 1,
        explanation:
          "48 ÷ 6 = 8. Como os sinais são diferentes, o resultado é negativo: −8.",
      },
      {
        question: "Quanto é −7 + 12?",
        options: ["−19", "−5", "5", "19"],
        answer: 2,
        explanation:
          "12 − 7 = 5. Como o 12 é maior, o resultado é positivo: 5.",
      },
      {
        question: "Qual é o resultado de 3 + 4 × 2?",
        options: ["14", "11", "10", "24"],
        answer: 1,
        explanation:
          "A multiplicação vem antes da soma: 4 × 2 = 8, e depois 3 + 8 = 11.",
      },
      {
        question: "Quanto é −9 − 5?",
        options: ["−4", "−14", "14", "4"],
        answer: 1,
        explanation:
          "Subtrair 5 de −9 é o mesmo que somar −9 e −5, e o resultado é −14.",
      },
      {
        question: "Quanto é 7 × (−8)?",
        options: ["56", "−56", "−15", "15"],
        answer: 1,
        explanation:
          "Sinais diferentes dão resultado negativo: 7 × 8 = 56, então o resultado é −56.",
      },
      {
        question: "Qual é o valor de 2² + 3³?",
        options: ["13", "31", "35", "25"],
        answer: 1,
        explanation: "2² = 4 e 3³ = 27. Então 4 + 27 = 31.",
      },
      {
        question: "Qual é o resultado de (12 − 4) × 3?",
        options: ["24", "0", "8", "16"],
        answer: 0,
        explanation:
          "Primeiro resolvemos o parêntese: 12 − 4 = 8. Depois, 8 × 3 = 24.",
      },
      {
        question: "Qual é o MMC de 4 e 6?",
        options: ["24", "12", "10", "2"],
        answer: 1,
        explanation:
          "Os múltiplos de 4 são 4, 8, 12... e os de 6 são 6, 12... O menor em comum é 12.",
      },
    ],
  },
  {
    id: "fracoes-na-pratica",
    title: "Frações na prática",
    disciplina: "matematica",
    level: "Fácil",
    questions: [
      {
        question: "Quanto é 1/2 + 1/4?",
        options: ["2/6", "3/4", "1/6", "2/4"],
        answer: 1,
        explanation: "1/2 = 2/4. Então 2/4 + 1/4 = 3/4.",
      },
      {
        question: "Qual é a maior fração?",
        options: ["1/3", "1/2", "1/4", "1/5"],
        answer: 1,
        explanation:
          "Quanto menor o denominador (com o mesmo numerador), maior é a fração. Logo, 1/2 é a maior.",
      },
      {
        question: "Quanto é 3/4 de 20?",
        options: ["12", "15", "5", "16"],
        answer: 1,
        explanation: "20 ÷ 4 = 5, e 5 × 3 = 15.",
      },
      {
        question: "O número decimal 0,75 corresponde a qual fração?",
        options: ["3/4", "7/5", "3/5", "75/10"],
        answer: 0,
        explanation: "0,75 = 75/100. Simplificando por 25, ficamos com 3/4.",
      },
      {
        question: "Quanto é 2/3 × 3/5?",
        options: ["5/8", "2/5", "6/8", "1/3"],
        answer: 1,
        explanation:
          "Multiplicamos numeradores e denominadores: 6/15. Simplificando por 3, dá 2/5.",
      },
      {
        question: "Quanto é 5/6 − 1/3?",
        options: ["4/3", "1/2", "2/3", "1/3"],
        answer: 1,
        explanation:
          "1/3 = 2/6. Então 5/6 − 2/6 = 3/6, que simplificado é 1/2.",
      },
      {
        question: "Qual é a forma irredutível da fração 18/24?",
        options: ["3/4", "9/12", "6/8", "2/3"],
        answer: 0,
        explanation:
          "Dividindo numerador e denominador por 6, obtemos 3/4. As outras ainda podem ser simplificadas.",
      },
      {
        question: "Quanto é 3/5 ÷ 3/10?",
        options: ["9/50", "2", "1/2", "9/15"],
        answer: 1,
        explanation:
          "Dividir é multiplicar pelo inverso: 3/5 × 10/3 = 30/15 = 2.",
      },
      {
        question: "Qual é o número decimal equivalente a 1/8?",
        options: ["0,18", "0,125", "0,8", "1,8"],
        answer: 1,
        explanation: "1 ÷ 8 = 0,125.",
      },
      {
        question:
          "Uma pizza tem 8 fatias. Ana comeu 3 e Bia comeu 2. Que fração da pizza foi comida?",
        options: ["5/8", "5/16", "3/8", "1/8"],
        answer: 0,
        explanation: "3/8 + 2/8 = 5/8.",
      },
    ],
  },
  {
    id: "porcentagem-dia-a-dia",
    title: "Porcentagem no dia a dia",
    disciplina: "matematica",
    level: "Médio",
    questions: [
      {
        question: "Quanto é 10% de 250?",
        options: ["2,5", "25", "250", "35"],
        answer: 1,
        explanation: "10% é o mesmo que dividir por 10: 250 ÷ 10 = 25.",
      },
      {
        question:
          "Um produto de R$ 80 está com 25% de desconto. Qual é o preço final?",
        options: ["R$ 20", "R$ 55", "R$ 60", "R$ 65"],
        answer: 2,
        explanation: "25% de 80 = 20. O preço final é 80 − 20 = R$ 60.",
      },
      {
        question: "40 é quantos por cento de 200?",
        options: ["20%", "40%", "5%", "50%"],
        answer: 0,
        explanation: "40 ÷ 200 = 0,2, que é 20%.",
      },
      {
        question: "Um aumento de 20% sobre R$ 150 resulta em quanto?",
        options: ["R$ 170", "R$ 180", "R$ 200", "R$ 175"],
        answer: 1,
        explanation: "20% de 150 = 30. Então 150 + 30 = R$ 180.",
      },
      {
        question: "Se 30% de um número é 45, qual é esse número?",
        options: ["135", "150", "120", "13,5"],
        answer: 1,
        explanation:
          "30% = 45, então 10% = 15. O número inteiro (100%) é 15 × 10 = 150.",
      },
      {
        question:
          "Em uma prova de 40 questões, João acertou 34. Qual foi o seu percentual de acertos?",
        options: ["80%", "85%", "90%", "75%"],
        answer: 1,
        explanation: "34 ÷ 40 = 0,85, ou seja, 85%.",
      },
      {
        question:
          "Um celular de R$ 1.200 teve desconto de 15%. Quanto ele passa a custar?",
        options: ["R$ 1.020", "R$ 1.050", "R$ 1.180", "R$ 900"],
        answer: 0,
        explanation:
          "15% de 1.200 = 180. O preço final é 1.200 − 180 = R$ 1.020.",
      },
      {
        question:
          "Um valor de R$ 500 rende 2% ao mês de juros simples. Quanto rende em 3 meses?",
        options: ["R$ 10", "R$ 30", "R$ 60", "R$ 300"],
        answer: 1,
        explanation: "2% de 500 = 10 por mês. Em 3 meses, 10 × 3 = R$ 30.",
      },
      {
        question:
          "Um produto de R$ 200 aumenta 10% e depois tem 10% de desconto. Qual é o preço final?",
        options: ["R$ 200", "R$ 198", "R$ 220", "R$ 180"],
        answer: 1,
        explanation:
          "Após o aumento, 220. Dez por cento de 220 é 22, então 220 − 22 = 198. Os percentuais incidem sobre valores diferentes.",
      },
      {
        question:
          "Em uma turma de 50 alunos, 60% são meninas. Quantos são meninos?",
        options: ["30", "20", "25", "10"],
        answer: 1,
        explanation: "Os meninos são 40% de 50, ou seja, 50 × 0,4 = 20.",
      },
    ],
  },
  {
    id: "area-e-perimetro",
    title: "Área e perímetro",
    disciplina: "matematica",
    level: "Médio",
    questions: [
      {
        question: "Qual é a área de um retângulo de 8 m por 5 m?",
        options: ["26 m²", "13 m²", "40 m²", "80 m²"],
        answer: 2,
        explanation: "Área do retângulo = base × altura = 8 × 5 = 40 m².",
      },
      {
        question: "Qual é o perímetro de um quadrado de lado 7 cm?",
        options: ["14 cm", "28 cm", "49 cm", "21 cm"],
        answer: 1,
        explanation: "O perímetro é a soma dos lados: 4 × 7 = 28 cm.",
      },
      {
        question: "Qual é a área de um triângulo com base 10 cm e altura 6 cm?",
        options: ["60 cm²", "30 cm²", "16 cm²", "36 cm²"],
        answer: 1,
        explanation:
          "Área do triângulo = (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 30 cm².",
      },
      {
        question: "Qual é a área de um círculo de raio 3 cm? (use π = 3,14)",
        options: ["18,84 cm²", "28,26 cm²", "9,42 cm²", "56,52 cm²"],
        answer: 1,
        explanation: "Área = π × r² = 3,14 × 3² = 3,14 × 9 = 28,26 cm².",
      },
      {
        question: "Qual é o volume de um cubo de aresta 4 cm?",
        options: ["16 cm³", "48 cm³", "64 cm³", "12 cm³"],
        answer: 2,
        explanation: "Volume do cubo = aresta³ = 4 × 4 × 4 = 64 cm³.",
      },
      {
        question:
          "Um terreno retangular mede 12 m de comprimento e 8 m de largura. Qual é o seu perímetro?",
        options: ["96 m", "40 m", "20 m", "48 m"],
        answer: 1,
        explanation: "Perímetro = 2 × (12 + 8) = 40 m.",
      },
      {
        question: "Qual é a área de um quadrado de lado 9 cm?",
        options: ["36 cm²", "18 cm²", "81 cm²", "27 cm²"],
        answer: 2,
        explanation: "Área do quadrado = lado × lado = 9 × 9 = 81 cm².",
      },
      {
        question:
          "Qual é a área de um trapézio de bases 8 cm e 4 cm e altura 5 cm?",
        options: ["30 cm²", "60 cm²", "32 cm²", "20 cm²"],
        answer: 0,
        explanation: "Área = (B + b) × h ÷ 2 = (8 + 4) × 5 ÷ 2 = 30 cm².",
      },
      {
        question:
          "Qual é o comprimento de uma circunferência de raio 5 cm? (use π = 3,14)",
        options: ["15,7 cm", "78,5 cm", "31,4 cm", "62,8 cm"],
        answer: 2,
        explanation: "Comprimento = 2 × π × r = 2 × 3,14 × 5 = 31,4 cm.",
      },
      {
        question:
          "Um paralelepípedo mede 5 cm, 4 cm e 3 cm. Qual é o seu volume?",
        options: ["12 cm³", "60 cm³", "47 cm³", "24 cm³"],
        answer: 1,
        explanation:
          "Volume = comprimento × largura × altura = 5 × 4 × 3 = 60 cm³.",
      },
    ],
  },
  {
    id: "equacoes-segundo-grau",
    title: "Equações do 2º grau",
    disciplina: "matematica",
    level: "Difícil",
    questions: [
      {
        question: "Quais são as raízes de x² − 5x + 6 = 0?",
        options: ["1 e 6", "2 e 3", "−2 e −3", "5 e 6"],
        answer: 1,
        explanation:
          "Procuramos dois números com soma 5 e produto 6: são 2 e 3.",
      },
      {
        question: "Qual é o valor de Δ (delta) em x² − 4x + 4 = 0?",
        options: ["0", "4", "8", "32"],
        answer: 0,
        explanation: "Δ = b² − 4ac = 16 − 4 · 1 · 4 = 16 − 16 = 0.",
      },
      {
        question: "Quantas raízes reais tem a equação x² + 1 = 0?",
        options: ["Nenhuma", "Uma", "Duas", "Infinitas"],
        answer: 0,
        explanation:
          "x² = −1 não tem solução entre os números reais, pois nenhum número real ao quadrado é negativo.",
      },
      {
        question: "Qual é a soma das raízes de x² − 7x + 10 = 0?",
        options: ["−7", "7", "10", "−10"],
        answer: 1,
        explanation:
          "A soma das raízes é −b/a = −(−7)/1 = 7. (As raízes são 2 e 5.)",
      },
      {
        question: "Quais são as raízes de x² − 9 = 0?",
        options: ["3 apenas", "9 e −9", "3 e −3", "0 e 9"],
        answer: 2,
        explanation: "x² = 9, então x = 3 ou x = −3.",
      },
      {
        question: "Qual é o valor de Δ (delta) em x² + 2x − 3 = 0?",
        options: ["16", "−8", "4", "8"],
        answer: 0,
        explanation: "Δ = b² − 4ac = 4 − 4 · 1 · (−3) = 4 + 12 = 16.",
      },
      {
        question: "Quais são as raízes de x² + 2x − 3 = 0?",
        options: ["1 e −3", "−1 e 3", "1 e 3", "−1 e −3"],
        answer: 0,
        explanation: "Com Δ = 16, x = (−2 ± 4) ÷ 2, que dá 1 e −3.",
      },
      {
        question: "Qual é o produto das raízes de x² − 8x + 15 = 0?",
        options: ["8", "−8", "15", "−15"],
        answer: 2,
        explanation: "O produto das raízes é c/a = 15. (As raízes são 3 e 5.)",
      },
      {
        question:
          "Para que x² − 6x + k = 0 tenha uma única raiz real, qual deve ser o valor de k?",
        options: ["6", "9", "3", "36"],
        answer: 1,
        explanation: "Uma única raiz exige Δ = 0: 36 − 4k = 0, então k = 9.",
      },
      {
        question: "Resolvendo 2x² − 8 = 0, encontramos x igual a:",
        options: ["4 e −4", "2 e −2", "2 apenas", "8 e −8"],
        answer: 1,
        explanation: "2x² = 8, então x² = 4 e x = 2 ou x = −2.",
      },
    ],
  },
  {
    id: "acentuacao-grafica",
    title: "Acentuação gráfica",
    disciplina: "portugues",
    level: "Fácil",
    questions: [
      {
        question: "Qual palavra está corretamente acentuada?",
        options: ["Cafe", "Café", "Cafê", "Càfe"],
        answer: 1,
        explanation:
          "Oxítonas terminadas em A, E ou O (seguidas ou não de S) são acentuadas: café.",
      },
      {
        question: "A palavra “árvore” é acentuada porque é:",
        options: ["Oxítona", "Paroxítona", "Proparoxítona", "Monossílaba"],
        answer: 2,
        explanation:
          "“Ár-vo-re” tem a sílaba tônica na antepenúltima: é proparoxítona, e todas elas são acentuadas.",
      },
      {
        question: "Qual das palavras está escrita corretamente?",
        options: ["Ideia", "Idéia", "Ideía", "Ìdeia"],
        answer: 0,
        explanation:
          "Pelo Acordo Ortográfico, as paroxítonas com ditongo aberto “ei” perderam o acento: ideia.",
      },
      {
        question: "“Você” é acentuada porque é uma palavra:",
        options: [
          "Oxítona terminada em “e”",
          "Paroxítona terminada em “a”",
          "Proparoxítona",
          "Monossílaba átona",
        ],
        answer: 0,
        explanation:
          "A sílaba tônica de “você” é a última (vo-CÊ), e ela termina em E.",
      },
      {
        question:
          "Em “Ele vai pôr a mesa”, o acento em “pôr” serve para diferenciar o verbo de qual palavra?",
        options: ["por", "pôs", "pois", "pior"],
        answer: 0,
        explanation:
          "“Pôr” (verbo) mantém o acento diferencial para não ser confundido com “por” (preposição).",
      },
      {
        question:
          "Qual palavra é acentuada por ser paroxítona terminada em “i”?",
        options: ["Táxi", "Café", "Árvore", "Pôr"],
        answer: 0,
        explanation:
          "Em “tá-xi”, a sílaba tônica é a penúltima, e paroxítonas terminadas em I são acentuadas.",
      },
      {
        question:
          "Qual alternativa tem todas as palavras corretamente acentuadas?",
        options: [
          "Pássaro, público, ônibus",
          "Passaro, publico, onibus",
          "Pássaro, publico, ônibus",
          "Passáro, público, onibus",
        ],
        answer: 0,
        explanation:
          "Todas são proparoxítonas, e as proparoxítonas sempre levam acento.",
      },
      {
        question: "A palavra “saída” é acentuada porque:",
        options: [
          "Tem “i” tônico formando hiato com a vogal anterior",
          "É oxítona",
          "É monossílaba",
          "É proparoxítona",
        ],
        answer: 0,
        explanation:
          "O “i” fica sozinho na sílaba tônica (sa-í-da) e forma hiato com o “a”.",
      },
      {
        question: "Qual palavra está escrita corretamente?",
        options: ["Heroi", "Herói", "Heróï", "Hèroi"],
        answer: 1,
        explanation: "Oxítonas com ditongo aberto “ói” são acentuadas: herói.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Eles têm razão.",
          "Eles tem razão.",
          "Eles têem razão.",
          "Eles tém razão.",
        ],
        answer: 0,
        explanation:
          "No plural, o verbo “ter” recebe acento circunflexo: eles têm.",
      },
    ],
  },
  {
    id: "classes-gramaticais",
    title: "Classes gramaticais",
    disciplina: "portugues",
    level: "Fácil",
    questions: [
      {
        question: "Em “A casa é grande”, a palavra “casa” é um:",
        options: ["Verbo", "Substantivo", "Adjetivo", "Advérbio"],
        answer: 1,
        explanation:
          "“Casa” dá nome a um ser ou objeto, então é um substantivo.",
      },
      {
        question: "A palavra “rapidamente” é um:",
        options: ["Adjetivo", "Substantivo", "Advérbio", "Pronome"],
        answer: 2,
        explanation:
          "Ela indica o modo como algo acontece e não varia em gênero ou número: é um advérbio.",
      },
      {
        question: "Em “Ela comprou um carro novo”, a palavra “novo” é um:",
        options: ["Verbo", "Adjetivo", "Advérbio", "Artigo"],
        answer: 1,
        explanation:
          "“Novo” dá uma característica ao substantivo “carro”: é um adjetivo.",
      },
      {
        question: "A palavra “correr” pertence a qual classe gramatical?",
        options: ["Substantivo", "Adjetivo", "Verbo", "Preposição"],
        answer: 2,
        explanation:
          "“Correr” indica uma ação, então é um verbo (no infinitivo).",
      },
      {
        question: "Em “Ele mora perto de mim”, a palavra “mim” é um:",
        options: ["Preposição", "Pronome", "Artigo", "Numeral"],
        answer: 1,
        explanation:
          "“Mim” é um pronome pessoal oblíquo: ele substitui a pessoa que fala.",
      },
      {
        question: "Em “Eles chegaram cedo”, a palavra “cedo” é um:",
        options: ["Adjetivo", "Advérbio", "Substantivo", "Verbo"],
        answer: 1,
        explanation:
          "“Cedo” indica o tempo em que a ação aconteceu: é um advérbio.",
      },
      {
        question: "Em “O menino e a menina brincam”, a palavra “e” é uma:",
        options: ["Preposição", "Conjunção", "Artigo", "Pronome"],
        answer: 1,
        explanation: "“E” liga termos de mesma função, então é uma conjunção.",
      },
      {
        question: "Em “Fui ao mercado”, a palavra “ao” é a união de:",
        options: [
          "Preposição + artigo",
          "Conjunção + artigo",
          "Pronome + verbo",
          "Advérbio + artigo",
        ],
        answer: 0,
        explanation: "“Ao” é a contração da preposição “a” com o artigo “o”.",
      },
      {
        question: "Qual das palavras abaixo é um numeral?",
        options: ["Terceiro", "Terrível", "Tenro", "Terreno"],
        answer: 0,
        explanation:
          "“Terceiro” indica posição em uma sequência, então é um numeral ordinal.",
      },
      {
        question: "Qual das palavras abaixo é uma interjeição?",
        options: ["Mas", "Perto", "Ufa!", "Sempre"],
        answer: 2,
        explanation:
          "Interjeições expressam emoções ou sensações, como “Ufa!”.",
      },
    ],
  },
  {
    id: "concordancia-verbal",
    title: "Concordância verbal",
    disciplina: "portugues",
    level: "Médio",
    questions: [
      {
        question: "Qual frase está correta?",
        options: [
          "Os alunos chegou cedo.",
          "Os alunos chegaram cedo.",
          "O alunos chegaram cedo.",
          "Os aluno chegaram cedo.",
        ],
        answer: 1,
        explanation:
          "O verbo concorda com o sujeito: “os alunos” está no plural, então “chegaram”.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Fazem dois anos que moro aqui.",
          "Faz dois anos que moro aqui.",
          "Fazem dois ano que moro aqui.",
          "Fazia dois anos que moro aqui.",
        ],
        answer: 1,
        explanation:
          "O verbo “fazer” indicando tempo decorrido é impessoal e fica na 3ª pessoa do singular: faz.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Haviam muitas pessoas na festa.",
          "Havia muitas pessoas na festa.",
          "Houveram muitas pessoas na festa.",
          "Haviam muitas pessoa na festa.",
        ],
        answer: 1,
        explanation:
          "O verbo “haver” com sentido de “existir” é impessoal e não vai para o plural: havia.",
      },
      {
        question: "Complete: “Eu e ela ___ ao cinema ontem.”",
        options: ["foi", "foram", "fomos", "foste"],
        answer: 2,
        explanation:
          "“Eu e ela” equivale a “nós”, então o verbo vai para a 1ª pessoa do plural: fomos.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Choveram muito ontem.",
          "Choveu muito ontem.",
          "Chovem muito ontem.",
          "Choveram muitas ontem.",
        ],
        answer: 1,
        explanation:
          "Verbos que indicam fenômenos da natureza são impessoais e ficam no singular: choveu.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Existe muitos problemas.",
          "Existem muitos problemas.",
          "Existe muitos problema.",
          "Existem muito problemas.",
        ],
        answer: 1,
        explanation:
          "O verbo “existir” concorda com o sujeito “muitos problemas”, que está no plural.",
      },
      {
        question: "Complete: “Tu ___ muito bem.”",
        options: ["fala", "falam", "falamos", "falas"],
        answer: 3,
        explanation: "O pronome “tu” pede a 2ª pessoa do singular: falas.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Vende-se casas.",
          "Vendem-se casas.",
          "Vendem-se casa.",
          "Vende-se casa muitas.",
        ],
        answer: 1,
        explanation:
          "Em “vendem-se casas”, “casas” é o sujeito, e o verbo concorda com ele.",
      },
      {
        question: "Complete: “Mais de um aluno ___ a prova.”",
        options: ["fizeram", "fazem", "fez", "fazemos"],
        answer: 2,
        explanation:
          "A expressão “mais de um” leva o verbo para o singular: fez.",
      },
      {
        question: "Qual frase está correta?",
        options: [
          "Devem haver soluções.",
          "Deve haver soluções.",
          "Devem haverem soluções.",
          "Deve haverem soluções.",
        ],
        answer: 1,
        explanation:
          "Quando “haver” significa “existir”, é impessoal, e o verbo auxiliar também fica no singular: deve haver.",
      },
    ],
  },
  {
    id: "interpretacao-de-texto",
    title: "Interpretação de texto",
    disciplina: "portugues",
    level: "Médio",
    questions: [
      {
        question:
          "“João acordou tarde, perdeu o ônibus e chegou atrasado à prova.” Qual foi a consequência de ele ter perdido o ônibus?",
        options: [
          "Acordar tarde",
          "Chegar atrasado à prova",
          "Fazer a prova",
          "Ficar em casa",
        ],
        answer: 1,
        explanation:
          "O texto liga as ações em sequência: perdeu o ônibus e, por isso, chegou atrasado.",
      },
      {
        question:
          "Em “Apesar da chuva forte, o jogo foi mantido”, a expressão “apesar de” indica:",
        options: ["Causa", "Oposição (concessão)", "Tempo", "Finalidade"],
        answer: 1,
        explanation:
          "A chuva seria um motivo para cancelar, mas o jogo aconteceu mesmo assim: há uma ideia de oposição.",
      },
      {
        question:
          "“O silêncio da sala dizia mais do que mil palavras.” Essa frase usa linguagem:",
        options: [
          "Denotativa (literal)",
          "Conotativa (figurada)",
          "Científica",
          "Técnica",
        ],
        answer: 1,
        explanation:
          "O silêncio não “fala” de verdade: o autor usa uma imagem para dar um sentido figurado.",
      },
      {
        question:
          "Em “Maria disse a Ana que ela estava atrasada”, o que há de problemático?",
        options: ["Ambiguidade", "Rima", "Ironia", "Pontuação errada"],
        answer: 0,
        explanation:
          "O pronome “ela” pode se referir tanto a Maria quanto a Ana, o que torna a frase ambígua.",
      },
      {
        question:
          "“Reciclar é preciso: cada garrafa reaproveitada diminui o lixo nas ruas.” Qual é a ideia central?",
        options: [
          "Garrafas são caras",
          "Reciclar ajuda a reduzir o lixo",
          "O lixo é inevitável",
          "As ruas são sujas",
        ],
        answer: 1,
        explanation:
          "O texto defende a reciclagem e mostra o benefício: menos lixo nas ruas.",
      },
      {
        question:
          "“Ana guardou o guarda-chuva na bolsa, pois o céu estava limpo.” Por que ela guardou o guarda-chuva?",
        options: [
          "Porque estava chovendo",
          "Porque o céu estava limpo",
          "Porque o perdeu",
          "Porque o emprestou",
        ],
        answer: 1,
        explanation: "A palavra “pois” introduz o motivo: o céu estava limpo.",
      },
      {
        question: "“O vento sussurrava segredos pela janela.” Essa frase usa:",
        options: ["Comparação", "Ironia", "Personificação", "Hipérbole"],
        answer: 2,
        explanation:
          "O vento recebe uma ação humana (sussurrar), o que é uma personificação.",
      },
      {
        question: "“Estou morrendo de fome!” é um exemplo de:",
        options: ["Metáfora", "Hipérbole (exagero)", "Ironia", "Eufemismo"],
        answer: 1,
        explanation:
          "A pessoa exagera a sensação de fome para dar ênfase: é uma hipérbole.",
      },
      {
        question: "Em “Ele é rápido como um raio”, há uma:",
        options: ["Metáfora", "Personificação", "Comparação", "Antítese"],
        answer: 2,
        explanation:
          "A palavra “como” compara duas coisas explicitamente: é uma comparação.",
      },
      {
        question:
          "Um texto que informa fatos recentes, como uma notícia, costuma apresentar:",
        options: [
          "Rimas e versos",
          "Diálogos de personagens",
          "Linguagem totalmente figurada",
          "Linguagem objetiva e clara",
        ],
        answer: 3,
        explanation:
          "Textos jornalísticos priorizam a objetividade e a clareza para informar o leitor.",
      },
    ],
  },
  {
    id: "estatistica-probabilidade",
    title: "Estatística e probabilidade",
    disciplina: "matematica",
    level: "Médio",
    questions: [
      {
        question: "Qual é a média aritmética de 4, 8 e 12?",
        options: ["6", "8", "10", "12"],
        answer: 1,
        explanation:
          "Somamos os valores e dividimos pela quantidade: (4 + 8 + 12) ÷ 3 = 24 ÷ 3 = 8.",
      },
      {
        question: "Qual é a mediana do conjunto 3, 7, 9, 12, 15?",
        options: ["9", "7", "12", "9,5"],
        answer: 0,
        explanation: "Com os valores em ordem, a mediana é o termo do meio: 9.",
      },
      {
        question: "Qual é a moda do conjunto 2, 3, 3, 5, 3, 7, 5?",
        options: ["5", "3", "2", "7"],
        answer: 1,
        explanation:
          "A moda é o valor que mais se repete. O 3 aparece três vezes.",
      },
      {
        question: "Ao lançar uma moeda, qual é a probabilidade de sair cara?",
        options: ["1", "1/4", "2", "1/2"],
        answer: 3,
        explanation: "Há 2 resultados possíveis e 1 favorável: 1/2.",
      },
      {
        question:
          "Ao lançar um dado comum, qual é a probabilidade de sair um número par?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        answer: 2,
        explanation:
          "Os números pares são 2, 4 e 6: 3 casos em 6, ou seja, 1/2.",
      },
      {
        question:
          "Uma urna tem 3 bolas vermelhas e 7 azuis. Qual é a probabilidade de sortear uma vermelha?",
        options: ["3/7", "3/10", "7/10", "1/3"],
        answer: 1,
        explanation: "Há 3 bolas vermelhas em um total de 10: 3/10.",
      },
      {
        question: "A média de 5 notas é 7. Qual é a soma dessas notas?",
        options: ["12", "28", "7", "35"],
        answer: 3,
        explanation: "Média = soma ÷ quantidade, então soma = 7 × 5 = 35.",
      },
      {
        question: "Qual é a mediana de 10, 4, 8, 6?",
        options: ["6", "8", "7", "9"],
        answer: 2,
        explanation:
          "Em ordem: 4, 6, 8, 10. Com quantidade par, tiramos a média dos dois do meio: (6 + 8) ÷ 2 = 7.",
      },
      {
        question:
          "Em uma pesquisa, 20 de 80 pessoas escolheram suco de laranja. Que percentual isso representa?",
        options: ["20%", "25%", "30%", "40%"],
        answer: 1,
        explanation: "20 ÷ 80 = 0,25, ou seja, 25%.",
      },
      {
        question:
          "Qual é a probabilidade de sortear uma carta de copas em um baralho de 52 cartas (13 de cada naipe)?",
        options: ["1/2", "1/13", "1/4", "1/52"],
        answer: 2,
        explanation: "Há 13 cartas de copas em 52: 13/52 = 1/4.",
      },
    ],
  },
  {
    id: "pontuacao",
    title: "Pontuação",
    disciplina: "portugues",
    level: "Fácil",
    questions: [
      {
        question: "Qual frase usa a vírgula corretamente?",
        options: [
          "Ana, comprou pão, leite e ovos.",
          "Ana comprou, pão leite e ovos.",
          "Ana comprou pão leite, e ovos.",
          "Ana comprou pão, leite e ovos.",
        ],
        answer: 3,
        explanation:
          "A vírgula separa os itens da enumeração e não deve separar o sujeito do verbo.",
      },
      {
        question: "Qual sinal é usado para encerrar uma pergunta?",
        options: [
          "Ponto final",
          "Ponto de exclamação",
          "Ponto de interrogação",
          "Reticências",
        ],
        answer: 2,
        explanation: "Perguntas diretas terminam com ponto de interrogação.",
      },
      {
        question: "Em “Maria, venha cá!”, a vírgula serve para isolar:",
        options: [
          "O aposto",
          "O vocativo",
          "O adjunto adverbial",
          "A oração subordinada",
        ],
        answer: 1,
        explanation:
          "“Maria” é o termo usado para chamar alguém, ou seja, um vocativo.",
      },
      {
        question: "Qual frase está corretamente pontuada?",
        options: [
          "Meu amigo, que mora em Recife visitou-me.",
          "Meu amigo que, mora em Recife, visitou-me.",
          "Meu amigo, que mora em Recife, visitou-me.",
          "Meu, amigo que mora em Recife, visitou-me.",
        ],
        answer: 2,
        explanation:
          "A oração explicativa “que mora em Recife” é isolada por vírgulas.",
      },
      {
        question: "Qual sinal costuma introduzir uma lista ou uma explicação?",
        options: [
          "Ponto final",
          "Vírgula",
          "Dois-pontos",
          "Ponto de interrogação",
        ],
        answer: 2,
        explanation:
          "Os dois-pontos anunciam enumerações, explicações ou citações.",
      },
      {
        question: "As reticências (...) podem indicar:",
        options: [
          "Fim de pergunta",
          "Interrupção ou suspense",
          "Ordem",
          "Apenas citação direta",
        ],
        answer: 1,
        explanation:
          "Elas sugerem que o pensamento ficou incompleto, criando suspense ou hesitação.",
      },
      {
        question: "Qual frase usa o ponto de exclamação adequadamente?",
        options: [
          "Onde você mora!",
          "Você vai à festa!",
          "Que dia lindo!",
          "Qual é o seu nome!",
        ],
        answer: 2,
        explanation:
          "A exclamação expressa emoção, como admiração: “Que dia lindo!”.",
      },
      {
        question:
          "Em um diálogo, qual sinal costuma indicar a fala de um personagem?",
        options: ["Parênteses", "Travessão", "Ponto e vírgula", "Asterisco"],
        answer: 1,
        explanation: "O travessão marca o início da fala de cada personagem.",
      },
      {
        question: "Em “Comprei maçãs, peras e uvas”, as vírgulas servem para:",
        options: [
          "Isolar o vocativo",
          "Indicar pergunta",
          "Separar elementos de uma enumeração",
          "Marcar o fim da frase",
        ],
        answer: 2,
        explanation:
          "Elas separam os itens da lista, e o “e” liga os dois últimos.",
      },
      {
        question: "O ponto e vírgula (;) é usado, em geral, para:",
        options: [
          "Encerrar uma pergunta",
          "Indicar exclamação",
          "Iniciar um diálogo",
          "Separar partes de uma frase com pausa maior que a da vírgula",
        ],
        answer: 3,
        explanation:
          "Ele marca uma pausa intermediária entre a vírgula e o ponto.",
      },
    ],
  },
  {
    id: "producao-textual",
    title: "Produção textual",
    disciplina: "portugues",
    level: "Difícil",
    questions: [
      {
        question: "Qual é a estrutura básica de uma dissertação?",
        options: [
          "Título, rima e verso",
          "Fala, narrador e cenário",
          "Introdução, desenvolvimento e conclusão",
          "Cabeçalho, vocativo e despedida",
        ],
        answer: 2,
        explanation:
          "A dissertação apresenta o tema na introdução, desenvolve os argumentos e fecha na conclusão.",
      },
      {
        question:
          "Qual gênero textual costuma ter vocativo, corpo do texto e despedida?",
        options: ["Receita", "Notícia", "Poema", "Carta"],
        answer: 3,
        explanation:
          "A carta começa chamando o destinatário (vocativo), traz a mensagem e termina com a despedida.",
      },
      {
        question: "A coesão textual é responsável por:",
        options: [
          "Deixar o texto mais longo",
          "Substituir a pontuação",
          "Ligar as partes do texto com conectivos e retomadas",
          "Eliminar o título",
        ],
        answer: 2,
        explanation:
          "Conectivos e pronomes ligam frases e parágrafos, dando fluidez ao texto.",
      },
      {
        question: "Qual conectivo indica oposição?",
        options: ["Portanto", "Porém", "Porque", "Quando"],
        answer: 1,
        explanation: "“Porém” introduz uma ideia contrária à anterior.",
      },
      {
        question: "Qual conectivo indica conclusão?",
        options: ["Mas", "Embora", "Logo", "Se"],
        answer: 2,
        explanation: "“Logo” introduz uma conclusão a partir do que foi dito.",
      },
      {
        question: "Em uma redação argumentativa, a tese é:",
        options: [
          "A lista de referências",
          "A ideia principal defendida pelo autor",
          "O título do texto",
          "O parágrafo final",
        ],
        answer: 1,
        explanation:
          "A tese é a posição que o autor defende e sustenta com argumentos.",
      },
      {
        question: "Qual é o objetivo principal do parágrafo de conclusão?",
        options: [
          "Apresentar um assunto novo",
          "Contar uma piada",
          "Repetir o título",
          "Retomar a tese e fechar o raciocínio",
        ],
        answer: 3,
        explanation:
          "A conclusão retoma a ideia central e encerra o texto, muitas vezes com uma proposta.",
      },
      {
        question: "Qual destas frases é mais adequada à linguagem formal?",
        options: [
          "Os caras passaram de ano.",
          "Rolou a aprovação geral.",
          "Os alunos foram aprovados.",
          "A galera mandou bem na prova.",
        ],
        answer: 2,
        explanation:
          "As outras usam gírias e expressões informais, que não combinam com textos formais.",
      },
      {
        question: "Para evitar repetir uma palavra no texto, podemos usar:",
        options: [
          "Mais vírgulas",
          "Letras maiúsculas",
          "Travessões",
          "Sinônimos e pronomes",
        ],
        answer: 3,
        explanation:
          "Sinônimos e pronomes retomam a ideia sem repetir a mesma palavra.",
      },
      {
        question: "Qual destes é um gênero textual narrativo?",
        options: [
          "Bula de remédio",
          "Manual de instruções",
          "Conto",
          "Lista de compras",
        ],
        answer: 2,
        explanation:
          "O conto conta uma história, com personagens, tempo, espaço e enredo.",
      },
    ],
  },
];

export function getExercicio(id) {
  return exercicios.find((exercicio) => exercicio.id === id);
}
