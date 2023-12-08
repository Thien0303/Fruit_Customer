import { createAsyncThunk} from "@reduxjs/toolkit";
import { confirmOTP, forgotPassword, resetPassword } from "../../../api/Password/ConfirmPassword";
import { toast } from "react-toastify";

export const confirmOTPPassword = createAsyncThunk(
    "password/confirmOTPPassword",
    async (otp, thunkAPI) => {
        try {
            const response = await confirmOTP(otp);
            toast.success("Tạo tài khoản thành công")
            return response;
        } catch (error) {
            toast.error("Tạo tài khoản thất bại")
            return thunkAPI.rejectWithValue(error.response.otp);
        }
    }
);
export const forgotPasswordOtp = createAsyncThunk(
    "password/forgotPasswordOtp",
    async (data, thunkAPI) => {
        try {
            const response = await forgotPassword(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const resetPasswordOtp = createAsyncThunk(
    "password/resetPasswordOtp",
    async (data, thunkAPI) => {
        try {
            const response = await resetPassword(data);
            toast.success("Cập nhật mật khẩu mới thành công ! Bạn hãy đăng nhập vào hệ thống")
            return response;
        } catch (error) {
            toast.error("Cập nhật thất bại")
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);