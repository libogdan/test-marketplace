import * as z from "zod";

export const schema = z.object({
  email: z.email("Некорректная почта"),
  password: z.string("Введите пароль"),
});
export type Dto = z.infer<typeof schema>;

export const orderSchema = z.object({
  fullName: z
    .string("Введите полное имя")
    .min(2, "Имя должно содержать минимум 2 символа"),
  email: z.email("Некорректная почта"),
  phone: z
    .string("Введите номер телефона")
    .min(10, "Номер телефона должен содержать минимум 10 символов"),
  address: z
    .string("Введите адрес")
    .min(5, "Адрес должен содержать минимум 5 символов"),
});
export type OrderDto = z.infer<typeof orderSchema>;
