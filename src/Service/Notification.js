import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const notificationList = async (user_id) => {
    try {
      const response = await apiInstance.post(`${Config.Notification_ById}`,{
        user_id
      });
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  export const unReadMsgCount = async (user_id) => {
    try {
      const response = await apiInstance.post(`${Config.unReadMsg}`,{
        user_id
      });
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };