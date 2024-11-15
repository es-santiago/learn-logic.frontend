interface QuestionItems {
  questionId: string; // Guid equivalente ao tipo string em TypeScript
  label: string;
  isCorrect: boolean;
  order: number;
  question?: Question; // Referência opcional para evitar problemas de referência circular
  id: string;
  creationDate: string;
  changeDate: string;
  activated: boolean;
}
