"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", auth_controllers_1.loginUser);
exports.authRouter.post("/register", auth_controllers_1.registerUser);
exports.authRouter.get("/user", auth_middleware_1.validateAuthToken, auth_controllers_1.getUser);
exports.authRouter.put("/user", auth_middleware_1.validateAuthToken, auth_controllers_1.updateUser);
exports.authRouter.delete("/user", auth_middleware_1.validateAuthToken, auth_controllers_1.deleteUser);
exports.authRouter.post("/provider-login", auth_controllers_1.loginProvider);
