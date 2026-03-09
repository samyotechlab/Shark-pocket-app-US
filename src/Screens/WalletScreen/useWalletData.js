import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { userDetail } from '../../Service/Login';

export default function useWalletData(userId) {
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUserData = async () => {
    setLoader(true);
    try {
      const response = await userDetail(userId);
      const formattedData = {
        ...response.data,
        total_balance: Number(parseFloat(response?.data?.total_balance || 0).toFixed(2)),
        bonus_wallet: Number(parseFloat(response?.data?.bonus_wallet || 0).toFixed(2)),
        total_earning: Number(parseFloat(response?.data?.total_earning || 0).toFixed(2)),
      };
      setUserData(formattedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoader(false);
    }
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchUserData();
      setRefreshing(false);
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserData();
      }
    }, [userId])
  );

  return {
    userData,
    loader,
    refreshing,
    isModalVisible,
    message,
    refreshData,
    setIsModalVisible,
    setMessage,
    setLoader
  };
}