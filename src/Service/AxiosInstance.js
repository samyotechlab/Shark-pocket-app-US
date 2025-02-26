import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const baseApiurl = 'http://192.168.29.57:3001'
// export const baseApiurl='https://api.sharkpocket.in'


console.log("baseApiurl", baseApiurl)

const apiInstance = axios.create({
  baseURL: `${baseApiurl}`,
  timeout: 5000,
});

apiInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@loginData');
    config.headers.token = JSON.parse(token).token;
    return config;
  },
  error => {
    console.log("error", error)
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error("Response Error:", error.response);
    } else if (error.request) {
      console.error("Request Error (No Response):", error.request);
    } else {
      console.error("Axios Configuration Error:", error.message);
    }
    return Promise.reject(error);
  },
);


export default apiInstance;
