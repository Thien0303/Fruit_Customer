import { createSlice } from "@reduxjs/toolkit";
import { getAllSupplier } from "../apiThunk/orderThunk";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        supplier: [],
        loading: false,
    },
    extraReducers: {
        [getAllSupplier.pending]: (state, action) => {    
            state.loading = true;
            state.loading = "loading"
        },
        [getAllSupplier.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.supplier = action.payload;

        },
        [getAllSupplier.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})
export default orderSlice.reducer;