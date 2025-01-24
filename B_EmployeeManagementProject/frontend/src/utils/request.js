// customized axios instance, with baseURL and authorization header
import axios from 'axios';

const baseURL = 'http://localhost:5000';

const request = async (url, method, data) => {
    const token = localStorage.getItem('token');
    const response = await axios(
        {
            url: `${baseURL}${url}`,
            method,
            data,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.replace('/login');
        return Promise.reject('Unauthorized');
    }

    if (!response.ok) {
        return Promise.reject(new Error(`Request failed with status ${String(response.status)}`));
    }

    return await response.json();
}

export default request;