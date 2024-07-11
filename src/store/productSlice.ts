import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sale & Product interfaces based on JSON data
export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface Product {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  brand: string;
  reviews: { customer: string; review: string; score: number }[];
  details: string[];
  tags: string[];
  sales: Sale[];
}

// Main product state
export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
