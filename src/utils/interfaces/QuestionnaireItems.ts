interface QuestionnaireItems {
  question: string;
  options: string[];
  answer: string;
  points: number;
}

export const questionnaire: QuestionnaireItems[] = [
  {
    question: "Há quanto tempo você trabalha ou estuda na área de programação?",
    options: ["3-5 anos", "Menos de 1 ano", "1-2 anos", "Mais de 5 anos"],
    answer: "3-5 anos",
    points: 1,
  },
  {
    question:
      "Você possui formação acadêmica na área de tecnologia ou ciência da computação?",
    options: [
      "Sim, estou cursando",
      "Não, e não pretendo cursar",
      "Sim, sou formado(a)",
      "Não, mas planejo cursar",
    ],
    answer: "Sim, sou formado(a)",
    points: 1,
  },
  {
    question: "Qual é o seu nível de experiência prática com programação?",
    options: ["Nenhuma experiência", "Intermediário", "Avançado", "Iniciante"],
    answer: "Avançado",
    points: 1,
  },
  {
    question: "O que é um algoritmo?",
    options: [
      "Um tipo de dado",
      "Uma sequência finita de instruções para resolver um problema",
      "Uma ferramenta de desenvolvimento",
      "Uma linguagem de programação",
    ],
    answer: "Uma sequência finita de instruções para resolver um problema",
    points: 2,
  },
  {
    question:
      "Qual das opções a seguir representa uma estrutura de controle condicional?",
    options: ["variável", "função", "loop", "if-else"],
    answer: "if-else",
    points: 1,
  },
  {
    question: "O que é uma variável?",
    options: [
      "Um valor fixo",
      "Um nome que se refere a um valor armazenado na memória",
      "Um tipo de dado",
      "Uma operação matemática",
    ],
    answer: "Um nome que se refere a um valor armazenado na memória",
    points: 1,
  },
  {
    question:
      "Dada a expressão lógica: (A AND B) OR (NOT A), qual é o valor quando A é verdadeiro e B é falso?",
    options: ["Falso", "Verdadeiro"],
    answer: "Falso",
    points: 2,
  },
  {
    question: "Qual é a saída do seguinte pseudocódigo?",
    options: [
      "Y is greater",
      "X is equal to Y",
      "Nenhuma das anteriores",
      "X is greater",
    ],
    answer: "X is greater",
    points: 2,
  },
  {
    question: "O que representa um loop 'for'?",
    options: [
      "Interrompe a execução de um código",
      "Executa um bloco de código para cada item de uma sequência",
      "Executa um bloco de código enquanto uma condição é verdadeira",
      "Executa um bloco de código uma vez",
    ],
    answer: "Executa um bloco de código para cada item de uma sequência",
    points: 1,
  },
  {
    question:
      "Qual será a saída do seguinte código? for i in range(3): for j in range(2): print(i, j)",
    options: [
      "0 0, 1 0, 1 1, 2 0, 2 1",
      "0 0, 0 1, 1 0, 1 1, 2 0",
      "0 0, 1 1, 2 0, 1 0, 2 1",
    ],
    answer: "0 0, 1 0, 1 1, 2 0, 2 1",
    points: 2,
  },
  {
    question:
      "Considere a função recursiva a seguir. Qual será a saída se chamarmos fun(3)? def fun(n): if n == 0: return 1 else: return n * fun(n-1)",
    options: ["1", "2", "3", "6"],
    answer: "6",
    points: 2,
  },
  {
    question: "O que é backtracking em termos de algoritmos?",
    options: [
      "Uma técnica para evitar deadlocks",
      "Um tipo de ordenação",
      "Um método de explorar todas as soluções possíveis",
      "Uma forma de armazenar dados",
    ],
    answer: "Um método de explorar todas as soluções possíveis",
    points: 2,
  },
];
