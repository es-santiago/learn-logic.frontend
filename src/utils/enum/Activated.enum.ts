export const ActivatedEnum = {
  TRUE: { value: true, label: "Ativo" },
  FALSE: { value: false, label: "Inativo" },
};

export const getActivatedColor = (value: boolean) => {
  return value ? "ATIVO" : "INATIVO";
};

export const getActivatedLabel = (value: boolean) => {
  return value ? "Sim" : "Não";
};
