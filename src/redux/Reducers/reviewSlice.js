import { createSlice } from "@reduxjs/toolkit";
import { getReview } from "../apiThunk/reviewThunk";

const ReviewSlice = createSlice({
    name: "reviews",
    initialState: {
        review: [],
        loading: false
    },
    extraReducers: {
        [getReview.pending]: (state, action) => {
            state.loading = true;
            state.loading = "loading"
        },
        [getReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.loading = "succeeded";
            state.review = action.payload;
        },
        [getReview.rejected]: (state, action) => {
            state.loading = false;
            state.loading = "failed";
        },
    }
})

export default ReviewSlice.reducer