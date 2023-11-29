import api from './api';
export const getDiscountFruit = async (discountName, discountExpiryDate) =>{
    const response = await api.get(`api/fruit-discounts?discountName=${discountName}&discountExpiryDate=${discountExpiryDate}&activeOnly=true`);
    return response.data;
};