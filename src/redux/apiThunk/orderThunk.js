import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getSupplier } from "../../api/order";
import { toast } from "react-toastify";
export const createAllOrder = createAsyncThunk(
    "order/createAllOrder",
    async (data, thunkAPI) => {
        console.log("abc: ", data);
        try {
            const response = await createOrder(data);
            toast.success("Đặt hàng thành công, Chủ vườn sẽ liên hệ lại với bạn sau");
            return response;
        } catch (error) {
            toast.error("Tạo đơn hàng thất bại")
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getAllSupplier = createAsyncThunk(
    "supplier/getAllSupplier",
    async ({ fullName, roleName}, thunkAPI) => {
        try {
            const response = await getSupplier(fullName, roleName);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);