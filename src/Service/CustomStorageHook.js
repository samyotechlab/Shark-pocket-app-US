import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLoginDataStorage = () => {
  const [loginData, setLoginData] = useState(null);
  const [isReady, setIsReady] = useState(false); 

  const storeLoginData = async data => {
    try {
      const jsonData = JSON.stringify(data);
       await AsyncStorage.setItem('@loginData', jsonData);
      setLoginData(data);
    } catch (error) {
      console.error('Error storing login data in AsyncStorage:', error);
    }
  };

  const getLoginData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@loginData');
      setLoginData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.error('Error getting login data from AsyncStorage:', error);
    }finally {
      setIsReady(true); // Mark as ready after fetching
    }
  };
  const clearLoginData = async () => {
    try {
      await AsyncStorage.removeItem('@loginData');
      setLoginData(null);
    } catch (error) {
      console.error('Error clearing login data from AsyncStorage:', error);
    }
  };
  const updateLoginData = async data => {
    try {
      await AsyncStorage.setItem('@loginData', JSON.stringify(data));
      setLoginData(data);
    } catch (error) {
      console.error('Error updating login data in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getLoginData();
  }, []);

  return {
    loginData,
    isReady,
    storeLoginData,
    updateLoginData,
    clearLoginData,
    getLoginData,
  };
};

export default useLoginDataStorage;
