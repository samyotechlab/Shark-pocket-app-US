import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const bankStore = async verificationData => {
    console.log('verificationData', verificationData);
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