import { Router } from "express";
import { validateAuthToken } from "../middlewares/auth.middleware";
import {
  createProject,
  createService,
  deleteProject,
  deleteService,
  getProjects,
  getService,
} from "../controllers/project.controller";
export const projectRouter = Router();

projectRouter.post("/create", validateAuthToken, createProject);
projectRouter.get("/get", validateAuthToken, getProjects);
projectRouter.post("/create-service", validateAuthToken, createService);
projectRouter.delete("/delete-service", validateAuthToken, deleteService);
projectRouter.delete("/", validateAuthToken, deleteProject);
projectRouter.get("/service", validateAuthToken, getService);
