import axios from "axios";
import Config from "../Utilities/Config";
import apiInstance, { baseApiurl } from "./AxiosInstance";

export const getGameData = async _id => {
  try {
    const response = await apiInstance.post(`${Config.Home_Api}`, {
      user_id: _id,
    });
    return response.data;
  } catch (error) {
    console.log('errror', error);
  }
};

export const verifyLogin = async (userId, token) => {
  try {
    const response = await axios.post(`${baseApiurl}/${Config.VerifyLogin}`, {
      userId, token
    });
    return response.data;
  } catch (error) {
    console.log('errror======>', error);
  }
};

export const state = async () => {
  try {
    const response = await apiInstance.get(`${Config.State}`);
    return response.data;
  } catch (error) {
    console.log('errror', error);
  }
};

export const getVersionData = async () => {
  try {
    const response = await apiInstance.get(Config.Version)
    return response.data
  } catch (error) {
    console.log('errror', error);
  }
}

export const gameHistoryByUser = async (user_id) => {
  try {
    const response = await apiInstance.post(Config.GameHistoryUserById, {
      user_id,
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


