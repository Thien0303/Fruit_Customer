import api from './api';
export const createOrder = async (data) =>{
    const response = await api.post(`api/orders`, data);
    console.log("data: ", data);
    return response.data;
};
export const getSupplier = async (fullName, roleName) =>{
    const response = await api.get(`api/users/get-all?fullName=${fullName}&activeOnly=true&roleName=${roleName}`);
    return response.data;
};