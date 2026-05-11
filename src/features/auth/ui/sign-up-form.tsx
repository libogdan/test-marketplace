import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignUpMutation } from "../api/auth-api";
import { type Dto, schema } from "../model/schema";

export const SignUpForm = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<Dto>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Dto> = async (data) => {
    await signUp(data).unwrap();
    navigate("/auth/signin");
  };

  return (
    <form
      className="rounded-2xl p-12 shadow-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-4 text-center text-2xl font-semibold">
        Зарегистрироваться
      </h1>

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
          Уже есть аккаунт?{" "}
          <Link to="/auth/signin" className="text-blue-800">
            Войти
          </Link>
        </p>

        <Button disabled={isLoading}>Зарегистрироваться</Button>
      </div>
    </form>
  );
};
