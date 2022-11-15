import axios from "axios";

//创建axios实例
const service = axios.create({
    timeout: 10000,
});

//请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

//响应拦截器
service.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    }
)

//对外暴露
export default service

