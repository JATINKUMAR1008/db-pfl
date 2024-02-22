import * as K8s from "@kubernetes/client-node";
import { execSync } from "child_process";
import { Response, Request } from "express";
import { createMySqlManifest } from "../manifests/mysql.manifests";
import { createRedisManifests } from "../manifests/redis.manifests";
import { createPqSqlManifest } from "../manifests/pqsql.manifests";
const SERVICE_MATCHER = {
  mysql: createMySqlManifest,
  redis: createRedisManifests,
  pqsql: createPqSqlManifest,
};

const kubeClient = new K8s.KubeConfig();
try {
  kubeClient.loadFromFile(`${process.env.HOME}/.kube/konfig`);
} catch (err) {
  console.error(err);
}
const kubeApi = kubeClient.makeApiClient(K8s.CoreV1Api);

function getPodsInfo(pods: any[]) {
  return pods.map((pod) => {
    const podName = pod.metadata?.name;
    const podStatus = pod.status?.phase; // Add null check for pod.status
    const podImage = pod.spec?.containerspod[0].image;
    const podCreationDate = pod.metadata?.creationTimestamp;
    const podHostIP = pod.status?.hostIP;
    const podHostPort =
      pod.spec?.containers[0].ports &&
      pod.spec?.containers[0]?.ports[0]?.containerPort; // Add null check for pod.spec, pod.spec.containers[0], and pod.spec.containers[0].ports[0]
    const podEnvs = pod.spec?.containers[0].env;
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

export const getPodsfn = async (userId: string) => {
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
  } catch (err) {
    console.error(err);
    return new Error("Error getting pods");
  }
};

export const createNamespace = (userId: string) => {
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
export const getPodInfo = async (userId: string, name: string) => {
  try {
    const pod = await kubeApi
      .readNamespacedPod(`${name?.toLowerCase()}`, `nm-${userId}`)
      .then((res) => {
        const pod = res.body;
        const podInfo = {
          status: pod.status?.phase,
          image: pod.spec?.containers[0].image,
          podName: pod.metadata?.name,
          podEnv: pod.spec?.containers[0].env?.map((env) => {
            return { [env.name]: env.value };
          }),
        };
        return podInfo;
      });
    const service = await kubeApi
      .readNamespacedService(
        `service-${name?.toLowerCase()}-${userId}`,
        `nm-${userId}`
      )
      .then((res) => {
        const service = res.body;
        const serviceInfo = {
          serviceIP: service.spec?.clusterIP,
          servicePort: service.spec?.ports && service.spec?.ports[0]?.port,
        };
        return serviceInfo;
      });

    return { pod, service };
  } catch (err) {
    console.error(err);
    return new Error("Error getting pod");
  }
};

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

export const createPodfn = async (
  name: string,
  userId: string,
  password: string,
  type: string
) => {
  const podManifests = SERVICE_MATCHER[type as keyof typeof SERVICE_MATCHER](
    name,
    userId,
    password
  );
  try {
    await kubeApi.createNamespacedPod(`nm-${userId}`, podManifests.podManifest);
    await kubeApi.createNamespacedService(
      `nm-${userId}`,
      podManifests.serviceManifest
    );
    return { status: true, message: "Pod created successfully" };
  } catch (err) {
    console.error(err);
    return new Error("Error creating pod");
  }
};

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
export const deletePodfn = async (name: string, userId: string) => {
  try {
    await kubeApi.deleteNamespacedPod(`${name.toLowerCase()}`, `nm-${userId}`);
    await kubeApi.deleteNamespacedService(
      `mysql-service-${name.toLowerCase()}`,
      `nm-${userId}`
    );
    return { status: true, message: "Pod deleted successfully" };
  } catch (err) {
    console.error(err);
    return new Error("Error deleting pod");
  }
};
