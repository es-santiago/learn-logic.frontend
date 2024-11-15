export const getMenu = (isAdmin: boolean) => {
  return isAdmin
    ? [
        {
          name: "Home",
          path: "/home",
          icon: "home",
        },
        {
          name: "Gerenciar Questões",
          path: "/questions",
          icon: "book-plus",
        },
        {
          name: "Gerenciar Usuários",
          path: "/users",
          icon: "user",
        },
        {
          name: "Visualizar Questões",
          path: "/answer",
          icon: "book-open-check",
        },
      ]
    : [
        {
          name: "Home",
          path: "/home",
          icon: "home",
        },
        {
          name: "Responder Questões",
          path: "/answer",
          icon: "book-open-check",
        },
      ];
};
