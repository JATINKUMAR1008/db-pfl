import LoadingPage from "@/components/commons/loading";
import React from "react";
interface ILoadContext {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const LoadContext = React.createContext<ILoadContext | null>(null);
export default function LoadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <LoadContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingPage />}
      <div className="relative">{children}</div>
    </LoadContext.Provider>
  );
}
