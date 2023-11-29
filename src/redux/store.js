import { configureStore } from "@reduxjs/toolkit";
import fruitSlice from "./Reducers/fruitSlice";
import reviewSlice from "./Reducers/reviewSlice";
import CartSlice from "./Reducers/CartSlice";
import orderSlice from "./Reducers/orderSlice";
import keywordSlice from "./Reducers/KeywordSlice"
const store = configureStore({
    reducer: {
        password: keywordSlice,
        fruit: fruitSlice,
        review: reviewSlice,
        order: orderSlice,
        cart: CartSlice,
    }
})

export default store