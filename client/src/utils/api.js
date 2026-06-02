import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const normalizedBaseUrl = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, '')
  : 'https://community-problem-solver-hjmz.onrender.com';

const API = axios.create({
  baseURL: normalizedBaseUrl.endsWith('/api')
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`,
  withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
