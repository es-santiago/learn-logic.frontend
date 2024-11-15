import jwt, { JwtPayload } from "jsonwebtoken";

export const extractUserInfoFromToken = (
  token: string | null
): {
  userId: string;
  userName: string;
  isFirstAccess: boolean;
  email: string;
  punctuation: string;
  role: string;
  experience: string;
} | null => {
  if (!token) {
    return null; // Retorna null se o token não estiver presente
  }

  try {
    // Decodifique o token sem verificar a assinatura
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      throw new Error("Token inválido");
    }

    // Extraia as informações desejadas
    const userInfo = {
      userId: decoded.user_id as string,
      userName: decoded.user_name as string,
      isFirstAccess: decoded.is_first_access === "true", // Converte para booleano
      email: decoded.email as string,
      punctuation: decoded.punctuation as string,
      experience: decoded.experience as string,
      role: decoded.role as string,
      exp: decoded.exp as number,
      iss: decoded.iss as string,
      aud: decoded.aud as string,
    };

    return userInfo;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null; // Retorna null em caso de erro
  }
};

export const getUserName = (token: string | null): string | undefined => {
  const user = extractUserInfoFromToken(token);
  return user?.userName; // Retorna o userName ou undefined se o user for null
};

export const getUserType = (): string | undefined => {
  const user = extractUserInfoFromToken(localStorage.getItem("authToken"));
  return user?.role; // Retorna o userName ou undefined se o user for null
};

export const getUserExperience = (): string | undefined => {
  const user = extractUserInfoFromToken(localStorage.getItem("authToken"));
  return user?.experience; // Retorna o userName ou undefined se o user for null
};
