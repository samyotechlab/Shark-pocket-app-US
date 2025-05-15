import { useState } from 'react';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import { TransactionStore, bonusWallet, checkPaymentStatus } from '../../Service/Transaction';
import { encryptData, generateKey } from '../../Utilities/utilies';

const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ visible: false, message: '' });
  const [paymentStatus, setPaymentStatus] = useState({ status: '', message: '' });

  const initPhonePe = async ({ mobile, name, aadhar, userId, amount }) => {
    try {
      const key = generateKey(mobile, name, aadhar, userId);
      const encryptedData = encryptData(key, amount);
      const response = await TransactionStore(userId, encryptedData);
      
      const result = await PhonePePaymentSDK.init(
        response.environment_type,
        response.merchant_id,
        '',
        true
      );
      console.log("result",result)
      if (response.status !== 0) {
        await bonusWallet(response);
      }

      return response;
    } catch (error) {
      throw new Error(`SDK Initialization failed: ${error.message}`);
    }
  };

  const startTransaction = async (base64, checksum, callbackUrl, transactionId) => {
    try {
      const res = await PhonePePaymentSDK.startTransaction(
        base64,
        checksum,
        'com.sharkpocket',
        callbackUrl
      );
      return res;
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };

  return {
    isLoading,
    setIsLoading,
    dialog,
    setDialog,
    paymentStatus,
    setPaymentStatus,
    initPhonePe,
    startTransaction,
  };
};

export default useTransaction;