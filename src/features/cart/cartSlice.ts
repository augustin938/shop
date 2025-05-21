import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  quantity: number;
}

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) item.quantity++;
      else state.push({ ...action.payload, quantity: 1 });
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;