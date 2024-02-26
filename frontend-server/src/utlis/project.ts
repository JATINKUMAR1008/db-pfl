export const createProject = async (body: { name: string }, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};
export const getProjects = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/project/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await res.json();
  return data;
};
export const getService = async (
  token: string,
  name: string,
  serviceType: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/project/service/${name}?serviceType=${serviceType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const generateRandomString = (length: number) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const randomString = Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return randomString;
};
export const createService = async (body: any, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/project/create-service`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data;
};
