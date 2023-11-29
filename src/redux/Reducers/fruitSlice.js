import { createSlice } from "@reduxjs/toolkit";
import { getFruit, getFruitDetail, getFruitDiscount } from "../apiThunk/fruitThunk";

const FruitSlice = createSlice({
    name: "fruits",
    initialState: {
        fruit: [],
        detail: [],
        discount: [],
        loading: false,
    },
    extraReducers: {
        [getFruit.pending]: (state, action) => {
            state.loading = true;
            state.loading = "loading"
        },
        [getFruit.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.fruit = action.payload;
        },
        [getFruit.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getFruitDetail.pending]: (state, action) => {
            state.loading = true;
            state.loading = "loading"
        },
        [getFruitDetail.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.detail = action.payload;
        },
        [getFruitDetail.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
        [getFruitDiscount.pending]: (state, action) => {
            state.loading = true;
            state.loading = "loading"
        },
        [getFruitDiscount.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.discount = action.payload;
        },
        [getFruitDiscount.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    },
})

export default FruitSlice.reducer