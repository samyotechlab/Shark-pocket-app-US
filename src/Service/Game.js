import Config from '../Utilities/Config';
import apiInstance from './AxiosInstance';

export const gameRule = async () => {
  try {
    const response = await apiInstance.get(Config.Game_Rule);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        'Failed to fetch game rules. Status code:',
        response.status,
      );
      throw new Error(`Failed to fetch game rules: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching game rules:', error.message || error);
    throw error;
  }
};

export const gameList = async (user_id) => {
  try {
    const response = await apiInstance.get(`${Config.Game_List}/${user_id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch game list. Status code:', response.status);
      throw new Error(`Failed to fetch games list:  ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching game list:', error.message || error);
    throw error;
  }
};

export const gameById = async (
  game_id
) => {
  try {
    const response = await apiInstance.get(`${Config.GameById}${game_id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch game list. Status code:', response.status);
      throw new Error(`Failed to fetch games list:  ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching game list:', error.message || error);
    throw error;
  }
};



export const finalScore = async (
  encryptedData,
  user_id
) => {
  try {
    const response = await apiInstance.post(Config.Final_Score, {
      encryptedData:encryptedData,
      user_id:user_id
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch game list. Status code:', response.status);
      throw new Error(`Failed to fetch games list:  ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching game list:', error.message || error);
    throw error;
  }
};
