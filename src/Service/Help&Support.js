import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const helpAndSupport = async (data) => {
    console.log("dtaa",data)
    try {
      const response = await apiInstance.post(Config.HelpAndSupport,data);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Failed:',
          response.status,
        );
        throw new Error(`Failed to ssubmit the request: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  };

  export const showIssue = async () => {
    try {
      const response = await apiInstance.get(`${Config.SupportTitle}`);
      return response.data;
    } catch (error) {
      console.log('error------------', error);
      throw error;
    }
  };