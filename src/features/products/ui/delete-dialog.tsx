import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/features/products";
import { closeDelete } from "@/features/products/model/products-slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

export const DeleteDialog = () => {
  const { isOpenDelete } = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const onOpenChange = () => {
    dispatch(closeDelete());
  };

  const onConfirm = async () => {
    if (isOpenDelete && isOpenDelete.id) {
      await deleteProduct(isOpenDelete.id);
      dispatch(closeDelete());
    }
  };

  return (
    <Dialog open={!!isOpenDelete} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Удалить продукт?</DialogTitle>
        <p>Вы уверены, что хотите удалить "{isOpenDelete?.name}"?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => dispatch(closeDelete())}>
            Отмена
          </Button>
          <Button
            disabled={isLoading}
            onClick={onConfirm}
            variant="destructive"
          >
            Удалить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
