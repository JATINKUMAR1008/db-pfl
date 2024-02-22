"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePodfn = exports.createPodfn = exports.getPodInfo = exports.createNamespace = exports.getPodsfn = void 0;
const K8s = __importStar(require("@kubernetes/client-node"));
const mysql_manifests_1 = require("../manifests/mysql.manifests");
const redis_manifests_1 = require("../manifests/redis.manifests");
const pqsql_manifests_1 = require("../manifests/pqsql.manifests");
const SERVICE_MATCHER = {
    mysql: mysql_manifests_1.createMySqlManifest,
    redis: redis_manifests_1.createRedisManifests,
    pqsql: pqsql_manifests_1.createPqSqlManifest,
};
const kubeClient = new K8s.KubeConfig();
try {
    kubeClient.loadFromFile(`${process.env.HOME}/.kube/konfig`);
}
catch (err) {
    console.error(err);
}
const kubeApi = kubeClient.makeApiClient(K8s.CoreV1Api);
function getPodsInfo(pods) {
    return pods.map((pod) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const podName = (_a = pod.metadata) === null || _a === void 0 ? void 0 : _a.name;
        const podStatus = (_b = pod.status) === null || _b === void 0 ? void 0 : _b.phase; // Add null check for pod.status
        const podImage = (_c = pod.spec) === null || _c === void 0 ? void 0 : _c.containerspod[0].image;
        const podCreationDate = (_d = pod.metadata) === null || _d === void 0 ? void 0 : _d.creationTimestamp;
        const podHostIP = (_e = pod.status) === null || _e === void 0 ? void 0 : _e.hostIP;
        const podHostPort = ((_f = pod.spec) === null || _f === void 0 ? void 0 : _f.containers[0].ports) &&
            ((_j = (_h = (_g = pod.spec) === null || _g === void 0 ? void 0 : _g.containers[0]) === null || _h === void 0 ? void 0 : _h.ports[0]) === null || _j === void 0 ? void 0 : _j.containerPort); // Add null check for pod.spec, pod.spec.containers[0], and pod.spec.containers[0].ports[0]
        const podEnvs = (_k = pod.spec) === null || _k === void 0 ? void 0 : _k.containers[0].env;
        return {
            podName,
            podStatus,
            podImage,
            podCreationDate,
            podHostIP,
            podHostPort,
            podEnvs,
        };
    });
}
const getPodsfn = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        kubeApi
            .listNamespacedPod(`nm-${userId}`)
            .then((response) => {
            const pods = response.body.items;
            const podsInfo = getPodsInfo(pods);
            return { status: true, data: podsInfo };
        })
            .catch((err) => {
            console.error(err);
            return new Error("Error getting pods");
        });
    }
    catch (err) {
        console.error(err);
        return new Error("Error getting pods");
    }
});
exports.getPodsfn = getPodsfn;
const createNamespace = (userId) => {
    const namespaceManifest = {
        metadata: {
            name: `nm-${userId}`,
        },
    };
    kubeApi
        .createNamespace(namespaceManifest)
        .then((res) => {
        return { status: true, message: "Namespace created successfully" };
    })
        .catch((err) => {
        return new Error("Error creating namespace");
    });
};
exports.createNamespace = createNamespace;
const getPodInfo = (userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pod = yield kubeApi
            .readNamespacedPod(`${name === null || name === void 0 ? void 0 : name.toLowerCase()}`, `nm-${userId}`)
            .then((res) => {
            var _a, _b, _c, _d, _e;
            const pod = res.body;
            const podInfo = {
                status: (_a = pod.status) === null || _a === void 0 ? void 0 : _a.phase,
                image: (_b = pod.spec) === null || _b === void 0 ? void 0 : _b.containers[0].image,
                podName: (_c = pod.metadata) === null || _c === void 0 ? void 0 : _c.name,
                podEnv: (_e = (_d = pod.spec) === null || _d === void 0 ? void 0 : _d.containers[0].env) === null || _e === void 0 ? void 0 : _e.map((env) => {
                    return { [env.name]: env.value };
                }),
            };
            return podInfo;
        });
        const service = yield kubeApi
            .readNamespacedService(`service-${name === null || name === void 0 ? void 0 : name.toLowerCase()}-${userId}`, `nm-${userId}`)
            .then((res) => {
            var _a, _b, _c, _d;
            const service = res.body;
            const serviceInfo = {
                serviceIP: (_a = service.spec) === null || _a === void 0 ? void 0 : _a.clusterIP,
                servicePort: ((_b = service.spec) === null || _b === void 0 ? void 0 : _b.ports) && ((_d = (_c = service.spec) === null || _c === void 0 ? void 0 : _c.ports[0]) === null || _d === void 0 ? void 0 : _d.port),
            };
            return serviceInfo;
        });
        return { pod, service };
    }
    catch (err) {
        console.error(err);
        return new Error("Error getting pod");
    }
});
exports.getPodInfo = getPodInfo;
// export const createPod = async (req: Request, res: Response) => {
//   const { name, userId, password, type } = req.body;
//   const podManifests = SERVICE_MATCHER[type as keyof typeof SERVICE_MATCHER](
//     name,
//     userId,
//     password
//   );
//   try {
//     await kubeApi.createNamespacedPod(`nm-${userId}`, podManifests.podManifest);
//     await kubeApi.createNamespacedService(
//       `nm-${userId}`,
//       podManifests.serviceManifest
//     );
//     res.status(200).json({ status: true, message: "Pod created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, error: "Error creating pod" });
//   }
// };
const createPodfn = (name, userId, password, type) => __awaiter(void 0, void 0, void 0, function* () {
    const podManifests = SERVICE_MATCHER[type](name, userId, password);
    try {
        yield kubeApi.createNamespacedPod(`nm-${userId}`, podManifests.podManifest);
        yield kubeApi.createNamespacedService(`nm-${userId}`, podManifests.serviceManifest);
        return { status: true, message: "Pod created successfully" };
    }
    catch (err) {
        console.error(err);
        return new Error("Error creating pod");
    }
});
exports.createPodfn = createPodfn;
// export const deletePod = async (req: Request, res: Response) => {
//   const { name, userId } = req.body;
//   try {
//     await kubeApi.deleteNamespacedPod(`${name.toLowerCase()}`, `nm-${userId}`);
//     await kubeApi.deleteNamespacedService(
//       `mysql-service-${name.toLowerCase()}`,
//       `nm-${userId}`
//     );
//     res.status(200).json({ status: true, message: "Pod deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, error: "Error deleting pod" });
//   }
// };
const deletePodfn = (name, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield kubeApi.deleteNamespacedPod(`${name.toLowerCase()}`, `nm-${userId}`);
        yield kubeApi.deleteNamespacedService(`mysql-service-${name.toLowerCase()}`, `nm-${userId}`);
        return { status: true, message: "Pod deleted successfully" };
    }
    catch (err) {
        console.error(err);
        return new Error("Error deleting pod");
    }
});
exports.deletePodfn = deletePodfn;
