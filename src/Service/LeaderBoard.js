import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const leaderBoard = async game_id => {
  console.log("game_id",game_id)
    try {
      const response = await apiInstance.post(Config.LeaderBoardByGameId, {
        game_id,
      });
      console.log("response",response.data)
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  export const globalLeaderBoard = async () => {
    try {
      const response = await apiInstance.get(Config.Global_ByDate);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Failed:',
          response.status,
        );
        throw new Error(`Failed to fetch the data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  };