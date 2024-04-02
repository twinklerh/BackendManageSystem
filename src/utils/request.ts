import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 5000,
});

request.interceptors.request.use((config) => {
    // if(!(config.url === '/api/user/login' || config.url === '/api/user/register'))    {
    //     config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    //     console.log("请求头已加")
    // }   else    {   console.log("未加请求头");   }
    return config;
}, error => {
    return Promise.reject(new Error(error))
});

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const statusCode = error.code;
        console.log(24,statusCode)
        let message = "";
        switch (statusCode) {
            case 401:
                message = "Token expires";
                break;
            case 403:
                message = "Unauthorized access";
                break;
            case 404:
                message = "Request address error";
                break;
            case 500:
                message = "Backend error";
                break;
        }
        ElMessage.error(message);
        return Promise.reject(error);
    }
);

export default request;
