import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {Product} from 'models/Product';
import {ToastAndroid} from 'react-native';

const ProductDetails = {
  products: [
    {
      productName: 'iphone',
      productType: 'gadget',
      quantity: 1,
      address: 'Hyderabad',
      isDelievered: false,
    },
    {
      productName: 'cooler',
      productType: 'electronics',
      quantity: 1,
      address: 'Madhapur',
      isDelievered: false,
    },
  ],
};
const productSlice = createSlice({
  name: 'product',
  initialState: ProductDetails,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const ps = [...state.products];
      ps.push(action.payload);
      state.products = ps;
      ToastAndroid.show('Product Successfully Added', 1000);
    },
    deliveryProduct: (state, action: PayloadAction<String>) => {
      const Products = [...state.products];
      Products.forEach(product => {
        if (product.productName === action.payload) {
          product.isDelievered = true;
        }
        state.products = Products;
      });
    },
  },
});

export const {addProduct, deliveryProduct} = productSlice.actions;

export const productReducer = productSlice.reducer;
