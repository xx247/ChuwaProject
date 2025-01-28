import axios from "axios";
import request from "../utils/request";

const API_URL = "http://localhost:1011";

export const uploadFile = async (formData) => {
  try {
    // const response = await axios.post(`${API_URL}/application/submit`, data);
    const response = await axios.post(`${API_URL}/document/upload/singlefile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
    alert("File uploaded successfully!");
    //console.log("Upload Response:", response.data);
    return response;
  } catch (error) {
    return error.response;
  }
};
