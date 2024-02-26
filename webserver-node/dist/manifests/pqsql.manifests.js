"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPqSqlManifest = void 0;
const createPqSqlManifest = (name, userId, password) => {
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
                        name: "postgresql",
                        image: "postgres:latest",
                        env: [
                            {
                                name: "POSTGRES_USER",
                                value: "admin",
                            },
                            {
                                name: "POSTGRES_PASSWORD",
                                value: password,
                            },
                            {
                                name: "POSTGRES_DB",
                                value: "defaultdb",
                            },
                        ],
                        ports: [
                            {
                                containerPort: 5432,
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
                        port: 5432,
                        targetPort: 5432,
                    },
                ],
                type: "LoadBalancer",
            },
        },
    };
};
exports.createPqSqlManifest = createPqSqlManifest;
