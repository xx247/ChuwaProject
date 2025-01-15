import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signIn = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
};

export const signUp = async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
};
