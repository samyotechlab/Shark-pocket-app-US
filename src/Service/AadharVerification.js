import axios from "axios";
import Config from "../Utilities/Config";
import apiInstance, { baseApiurl } from "./AxiosInstance";
import apiMultipartInstance from "./ApiMultiPartInstance";

export const AdharVerificationSendOtp = async aadhaar_number => {
  console.log("AdharVerificationSendOtp")
  try {
    const response = await axios.post(`${baseApiurl}/${Config.AdharOptSend}`, {
      aadhaar_number,
    });
    console.log("response",response)
    return response.data;
  } catch (error) {
    console.log('error', error);
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
    console.log('error', error);
    throw error;
  }
};

export const AadharDocumentUpload = async (userData)=>{

  try {
    const response = await apiMultipartInstance.post(`${Config.Aadhar_Document}`, userData);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error uploading image:', error.response || error.message);
    throw error;
  }
}

export const AadharConfirmVerification = async (user_id)=>{

  try {
    const response = await apiInstance.post(`${Config.Aadhar_Verify}`, {user_id});
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error to verify Aadhar', error.response || error.message);
    throw error;
  }
}
