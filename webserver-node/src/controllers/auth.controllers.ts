import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { createNamespace } from "./kube.controller";

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(process.env.ROUNDS) || 10);
};
export const registerUser = async (req: Request, res: Response) => {
  const { password, ...rest } = req.body;
  console.log(req.body);
  try {
    const hash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hash,
        refreshToken: "",
      },
    });
    const token = await jwt.sign({ id: user.id }, process.env.SECRET || "", {
      expiresIn: "1w",
    });
    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: token },
    });
    createNamespace(user.id.toString());
    res.json({ status: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Error creating user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }
  console.log(user);
  const valid = await bcrypt.compare(password, user.password || "");
  if (!valid) {
    return res.status(401).json({ status: false, error: "Invalid password" });
  }
  const token = await jwt.sign({ id: user.id }, process.env.SECRET || "", {
    expiresIn: "1w",
  });
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: token },
  });
  res.json({ status: true, token });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.body.userId) },
    });
    const { password, refreshToken, ...rest } = user || {
      password: "",
      refreshToken: "",
    };
    res.json({ status: true, data: rest });
  } catch (error) {
    res.status(500).json({ status: false, error: "Error getting user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: { id: Number(req.body.userId) },
    data: { ...req.body },
  });
  if (!user)
    return res.status(404).json({ status: false, error: "User not found" });
  res.json({
    status: true,
    message: "User updated successfully",
    data: user,
  });
};
export const deleteUser = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.body.userId) },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({
    status: true,
    message: "User deleted successfully",
  });
};
export const loginProvider = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = await jwt.sign({ id: user.id }, process.env.SECRET || "", {
        expiresIn: "1w",
      });
      const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: token },
      });
      return res.json({ status: true, token });
    } else {
      const new_user = await prisma.user.create({
        data: {
          email,
          name,
          refreshToken: "",
        },
      });
      const token = await jwt.sign(
        { id: new_user.id },
        process.env.SECRET || "",
        {
          expiresIn: "1w",
        }
      );
      const updateUser = await prisma.user.update({
        where: { id: new_user.id },
        data: { refreshToken: token },
      });
      res.json({ status: true, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: "Error creating user" });
  }
};
