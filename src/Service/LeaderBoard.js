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