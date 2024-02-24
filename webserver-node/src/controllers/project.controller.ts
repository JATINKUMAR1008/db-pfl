import { PrismaClient } from "@prisma/client";
import { create } from "domain";
import { Response, Request } from "express";
import { createPodfn, deletePodfn, getPodInfo } from "./kube.controller";
import { error } from "console";

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  const { userId, ...rest } = req.body;
  try {
    const new_project = await prisma.project.create({
      data: {
        ...rest,
        userId: userId,
      },
    });
    res.status(200).json({ status: true, data: new_project });
  } catch (err) {
    res.status(500).json({ status: false, error: "Error creating project" });
  }
};
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: Number(req.body.userId),
      },
      include: {
        services: true,
      },
    });
    res.status(200).json({ status: true, data: projects });
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: false, error: "Error getting projects" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({
      where: {
        id: Number(req.body.id),
      },
      include: {
        services: true,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, error: "Error deleting project" });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { userId, ...rest } = req.body;
    const new_service = await prisma.service.create({
      data: {
        ...rest,
      },
    });
    createPodfn(rest.name, userId, generateRandomString(10), rest.type);
    res.status(200).json({ status: true, data: new_service });
  } catch (err) {
    res.status(500).json({ status: false, error: "Error creating service" });
  }
};

const generateRandomString = (length: number) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const randomString = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return randomString;
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    await prisma.service.delete({
      where: {
        id: Number(req.body.id),
      },
    });
    deletePodfn(req.body.name, req.body.userId);
    res
      .status(200)
      .json({ status: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, error: "Error deleting service" });
  }
};

export const getService = async (req: Request, res: Response) => {
  try {
    const { userId} = req.body;
    const name = req.params.name || ""
    const { Servicetype } = req.query as { Servicetype: string }; // Ensure Servicetype is of type string
    const serviceInfo = await getPodInfo(userId, name);
    console.log(serviceInfo);
    //@ts.ignore
    if(serviceInfo instanceof Error){
      throw new Error("got error")
    }
    else{
      const sendableInfo = {
        service_uri: `mysql://${ serviceInfo?.pod?.podEnv && serviceInfo?.pod.podEnv[2].MYSQL_PASSWORD}@${serviceInfo.service.serviceIP}:${serviceInfo.service.servicePort}/${serviceInfo?.pod?.podEnv && serviceInfo.pod.podEnv[3].MYSQL_DATABASE}`,
        service_port: serviceInfo.service.servicePort,
        service_host: serviceInfo.service.serviceIP,
        service_username: serviceInfo?.pod?.podEnv && serviceInfo.pod.podEnv[1].MYSQL_USER,
        service_password: serviceInfo?.pod?.podEnv && serviceInfo.pod.podEnv[2].MYSQL_PASSWORD,
        service_database_name:serviceInfo?.pod?.podEnv && serviceInfo.pod.podEnv[3].MYSQL_DATABASE,
      };
      res.status(200).json({
        status: serviceInfo.pod.status,
        data: sendableInfo
      });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: "Error getting service" });
  }
};
