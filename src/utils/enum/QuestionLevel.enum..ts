export const QuestionLevelEnum = {
  BEGINNER: { id: 0, value: "Beginner", label: "Iniciante" },
  INTERMEDIATE: { id: 1, value: "Intermediate", label: "Intermediário" },
  ADVANCED: { id: 1, value: "Advanced", label: "Avançado" },
  EXPERT: { id: 1, value: "Expert", label: "Especialista" },
};

export const getLevelColor = (status: string) => {
  switch (status) {
    case QuestionLevelEnum.BEGINNER.value:
      return "TESTE_COLOR";

    case QuestionLevelEnum.INTERMEDIATE.value:
      return "ATIVO";

    case QuestionLevelEnum.ADVANCED.value:
      return "destructive";

    case QuestionLevelEnum.EXPERT.value:
      return "TESTE_COLOR_2";

    default:
      return "default";
  }
};

export const getLevelLabel = (level: string) => {
  switch (level) {
    case QuestionLevelEnum.BEGINNER.value:
      return QuestionLevelEnum.BEGINNER.label;

    case QuestionLevelEnum.INTERMEDIATE.value:
      return QuestionLevelEnum.INTERMEDIATE.label;

    case QuestionLevelEnum.ADVANCED.value:
      return QuestionLevelEnum.ADVANCED.label;

    case QuestionLevelEnum.EXPERT.value:
      return QuestionLevelEnum.EXPERT.label;

    default:
      return "Nível não Definido";
  }
};

export const getLevelLabelById = (level: number) => {
  switch (level) {
    case QuestionLevelEnum.BEGINNER.id:
      return QuestionLevelEnum.BEGINNER.label;

    case QuestionLevelEnum.INTERMEDIATE.id:
      return QuestionLevelEnum.INTERMEDIATE.label;

    case QuestionLevelEnum.ADVANCED.id:
      return QuestionLevelEnum.ADVANCED.label;

    case QuestionLevelEnum.EXPERT.id:
      return QuestionLevelEnum.EXPERT.label;

    default:
      return "Default";
  }
};
