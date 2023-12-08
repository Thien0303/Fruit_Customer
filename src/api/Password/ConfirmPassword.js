import api from '../api';
export const confirmOTP = async (otp) =>{
    const response = await api.post(`api/auths/confirm-account`, otp);
    return response.otp;
};
export const forgotPassword = async (data) =>{
    const response = await api.post(`api/auths/send-otp`, data);
    return response.otp;
};
export const resetPassword = async (data) =>{
    const response = await api.post(`api/auths/reset-password`, data);
    return response.otp;
};