import axios from 'axios';

const api = axios.create({ baseURL: process.env.API_SERVER });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const smsApi = axios.create({ baseURL: process.env.SMS_API_SERVER });

smsApi.interceptors.request.use(
  (config) => {
    config.auth = {
      username: process.env.SMS_API_USERNAME || '',
      password: process.env.SMS_API_PASSWORD || '',
    };
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, smsApi };