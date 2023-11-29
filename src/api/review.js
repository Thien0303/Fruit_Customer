import api from "./api";

export const getReviewAPI = async (id) => {
    const response = await api.get(`api/review-fruits?activeOnly=true&fruitId=${id}`);
    return response.data;
};

export const postReviewAPI = async (data) => {
    const response = await api.post(`api/review-fruits`, data);
    return response.data;
};

export const putReviewAPI = async (data, id) => {
    const response = await api.put(`api/review-fruits/${id}`, data);
    return response.data;
};

export const deleteReviewAPI = async (id) => {
    const response = await api.delete(`api/review-fruits/${id}`);
    return response.data;
};