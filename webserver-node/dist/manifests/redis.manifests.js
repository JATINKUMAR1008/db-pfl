"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisManifests = void 0;
const createRedisManifests = (name, userId, password) => {
    return {
        podManifest: {
            apiVersion: "v1",
            kind: "Pod",
            metadata: {
                name: `${name.toLowerCase()}`,
                labels: {
                    app: name,
                },
            },
            spec: {
                containers: [
                    {
                        name: "redis",
                        image: "redis:latest",
                        command: ["redis-server"],
                        args: ["--requirepass", password],
                        ports: [
                            {
                                containerPort: 6379,
                            },
                        ],
                    },
                ],
            },
        },
        serviceManifest: {
            apiVersion: "v1",
            kind: "Service",
            metadata: {
                name: `service-${name.toLowerCase()}-${userId}`,
            },
            spec: {
                selector: {
                    app: name,
                },
                ports: [
                    {
                        protocol: "TCP",
                        port: 6379,
                        targetPort: 6379,
                    },
                ],
                type: "NodePort",
            },
        },
    };
};
exports.createRedisManifests = createRedisManifests;
