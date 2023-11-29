import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { fruitId, quantity } = action.payload;
      console.log("abc: ", action.payload);
      const existingProductIndex = state.findIndex(
        (item) => item.fruitId === fruitId
      );
      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += quantity;
      } else {
        state.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      const { fruitId } = action.payload;
      const index = state.findIndex((item) => item.fruitId === fruitId);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    removeFromCartByFamer: (state, action) => {
      const userId = action.payload;
      const newArray = state.filter((item) => item.userId !== userId);
      return newArray.slice();
    },
    increaseQuantity: (state, action) => {
      const { fruitId } = action.payload;
      const existingProductIndex = state.findIndex(
        (item) => item.fruitId === fruitId
      );
      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { fruitId } = action.payload;
      const existingProductIndex = state.findIndex(
        (item) => item.fruitId === fruitId
      );
      if (
        existingProductIndex !== -1 &&
        state[existingProductIndex].quantity > 1
      ) {
        state[existingProductIndex].quantity -= 1;
      }
    },
    selectPercent: (state, action) => {
      const { fruitId, percent, depositAmount, fruitDiscountId } =
        action.payload;
      const existingProductIndex = state.findIndex(
        (item) => item.fruitId === fruitId
      );
      state[existingProductIndex].percent = percent;
      state[existingProductIndex].depositAmount = depositAmount;
      state[existingProductIndex].fruitDiscountId = fruitDiscountId;
    },
    updateQuantity: (state, action) => {
        const { productId, quantity } = action.payload;
        const existingProduct = state.find((item) => item.fruitId === productId);
        if (existingProduct) {
            existingProduct.quantity = quantity;
        }
    },    
    clearData: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  selectPercent,
  clearData,
  removeFromCartByFamer,
  updateQuantity
} = cartSlice.actions;
export default cartSlice.reducer;
