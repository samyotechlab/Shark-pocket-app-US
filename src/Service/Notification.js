import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const notificationList = async () => {
    try {
      const response = await apiInstance.post(`${Config.Notification_List}`);
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };