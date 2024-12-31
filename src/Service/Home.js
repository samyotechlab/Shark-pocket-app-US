import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

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