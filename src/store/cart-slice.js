import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
const initialState = {
  cartItems: cartItemsFromLocalStorage?.cartItems || [],
  totalQuantity: cartItemsFromLocalStorage?.totalQuantity || 0,
  restaurantName: cartItemsFromLocalStorage?.restaurantName || '',
  restaurantId: cartItemsFromLocalStorage?.restaurantId || null,
  cloudinaryImageId: cartItemsFromLocalStorage?.cloudinaryImageId || '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === newitem.id
      );
      state.totalQuantity++;
      state.restaurantName = newitem.restaurantName;
      state.restaurantId = newitem.restaurantId;
      state.cloudinaryImageId = newitem.cloudinaryImageId;

      if (!existingItem) {
        state.cartItems.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name: newitem.name,
          description: newitem.description,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newitem.price;
      }

      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === id
      );
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.restaurantName = '';
      state.restaurantId = null;
      state.cloudinaryImageId = '';
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
