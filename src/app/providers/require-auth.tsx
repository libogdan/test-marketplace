import { type ReactNode } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "@/shared/model/hooks";

interface Props {
  children: ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const token = useAppSelector((state) => state.authSlice.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
