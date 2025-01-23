import Config from "../Utilities/Config";
import apiMultipartInstance from "./ApiMultiPartInstance";
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

export const PanDocumentUpload = async (userData)=>{
  try {
    console.log("userData",userData)
    const response = await apiMultipartInstance.post(`${Config.Upload_Document}`, userData);
    if (response.status === 200) {
      console.log('Image uploaded successfully:', response.data);
      return response.data;
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('Error uploading image:', error.response || error.message);
    throw error;
  }
}