import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api/axios";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const refreshToken = localStorage.getItem('refresh');
                console.log(localStorage);
                if (refreshToken) {
                    console.log('Sending refresh token:', refreshToken);
                    const response = await api.post('api/users/logout/', { refresh: refreshToken });
                    console.log('Logout response:', response.data);
                }
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('notificationShown');
                navigate('/');
            } catch (error) {
                console.error('Logout failed:', error.response ? error.response.data : error.message);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                localStorage.removeItem('notificationShown');
                navigate('/');
            }
        };

        logout();
    }, [navigate]);

    return null;
};

export default Logout;
