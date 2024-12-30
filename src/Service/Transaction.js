import Config from "../Utilities/Config";
import apiInstance from "./AxiosInstance";

export const TransactionStore = async (user_id, amount) => {
    try {
      const response = await apiInstance.post(`${Config.Transaction_store}`, {
        user_id: user_id,
        transaction_amount: amount,
      });
      console.log("hello",response.data)
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  export const bonusWallet = async (data) => {
    try {
      const response = await apiInstance.post(Config.Bonus_wallet,{
        user_id:data.user_id,
        transaction_id:data._id,
        actual_amt:data.actual_amount,
        gst_amt:data.gst
      });
      if (response.status === 200) {
        console.log('Bonus Wallet added', response.data);
        return response.data;
      } else {
        console.error(
          'Failed transaction:',
          response.status,
        );
        throw new Error(`Failed transaction: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching transaction', error.message || error);
      throw error;
    }
  };

  export const checkPaymentStatus = async transection_id => {
    try {
      const response = await apiInstance.post(`${Config.checkPaymentStatus}`, {
        transactionId: transection_id,
      });
      return response;
    } catch (error) {
      console.log('error=========>', error);
      throw error;
    }
  };

  export const transactionDepositeData = async (transaction_id) => {
    const url = Config.DepositeTransaction+"/"+transaction_id
  
    try {
      const response = await apiInstance.post(url,{
        user_id:data.user_id
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Failed transaction:',
          response.status,
        );
        throw new Error(`Failed transaction: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching transaction', error.message || error);
      throw error;
    }
  };
  