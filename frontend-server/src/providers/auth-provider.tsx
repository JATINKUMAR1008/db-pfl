"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
interface IUserData {
  id: number;
  name: string;
  email: string;
}
interface IProjectData {
  name: string;
  id: number;
  created_at: string;
  services: {
    name: string;
    id: number;
    nodes: number;
    plan: string;
    cloud: string;
    createdAt: string;
    type: string;
    status?: string;
  }[];
}
interface IAuthContext {
  user: {
    id: number;
    name: string;
    email: string;
  };
  projects: IProjectData[];

  logOut: () => void;
  refetch: () => void;
}
interface IProps {
  children: React.ReactNode;
}
const AuthContext = createContext<IAuthContext | null>(null);
export const useAuth = () => {
  const state = useContext(AuthContext);
  if (!state) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return state;
};
export function AuthProvider({ children }: IProps) {
  const router = useRouter();
  const [user, setUser] = useState<IUserData | null>(null);
  const [projects, setProjects] = useState<IProjectData[]>([]);
  const logout = async () => {
    await fetch("/api/auth/logout");
    router.push("/auth/login");
  };

  const [userData, projectQueryData] = useQueries([
    {
      queryKey: "user",
      queryFn: async () => {
        const data = await fetch("/api/auth/user").then((res) => res.json());
        return data;
      },
    },
    {
      queryKey: "projects",
      queryFn: async () => {
        const data = await fetch("/api/project").then((res) => res.json());
        return data;
      },
    },
  ]);
  const refetch = () => {
    userData.refetch();
    projectQueryData.refetch();
  };

  useEffect(() => {
    if (userData) {
      setUser(userData.data?.data);
      console.log(userData);
    }
    if (projectQueryData) {
      setProjects(projectQueryData.data?.data);
    }
  }, [userData, projectQueryData]);

  return (
    user && (
      <AuthContext.Provider
        value={{
          user: user,
          logOut: logout,
          projects: projects,
          refetch: refetch,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  );
}
