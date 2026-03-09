import Config from "../Utilities/Config";
import apiMultipartInstance from "./ApiMultiPartInstance";
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

  export const showReason = async () => {
    try {
      const response = await apiInstance.get(`${Config.Show_Reason}`);

      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };

export const bankDocumentUpload = async (userData)=>{

  try {
    const response = await apiMultipartInstance.post(`${Config.Bank_Document}`, userData);
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