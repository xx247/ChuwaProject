import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getApplicationStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/application/onboardingStatus`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        //console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const submitApplication = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/application/submit`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};