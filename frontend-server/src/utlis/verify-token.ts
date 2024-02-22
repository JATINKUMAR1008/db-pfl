import { decodeToken, isExpired, useJwt } from "react-jwt";

export const verifyToken = async (token: string) => {
  const token_data = await decodeToken(token);
  return token_data;
};
