import api from "./api";

export const getFruitAPI = async (name, min, max, newDate, createDate, user) => {
    let string = '/api/fruits/fruit-suppliers?activeOnly=true'
    if (name !== '')
        string = string + '&fruitName=' + name
    if (min !== '')
        string = string + '&minPrice=' + min
    if (max !== '')
        string = string + '&maxPrice=' + max
    if (newDate !== '')
        string = string + '&newestDate=' + newDate
    if (createDate !== '')
        string = string + '&createdDate=' + createDate
    if (user !== '')
        string = string + '&userId=' + user
    const response = await api.get(string);
    return response.data;
};

export const getFruitDetailAPI = async (id) => {
    const response = await api.get(`/api/fruits/supplier/${id}`);
    return response.data;
};

export const getFruitDiscountAPI = async (id) => {
    const response = await api.get(`/api/fruit-discounts/${id}`);
    return response.data;
}