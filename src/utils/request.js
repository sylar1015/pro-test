import axios from 'axios';
import {getToken} from '../utils/cookies';

const service = axios.create(
    {
        baseURL: process.env.REACT_APP_API,
        timeout:1000
    }
);

service.interceptors.request.use(function (config) {

        //添加Http Header
        config.headers['token'] = getToken();
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(function (response) {

        //判断返回值
        const data = response.data;
        return response;
    }, function (error) {
        return Promise.reject(error);
    }
);

export default service;