import axios from "axios";

const user = localStorage.getItem("user")

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Authentication": `Bearer ${user ? JSON.parse(user)?.token || "" : ""}`,
    "Access-Control-Allow-Origin": "*"
  }
});

instance.interceptors.response.use((response) => {
  // const { data } = response;

  return response.data;
});

export default instance;
