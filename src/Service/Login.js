import apiInstance, { baseApiurl } from "./AxiosInstance";
import Config from "../Utilities/Config";
import apiMultipartInstance from "./ApiMultiPartInstance";
import axios from "axios";

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

export const updateImage = async userData => {

  try {
    console.log("userData",userData)
    const response = await apiMultipartInstance.post(`${Config.EditImage}`, userData);

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
};


