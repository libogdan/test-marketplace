import { CloudAlert, Grid2X2X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import {
  type Product,
  ProductCard,
  ProductCardSkeleton,
} from "@/entities/products";
import type { PaginationMetadata } from "@/shared/model/types.ts";

type Props =
  | {
      data: Product[] | undefined;
      isAdmin: boolean;
      isLoading: boolean;
      isError: boolean;
      hasPagination: false;
    }
  | {
      data: Product[] | undefined;
      isAdmin: boolean;
      isLoading: boolean;
      isError: boolean;
      hasPagination: true;
      page: number;
      setPage: Dispatch<SetStateAction<number>>;
      meta: PaginationMetadata | undefined;
    };

export const ProductsList = (props: Props) => {
  const { data, isAdmin, isLoading, isError, hasPagination } = props;

  if (data?.length === 0) {
    return (
      <div className="grid h-[calc(100dvh-256px)] place-items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Grid2X2X className="h-16 w-16" />
          Товаров нет
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {isLoading &&
          new Array(5).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}

        {!isLoading &&
          data?.map((product) => (
            <ProductCard product={product} key={product.id} isAdmin={isAdmin} />
          ))}
      </div>

      {isError && (
        <div className="grid h-[calc(100dvh-84px)] w-full place-items-center text-2xl font-semibold text-red-500">
          <div className="flex flex-col items-center justify-center gap-4">
            <CloudAlert className="h-16 w-16" />
            Произошла ошибка при получении данных
          </div>
        </div>
      )}

      {!isError && hasPagination && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() =>
                  props.page > 1 && props.setPage((prev) => prev - 1)
                }
              >
                <PaginationPrevious text="Назад" />
              </PaginationItem>

              {data &&
                new Array(props?.meta?.pages).fill(0).map((_, i) => (
                  <PaginationItem onClick={() => props.setPage(i + 1)} key={i}>
                    <PaginationLink isActive={props.page === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem
                onClick={() =>
                  props.page < (props?.meta?.pages || 1) &&
                  props.setPage((prev) => prev + 1)
                }
              >
                <PaginationNext text="Вперёд" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};
