export const QuestionStatusEnum = {
  PENDING: { id: 0, value: "PENDING", label: "Pendente" },
  APPROVED: { id: 1, value: "APPROVED", label: "Aprovado" },
  REFUSED: { id: 2, value: "REFUSED", label: "Recusado" },
  CANCELLED: { id: 3, value: "CANCELLED", label: "Cancelada" },
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case QuestionStatusEnum.PENDING.value:
      return "TESTE_COLOR";

    case QuestionStatusEnum.APPROVED.value:
      return "ATIVO";

    case QuestionStatusEnum.REFUSED.value:
      return "destructive";

    case QuestionStatusEnum.CANCELLED.value:
      return "destructive";

    default:
      return "default";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case QuestionStatusEnum.PENDING.value:
      return QuestionStatusEnum.PENDING.label;

    case QuestionStatusEnum.APPROVED.value:
      return QuestionStatusEnum.APPROVED.label;

    case QuestionStatusEnum.REFUSED.value:
      return QuestionStatusEnum.REFUSED.label;

    case QuestionStatusEnum.CANCELLED.value:
      return QuestionStatusEnum.CANCELLED.label;

    default:
      return "Status não Definido";
  }
};
