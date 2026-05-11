import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "@/entities/products";

interface ProductsState {
  isOpenCreate: boolean;
  isOpenUpdate: Product | null;
  isOpenDelete: Product | null;
}

const initialState: ProductsState = {
  isOpenCreate: false,
  isOpenUpdate: null,
  isOpenDelete: null,
};

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    openCreate: (state) => {
      state.isOpenCreate = true;
    },
    closeCreate: (state) => {
      state.isOpenCreate = false;
    },
    openUpdate: (state, { payload }: PayloadAction<Product>) => {
      state.isOpenUpdate = payload;
    },
    closeUpdate: (state) => {
      state.isOpenUpdate = null;
    },
    openDelete: (state, { payload }: PayloadAction<Product>) => {
      state.isOpenDelete = payload;
    },
    closeDelete: (state) => {
      state.isOpenDelete = null;
    },
  },
});

export const {
  openCreate,
  closeCreate,
  openUpdate,
  closeUpdate,
  openDelete,
  closeDelete,
} = productsSlice.actions;
