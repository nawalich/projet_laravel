import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor for API calls
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (data: any) =>
        api.post('/auth/register', data),
    logout: () =>
        api.post('/auth/logout'),
    getUser: () =>
        api.get('/auth/user')
};

export const userAPI = {
    getAll: (params?: any) =>
        api.get('/users', { params }),
    getOne: (id: number) =>
        api.get(`/users/${id}`),
    create: (data: FormData) =>
        api.post('/users', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    update: (id: number, data: FormData) =>
        api.post(`/users/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    delete: (id: number) =>
        api.delete(`/users/${id}`),
    export: (format: 'csv' | 'pdf') =>
        api.get(`/users/export/${format}`, {
            responseType: 'blob'
        }),
    getStats: () =>
        api.get('/users/stats')
};

export default api;