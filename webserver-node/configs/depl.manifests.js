"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deplaoymentManifests = void 0;
exports.deplaoymentManifests = {
    mysql: {
        apiVersion: "apps/v1",
        kind: "Deployment",
        metadata: {
            name: "mysql-deployment",
            labels: {
                app: "mysql",
            },
        },
        spec: {
            replicas: 1, // Adjust as needed
            selector: {
                matchLabels: {
                    app: "mysql",
                },
            },
            template: {
                metadata: {
                    labels: {
                        app: "mysql",
                    },
                },
                spec: {
                    containers: [
                        {
                            name: "mysql",
                            image: "mysql:latest", // Use the desired MySQL image
                            env: [
                                {
                                    name: "MYSQL_ROOT_PASSWORD",
                                    value: "your-root-password", // Set your desired MySQL root password
                                },
                            ],
                            ports: [
                                {
                                    containerPort: 3306, // MySQL default port
                                },
                            ],
                            volumeMounts: [
                                {
                                    name: "mysql-persistent-storage",
                                    mountPath: "/var/lib/mysql",
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
};
