import apiInstance from "./AxiosInstance";
import Config from "../Utilities/Config";

export const userDetail = async user_id => {
  try {
    const response = await apiInstance.post(`${Config.Profile}`, {
      user_id,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log('error======>', error);
    throw error;
  }
};

export const updateProfile = async userData => {
  console.log("userData",userData)
  try {
    const response = await apiInstance.post(`${Config.EditProfile}`, {
      userData,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log('error======>', error);
    throw error;
  }
};

