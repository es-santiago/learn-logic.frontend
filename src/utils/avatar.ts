export const avatar = (userName: string) => {
  if (userName) {
    const initials = userName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join("");

    return initials;
  }
  return "N/A";
};
