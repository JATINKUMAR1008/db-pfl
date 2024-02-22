import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface DecodeToken {
  id: number;
  iat: number;
  exp: number;
}
export const validateAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET || "") as DecodeToken;
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
