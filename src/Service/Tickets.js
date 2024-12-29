import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const ticketList = async (game_id, user_id) => {
  console.log("ticket", user_id)
  try {
    const response = await apiInstance.post(Config.Game_Ticket_List, {
      game_id,
      user_id
    });
    if (response.status === 200) {
      console.log('Game Ticket list', response.data);
      return response.data;
    } else {
      console.error(
        'Failed:',
        response.status,
      );
      throw new Error(`Failed Show Ticket: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching Data', error.message || error);
    throw error;
  }
};

export const storeTicket = async (gameId, ticketId, userId) => {
  console.log("")
  try {
    const response = await apiInstance.post(`${Config.Store_Ticket}`, {
      game_id: gameId,
      ticket_id: ticketId,
      user_id: userId,
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};


