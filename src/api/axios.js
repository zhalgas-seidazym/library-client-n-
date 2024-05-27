import axios from "axios";

const api = axios.create({
    baseURL: 'https://library-system-app.up.railway.app/'
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');
                const response = await axios.post('/api/users/token/refresh/', {refreshToken});
                const {token} = response.data;

                localStorage.setItem('access', token);
                localStorage.setItem('refresh', refreshToken);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                console.log(error)
            }
        }

        return Promise.reject(error);
    }
);

export const isAuthenticated = () => {
    const token = localStorage.getItem('access');
    return token !== null;
};

export default api;
