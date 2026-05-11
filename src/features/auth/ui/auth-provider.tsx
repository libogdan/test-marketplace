import { type ReactNode,useEffect } from "react";

import { logout,setCredentials } from "@/features/auth";
import { useAppDispatch } from "@/shared/model/hooks";

import { useMeQuery } from "../api/auth-api";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(localStorage.getItem("token"));

  const { data, isSuccess, isError } = useMeQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({ token: localStorage.getItem("token")!, user: data }),
      );
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  return <>{children}</>;
};
