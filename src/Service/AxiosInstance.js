import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

console.log("helloo",API_URL)
const apiInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000,
});

apiInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@loginData');
    config.headers.token = JSON.parse(token).token;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiInstance;
