import apiInstance from "./AxiosInstance";
import Config from "../Utilities/Config";

export const login = async () => {
        try {
          const response = await apiInstance.post(`${Config.Login}`, {
            trainer_id: id,
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
};