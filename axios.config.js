import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_SERVER });

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

const smsApi = axios.create({ baseURL: process.env.REACT_APP_SMS_API_SERVER });

smsApi.interceptors.request.use(
  (config) => {
    config.auth = {
      username: process.env.REACT_APP_SMS_USERNAME || '',
      password: process.env.REACT_APP_SMS_PASSWORD || '',
    };
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, smsApi };