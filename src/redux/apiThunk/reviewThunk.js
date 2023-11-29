import { createAsyncThunk } from "@reduxjs/toolkit";
import { getReviewAPI, deleteReviewAPI } from "../../api/review";

export const getReview = createAsyncThunk(
    "review/getReview",
    async ({ id }, thunkAPI) => {
        try {
            const response = await getReviewAPI(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteReview = createAsyncThunk(
    "review/deleteReview",
    async ({ id }, thunkAPI) => {
        try {
            const response = await deleteReviewAPI(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);