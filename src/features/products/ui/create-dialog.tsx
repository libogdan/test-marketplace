import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type Dto,
  schema,
  useCreateProductMutation,
} from "@/features/products";
import { closeCreate } from "@/features/products/model/products-slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

export const CreateDialog = () => {
  const { isOpenCreate } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onOpenChange = () => {
    dispatch(closeCreate());
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Dto>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Dto> = async (data) => {
    await createProduct(data);
    reset();
    dispatch(closeCreate());
  };

  return (
    <Dialog open={isOpenCreate} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Создать продукт</DialogTitle>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="name">Название продукта</FieldLabel>
                <Input {...field} placeholder="Название продукта" id="name" />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="description">Описание продукта</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Описание продукта"
                  id="description"
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="price">Цена продукта</FieldLabel>
                <Input
                  {...field}
                  placeholder="Цена продукта"
                  id="price"
                  type="number"
                />
                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="image">Ссылка на изображение</FieldLabel>
                <Input {...field} placeholder="Изображение" id="image" />
                {errors.image && (
                  <FieldError>{errors.image.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="category">Категория</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Audio & Video"}>
                      Аудио и Видео
                    </SelectItem>
                    <SelectItem value={"Computer Accessories"}>
                      Компьютерные аксессуары
                    </SelectItem>
                    <SelectItem value={"Smart Home & Office"}>
                      Умный дом и офис
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <FieldError>{errors.category.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Button disabled={isLoading}>Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
