import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post('/auth/token', new URLSearchParams({
            username: data.email,
            password: data.password,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    },
    getMe: async (token: string) => {
        const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};
