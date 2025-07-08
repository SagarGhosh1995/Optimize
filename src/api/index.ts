import axios from 'axios';
import config from './config';
import { genxStore } from '../stores/genx/redux/store';

const api = axios.create({
    baseURL: config.apibaseurl,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = genxStore.getState()?.auth?.authdata?.access_token
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
