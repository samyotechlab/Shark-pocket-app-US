import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const historyData = async ( user_id) => {
    try {
      const response = await apiInstance.post(Config.History_Api, {
        user_id
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Failed:',
          response.status,
        );
        throw new Error(`Failed histort data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  };


  export const gameHistory = async ( game_id,user_id) => {
    console.log("ticket=========>", user_id)
    console.log("ticket=========>game_id", game_id)
    try {
      const response = await apiInstance.post(Config.Game_History, {
        user_id,
        game_id,
      });
      if (response.status === 200) {
        console.log('Game history data', response.data);
        return response.data;
      } else {
        console.error(
          'Failed:',
          response.status,
        );
        throw new Error(`Failed histort data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  };