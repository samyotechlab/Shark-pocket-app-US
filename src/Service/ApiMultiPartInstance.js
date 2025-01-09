import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
console.log("helloo=========>",API_URL)
const apiMultipartInstance = axios.create({
    baseURL: `${API_URL}`,
    timeout: 5000,
  });

apiMultipartInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@loginData');
   
      config.headers.token = JSON.parse(token).token;
      console.log("token",config.headers.token)

    return config;
  },
  error => {
    console.log("error",error)
    return Promise.reject(error);
  },
);

apiMultipartInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error",error)
    return Promise.reject(error);
  },
);

apiMultipartInstance.defaults.headers.post['Content-Type'] =
  'multipart/form-data';

export default apiMultipartInstance;