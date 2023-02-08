import axios from 'axios';
import { authTokenStorage } from "../services";

export const trackabiAPI = axios.create();

trackabiAPI.defaults.headers['Content-Type'] = 'application/json';
trackabiAPI.defaults.headers['Accept'] = 'application/json';
trackabiAPI.defaults.headers['X-requested-with'] = 'XMLHttpRequest';

trackabiAPI.interceptors.request.use((config) => {
  const token = authTokenStorage()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
