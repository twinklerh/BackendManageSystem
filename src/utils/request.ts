import { useUserStore } from "@/store/user";
import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
    baseURL: "http://sph-api.atguigu.cn/",
    timeout: 5000,
});

request.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.token = userStore.token
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error)
    }
);

request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const statusCode = error.response.status;
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
                default:
                    message = "An error occurred";
            }
            ElMessage.error(message);
            return Promise.reject(error.response.data);
        } else {
            ElMessage.error("Network Error");
            return Promise.reject(error);
        }
    }
);

export default request;
