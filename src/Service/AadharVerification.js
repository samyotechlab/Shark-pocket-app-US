import axios from "axios";
import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";
import {API_URL} from '@env';

export const AdharVerificationSendOtp = async aadhaar_number => {
  console.log('adhar_number', aadhaar_number);
  console.log( `${API_URL}/${Config.AdharOptSend}`)
  try {
    const response = await axios.post(`${API_URL}/${Config.AdharOptSend}`, {
      aadhaar_number,
    });
    return response.data;
  } catch (error) {
    console.log('error =====>', error);
    throw error;
  }
};

export const AadharVerificationVerifyOtp = async verificationData => {
  console.log('verificationData', verificationData);
  try {
    const response = await apiInstance.post(`${Config.AdharVerifyOtp}`, {
      verificationData: verificationData,
    });
    // console.log('response for userData', response.data);
    return response.data;
  } catch (error) {
    console.log('error------------', error);
    throw error;
  }
};
