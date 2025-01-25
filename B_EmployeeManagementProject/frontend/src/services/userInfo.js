import axios from 'axios';
import request from '../utils/request';

const API_URL = 'http://localhost:5000';

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/userInfo/getUserInfo`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        //console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};