import * as z from "zod";

export const schema = z.object({
  email: z.email("Некорректная почта"),
  password: z.string("Введите пароль"),
});
export type Dto = z.infer<typeof schema>;
