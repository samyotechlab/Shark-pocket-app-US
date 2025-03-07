import Config from "../Utilities/Config";
import apiMultipartInstance from "./ApiMultiPartInstance";
import apiInstance from "./AxiosInstance";

export const PanVerificationData = async verificationData => {
    try {
      const response = await apiInstance.post(`${Config.PanVerification}`, {
        verificationData: verificationData,
      });
      
      return response.data;
    } catch (error) {
      console.log('error------------', error.message);
      throw error;
    }
  };

export const PanDocumentUpload = async (userData)=>{

  try {
    const response = await apiMultipartInstance.post(`${Config.Pan_Document}`, userData);
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