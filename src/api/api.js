import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fruitseasonms.azurewebsites.net',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to refresh token
const refreshAccessToken = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            refreshToken: JSON.parse(localStorage.getItem('user')).refreshToken
        }
        const refreshResponse = await instance.post('/api/auths/refresh-token', data);
        const { refreshToken, newRefreshToken } = refreshResponse.data.data;

        user.accessToken = refreshToken;
        user.refreshToken = newRefreshToken;
        localStorage.setItem('user', JSON.stringify(user));
        return refreshToken;
    } catch (error) {
        throw new Error('Token refresh failed');
    }
};

// Request interceptor
instance.interceptors.request.use(
    async (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If token expired, attempt to refresh
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const accessToken = await refreshAccessToken();
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
