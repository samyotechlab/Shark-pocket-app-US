import axios from "axios";
import Config from "../Utilities/Config";
import apiInstance, { baseApiurl } from "./AxiosInstance";

export const AdharVerificationSendOtp = async aadhaar_number => {
  try {
    const response = await axios.post(`${baseApiurl}/${Config.AdharOptSend}`, {
      aadhaar_number,
    });
    return response.data;
  } catch (error) {
    console.log('error =====>', error);
    throw error;
  }
};

export const AadharVerificationVerifyOtp = async verificationData => {
  try {
    const response = await apiInstance.post(`${Config.AdharVerifyOtp}`, {
      verificationData: verificationData,
    });
    return response.data;
  } catch (error) {
    console.log('error------------', error);
    throw error;
  }
};
