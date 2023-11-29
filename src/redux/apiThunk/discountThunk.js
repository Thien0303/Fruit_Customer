import { createAsyncThunk} from "@reduxjs/toolkit";
import { getDiscountFruit } from "../../api/fruitDiscount";
export const getAllDiscountFruit = createAsyncThunk(
    "discountFruit/getAllDiscountFruit",
    async ({ discountName, discountExpiryDate}, thunkAPI) => {
        try {
            const response = await getDiscountFruit(discountName, discountExpiryDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);