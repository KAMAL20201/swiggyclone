import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import userReducer from './userAuthSlice';

const store=configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
    }
});

export default store;