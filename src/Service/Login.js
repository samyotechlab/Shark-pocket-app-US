import apiInstance from "./AxiosInstance";
import Config from "../Utilities/Config";
import apiMultipartInstance from "./ApiMultiPartInstance";
import axios from "axios";
import {API_URL} from '@env';

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

export const updateImage = async userData => {
  console.log("userData",userData)


  // try {
  //   const response = await apiMultipartInstance.post(`/${Config.EditImage}`, {
  //     userData,
  //   });
  //   console.log(response.data)
  //   if (response.status === 200) {
  //     return response.data;
  //   }
  // } catch (error) {
  //   console.log('error======>', error);
  //   throw error;
  // }

  try {
    const response = await axios.post(`${API_URL}/${Config.EditImage}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Explicitly set multipart/form-data
      },
    });

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


