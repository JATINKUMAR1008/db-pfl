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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginProvider = exports.deleteUser = exports.updateUser = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const kube_controller_1 = require("./kube.controller");
const prisma = new client_1.PrismaClient();
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, Number(process.env.ROUNDS) || 10);
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
    console.log(req.body);
    try {
        const hash = yield hashPassword(password);
        const user = yield prisma.user.create({
            data: Object.assign(Object.assign({}, rest), { password: hash, refreshToken: "" }),
        });
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET || "", {
            expiresIn: "1w",
        });
        const updateUser = yield prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: token },
        });
        (0, kube_controller_1.createNamespace)(user.id.toString());
        res.json({ status: true, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error: "Error creating user" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ status: false, error: "User not found" });
    }
    console.log(user);
    const valid = yield bcrypt_1.default.compare(password, user.password || "");
    if (!valid) {
        return res.status(401).json({ status: false, error: "Invalid password" });
    }
    const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET || "", {
        expiresIn: "1w",
    });
    const updateUser = yield prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: token },
    });
    res.json({ status: true, token });
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: Number(req.body.userId) },
        });
        const _b = user || {
            password: "",
            refreshToken: "",
        }, { password, refreshToken } = _b, rest = __rest(_b, ["password", "refreshToken"]);
        res.json({ status: true, data: rest });
    }
    catch (error) {
        res.status(500).json({ status: false, error: "Error getting user" });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.update({
        where: { id: Number(req.body.userId) },
        data: Object.assign({}, req.body),
    });
    if (!user)
        return res.status(404).json({ status: false, error: "User not found" });
    res.json({
        status: true,
        message: "User updated successfully",
        data: user,
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.delete({
        where: { id: Number(req.body.userId) },
    });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    res.json({
        status: true,
        message: "User deleted successfully",
    });
});
exports.deleteUser = deleteUser;
const loginProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (user) {
            const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET || "", {
                expiresIn: "1w",
            });
            const updateUser = yield prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: token },
            });
            return res.json({ status: true, token });
        }
        else {
            const new_user = yield prisma.user.create({
                data: {
                    email,
                    name,
                    refreshToken: "",
                },
            });
            const token = yield jsonwebtoken_1.default.sign({ id: new_user.id }, process.env.SECRET || "", {
                expiresIn: "1w",
            });
            const updateUser = yield prisma.user.update({
                where: { id: new_user.id },
                data: { refreshToken: token },
            });
            res.json({ status: true, token });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error: "Error creating user" });
    }
});
exports.loginProvider = loginProvider;
