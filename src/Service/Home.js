import axios from "axios";
import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";
import { API_URL } from '@env';

export const getGameData = async _id => {
    try {
      const response = await apiInstance.post(`${Config.Home_Api}`, {
        user_id: _id,
      });
      return response.data;
    } catch (error) {
      console.log('errror', error);
    }
  };

  export const verifyLogin  = async (userId,token) => {
    try {
      const response = await axios.post(`${API_URL}/${Config.VerifyLogin}`, {
        userId,token
      });
      return response.data;
    } catch (error) {
      console.log('errror', error);
    }
  };

