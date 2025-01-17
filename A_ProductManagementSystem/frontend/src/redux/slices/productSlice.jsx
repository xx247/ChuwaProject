import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, loadAllProducts } from "../../services/productService";

export const loadProduct = createAsyncThunk(
  'product/loadProduct',
  async (id) => {
    if (id) {
      const data = await getProduct(id);
      return data;
    } else {
      return {}
    }
  }
);

export const loadProducts = createAsyncThunk(
  'product/loadProducts',
  async () => {
    const data = await loadAllProducts();
    return data;
  }
);

export const productSlice = createSlice({
    name: 'product',
    initialState: {
      product: {},
      showProductImage: false,
      products: [],
    },
    reducers: {
      toggleImage: (state, action) => {
        state.showProductImage = !state.showProductImage;
      },
      changeProduct: (state, action) => {
        state.product[action.payload.name] = action.payload.value;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadProduct.fulfilled, (state, action) => {
          state.product = action.payload;
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
          state.products = action.payload;
        })
    },
  })

  export const { toggleImage, changeProduct } = productSlice.actions
  
  export const productReducer = productSlice.reducer