import axios from 'axios';
import {getToken} from '../utils/cookies';

const service = axios.create(
    {
        baseURL: process.env.REACT_APP_API,
        timeout:1000
    }
);

service.interceptors.request.use(function (config) {

        config.headers['token'] = getToken();
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return Promise.reject(error);
    }
);

export default service;