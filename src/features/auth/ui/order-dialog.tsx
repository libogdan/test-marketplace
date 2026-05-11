import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { orderSchema, type OrderDto } from "@/features/auth";
import { closeOrder } from "@/features/auth/model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

export const OrderDialog = () => {
  const { isOpenOrder } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const onOpenChange = () => {
    dispatch(closeOrder());
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderDto>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit: SubmitHandler<OrderDto> = async (data) => {
    console.log("Order submitted:", data);
    // TODO: API call to create order
    reset();
    dispatch(closeOrder());
  };

  return (
    <Dialog open={isOpenOrder} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Оформление заказа</DialogTitle>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="fullName">Полное имя</FieldLabel>
                <Input
                  {...field}
                  placeholder="Иван Иванов"
                  id="fullName"
                />
                {errors.fullName && (
                  <FieldError>{errors.fullName.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="ivan@example.com"
                  id="email"
                  type="email"
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="phone">Телефон</FieldLabel>
                <Input
                  {...field}
                  placeholder="+7 (999) 123-45-67"
                  id="phone"
                  type="tel"
                />
                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="address">Адрес</FieldLabel>
                <Input
                  {...field}
                  placeholder="ул. Примерная, дом 1"
                  id="address"
                />
                {errors.address && (
                  <FieldError>{errors.address.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Button>Оформить заказ</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
