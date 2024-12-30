import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const PanVerificationData = async verificationData => {
    console.log('verificationData', verificationData);
    try {
      const response = await apiInstance.post(`${Config.PanVerification}`, {
        verificationData: verificationData,
      });
      console.log('response for panData', response.data);
      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };