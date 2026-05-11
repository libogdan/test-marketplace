import * as z from "zod";

export const schema = z.object({
  name: z.string("Введите название"),
  description: z.string(),
  price: z.string("Введите цену"),
  image: z.string("Введите URL изображения"),
  category: z.string("Выберите категорию"),
});

export type Dto = z.infer<typeof schema>;
