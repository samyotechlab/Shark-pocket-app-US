import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const addExpectation = async (data) => {
    console.log("data",data)
    try {
        const response = await apiInstance.post(Config.Add_Expectation,{
            data
        });
        if (response.status === 201) {       
            return response.data;
        } else {
            console.error(
                'Failed to store data. Status code:',
                response.status,
            );
            throw new Error(`Failed to store Data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error store data :', error.message || error);
        throw error;
    }
};

export const editExpectation = async ({user_id,game_id,userExpectations}) => {
    try {
        const response = await apiInstance.put(`${Config.Edit_Expectation}${user_id}/${game_id}`,{
            userExpectations
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(
                'Failed to store data. Status code:',
                response.status,
            );
            throw new Error(`Failed to store data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error store data', error.message || error);
        throw error;
    }
};

export const getExpectation = async (user_id,game_id) => {
    try {
        const response = await apiInstance.get(`${Config.Show_Expectation}${user_id}/${game_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("response.data",response.data)
        }
    } catch (error) {
        console.error('Error store data', error.message || error);
        throw error;
    }
};

