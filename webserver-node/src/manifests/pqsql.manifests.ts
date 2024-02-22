export const createPqSqlManifest = (
  name: string,
  userId: string,
  password: string
) => {
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
        type: "NodePort",
      },
    },
  };
};
