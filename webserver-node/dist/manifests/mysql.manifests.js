"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMySqlManifest = void 0;
const createMySqlManifest = (name, userId, password) => {
    return {
        podManifest: {
            apiVersion: "v1",
            kind: "Pod",
            metadata: {
                name: `${name.toLowerCase()}`, // Set your desired namespace
                labels: {
                    app: name,
                },
            },
            spec: {
                containers: [
                    {
                        name: "mysql",
                        image: "mysql:latest",
                        env: [
                            {
                                name: "MYSQL_ROOT_PASSWORD",
                                value: "supersecret",
                            },
                            {
                                name: "MYSQL_USER",
                                value: "admin",
                            },
                            {
                                name: "MYSQL_PASSWORD",
                                value: password,
                            },
                            {
                                name: "MYSQL_DATABASE",
                                value: "defaultdb",
                            },
                        ],
                        ports: [
                            {
                                containerPort: 3306,
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
                name: `service-${name.toLowerCase()}-${userId}`, // Set your desired namespace
            },
            spec: {
                selector: {
                    app: name,
                },
                ports: [
                    {
                        protocol: "TCP",
                        port: 8080, // Port to expose MySQL service
                        targetPort: 3306, // Target port of the MySQL container
                    },
                ],
                type: "LoadBalancer", // Adjust as needed (e.g., NodePort, LoadBalancer)
            },
        },
    };
};
exports.createMySqlManifest = createMySqlManifest;
