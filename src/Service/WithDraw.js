import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const withdrawCash = async (user_id, amount) => {
  try {
    const response = await apiInstance.post(Config.Wallet_Store, {
      user_id,
      amount,
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const withdrawHistory = async (user_id) => {
  try {
    const response = await apiInstance.post(Config.Wallet_Request, {
      user_id
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch Withdraw History. Status code:',
        response.status,
      );
      throw new Error(`Failed to fetch Withdraw History : ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetchingWithdraw History', error.message || error);
    throw error;
  }
};

export const showTds = async (user_id,withdraw_request) => {
  try {
    const response = await apiInstance.post(Config.ShowTds, {
      user_id,
      withdraw_request
    });
    console.log("response.data",response.data)
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch Withdraw History. Status code:',
        response.status,
      );
      throw new Error(`Failed to fetch Withdraw History : ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetchingWithdraw History', error.message || error);
    throw error;
  }
};

