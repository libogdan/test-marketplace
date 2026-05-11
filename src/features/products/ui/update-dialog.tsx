import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
  useUpdateProductMutation,
} from "@/features/products";
import { closeUpdate } from "@/features/products/model/products-slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

export const UpdateDialog = () => {
  const { isOpenUpdate } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onOpenChange = () => {
    dispatch(closeUpdate());
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Dto>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Dto> = async (data) => {
    if (isOpenUpdate && isOpenUpdate.id) {
      await updateProduct({ id: isOpenUpdate.id, data });
      dispatch(closeUpdate());
    }
  };

  useEffect(() => {
    if (isOpenUpdate) {
      const { name, description, price, image, category } = isOpenUpdate;

      reset({
        name,
        description,
        price: String(price),
        image,
        category,
      });
    }
  }, [isOpenUpdate]);

  return (
    <Dialog open={!!isOpenUpdate} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Изменить продукт</DialogTitle>

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

          <Button disabled={isLoading}>Обновить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
