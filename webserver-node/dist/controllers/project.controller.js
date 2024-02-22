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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getService = exports.deleteService = exports.createService = exports.deleteProject = exports.getProjects = exports.createProject = void 0;
const client_1 = require("@prisma/client");
const kube_controller_1 = require("./kube.controller");
const prisma = new client_1.PrismaClient();
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { userId } = _a, rest = __rest(_a, ["userId"]);
    try {
        const new_project = yield prisma.project.create({
            data: Object.assign(Object.assign({}, rest), { userId: userId }),
        });
        res.status(200).json({ status: true, data: new_project });
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error creating project" });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany({
            where: {
                userId: Number(req.body.userId),
            },
            include: {
                services: true,
            },
        });
        res.status(200).json({ status: true, data: projects });
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error getting projects" });
    }
});
exports.getProjects = getProjects;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.project.delete({
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
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error deleting project" });
    }
});
exports.deleteProject = deleteProject;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.body, { userId } = _b, rest = __rest(_b, ["userId"]);
        const new_service = yield prisma.service.create({
            data: Object.assign({}, rest),
        });
        (0, kube_controller_1.createPodfn)(rest.name, userId, generateRandomString(10), rest.type);
        res.status(200).json({ status: true, data: new_service });
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error creating service" });
    }
});
exports.createService = createService;
const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomString = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
    return randomString;
};
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.service.delete({
            where: {
                id: Number(req.body.id),
            },
        });
        (0, kube_controller_1.deletePodfn)(req.body.name, req.body.userId);
        res
            .status(200)
            .json({ status: true, message: "Service deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error deleting service" });
    }
});
exports.deleteService = deleteService;
const getService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g;
    try {
        const { userId, name } = req.body;
        const serviceInfo = yield (0, kube_controller_1.getPodInfo)(userId, name);
        console.log(serviceInfo);
        //@ts.ignore
        if (serviceInfo instanceof Error) {
            throw new Error("got error");
        }
        else {
            const sendableInfo = {
                service_uri: `mysql://${((_c = serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod) === null || _c === void 0 ? void 0 : _c.podEnv) && (serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod.podEnv[2].MYSQL_PASSWORD)}@${serviceInfo.service.serviceIP}:${serviceInfo.service.servicePort}/${((_d = serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod) === null || _d === void 0 ? void 0 : _d.podEnv) && serviceInfo.pod.podEnv[3].MYSQL_DATABASE}`,
                service_port: serviceInfo.service.servicePort,
                service_host: serviceInfo.service.serviceIP,
                service_username: ((_e = serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod) === null || _e === void 0 ? void 0 : _e.podEnv) && serviceInfo.pod.podEnv[1].MYSQL_USER,
                service_password: ((_f = serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod) === null || _f === void 0 ? void 0 : _f.podEnv) && serviceInfo.pod.podEnv[2].MYSQL_PASSWORD,
                service_database_name: ((_g = serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.pod) === null || _g === void 0 ? void 0 : _g.podEnv) && serviceInfo.pod.podEnv[3].MYSQL_DATABASE,
            };
            res.status(200).json({
                status: serviceInfo.pod.status,
                data: sendableInfo
            });
        }
    }
    catch (err) {
        res.status(500).json({ status: false, error: "Error getting service" });
    }
});
exports.getService = getService;
