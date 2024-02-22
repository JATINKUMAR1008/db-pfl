interface ISignupBody {
  email: string;
  name: string;
  password: string;
}
interface ILoginBody {
  email: string;
  password: string;
}
interface IGoogleAuthBody {
  name: string;
  email: string;
}
export const registerUser = async (body: ISignupBody) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const createGoogleUser = async (body: IGoogleAuthBody) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/provider-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data;
};

export const loginUser = async (body: ILoginBody) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const getGoogleAuthData = async (token: string) => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  return res;
};

export const getUserData = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  }).then((res) => res.json());
  return res;
};
