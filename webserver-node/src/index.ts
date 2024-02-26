import http from "http";
import dotenv from "dotenv";
import express from "express";
import { authRouter } from "./routes/auth.routes";
import { projectRouter } from "./routes/project.routes";
// import { kubeRouter } from "./routes/kube.routes";
const app = express();
app.use(express.json());
async function init() {
  dotenv.config();
  app.use("/auth", authRouter);
  app.use("/project", projectRouter);
  // app.use("/kube", kubeRouter);
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
init();
