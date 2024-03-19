import axios from 'axios';

export const axios_instance = axios.create({
    baseURL: 'https://imscontroller-1.onrender.com'
});