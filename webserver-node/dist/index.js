"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./routes/auth.routes");
const project_routes_1 = require("./routes/project.routes");
// import { kubeRouter } from "./routes/kube.routes";
const app = (0, express_1.default)();
app.use(express_1.default.json());
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        app.use("/auth", auth_routes_1.authRouter);
        app.use("/project", project_routes_1.projectRouter);
        // app.use("/kube", kubeRouter);
        const httpServer = http_1.default.createServer(app);
        const PORT = process.env.PORT || 4000;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
init();
