import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const bankStore = async verificationData => {
    try {
      const response = await apiInstance.post(`${Config.Bank_Store}`, {
        verificationData: verificationData,
      });
      console.log('response for bankData', response.data);
      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };

  export const bankAccountDetails = async user_id => {
    try {
      const response = await apiInstance.post(`${Config.Bank_Detail}`, {
        user_id,
      });
      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };

  export const deleteBankAccount = async (user_id,account_no) => {
    try {
      const response = await apiInstance.post(`${Config.Bank_Delete}`, {
        user_id,
        account_no
      });
      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };