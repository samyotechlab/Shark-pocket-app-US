import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const WalletTransactionList = async user_id => {
    console.log(user_id)
    try {
      const response = await apiInstance.post(`${Config.Transaction_List}`, {
        user_id: user_id,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  export const WinningList = async user_id => {
    console.log(user_id)
    try {
      const response = await apiInstance.post(`${Config.Winning}`, {
        user_id: user_id,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }; 