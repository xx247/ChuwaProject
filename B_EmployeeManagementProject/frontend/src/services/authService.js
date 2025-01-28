import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const logIn = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        //console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const signUp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};
