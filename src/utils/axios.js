import axios from 'axios';
import { path } from './API';

// const instance = axios.create({
//   baseURL: 'http://localhost:3002/api',
// });

const instance = axios.create({
  baseURL: `${path}/api`,
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default instance;
