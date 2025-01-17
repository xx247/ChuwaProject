import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct } from "../../../../client/src/services/productService";

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

export const productSlice = createSlice({
    name: 'product',
    initialState: {
      product: {},
      showProductImage: false,
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
    },
  })

  export const { toggleImage, changeProduct } = productSlice.actions
  
  export const productReducer = productSlice.reducer