import axios from 'axios';
import request from '../utils/request';

const API_URL = 'http://localhost:1011';

export const getVisaStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/visaStatus/getVisaStatus`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

