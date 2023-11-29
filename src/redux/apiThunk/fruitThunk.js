import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFruitAPI, getFruitDetailAPI, getFruitDiscountAPI } from "../../api/fruit";

export const getFruit = createAsyncThunk(
    "fruit/getFruit",
    async ({ name, min, max, newDate, createDate, user }, thunkAPI) => {
        try {
            const response = await getFruitAPI(name, min, max, newDate, createDate, user);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getFruitDetail = createAsyncThunk(
    "fruit/getFruitDetail",
    async ({ id }, thunkAPI) => {
        try {
            const response = await getFruitDetailAPI(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getFruitDiscount = createAsyncThunk(
    "fruit/getFruitDiscount",
    async ({ id }, thunkAPI) => {
        try {
            const response = await getFruitDiscountAPI(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);