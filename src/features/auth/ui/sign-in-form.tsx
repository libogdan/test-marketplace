import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler,useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/features/auth";
import { useAppDispatch } from "@/shared/model/hooks";

import { useSignInMutation } from "../api/auth-api";
import { type Dto,schema } from "../model/schema";

export const SignInForm = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<Dto>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Dto> = async (data) => {
    const { token, user } = await signIn(data).unwrap();

    localStorage.setItem("token", token);

    dispatch(setCredentials({ token, user }));

    navigate("/");
  };

  return (
    <form
      className="rounded-2xl p-12 shadow-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4 text-center text-2xl font-semibold">Войти</h1>

      <div className="flex flex-col justify-center gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input placeholder="Пароль" {...field} type="password" />
          )}
        />

        <p className="text-sm">
          Нет аккаунта?{" "}
          <Link to="/auth/signup" className="text-blue-800">
            Зарегистрироваться
          </Link>
        </p>

        <Button disabled={isLoading}>Войти</Button>
      </div>
    </form>
  );
};
