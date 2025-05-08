import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import {storeTicket, checkPaymentStatus } from '../../Service/Transaction';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AlertDialogRed from '../../Components/AlertDialogRed';
import AnimatedLoader from '../../Components/AnimatedLoader';
import PaymentStatusCard from '../../Components/PaymentStatusCard';
import Header from './Header';
import AmountInput from './AmountInput';
import PresetAmountButtons from './PresetAmountButtons';
import FeaturesSection from './FeaturesSection';
import useTransaction from './useTransaction';
import styles from './styles';
import { userDetail } from '../../Service/Login';

const AddCashScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_id, status, amounts, ticket_id, game_id } = route.params;
  const { loginData, isReady } = useLoginDataStorage();

  const [amount, setAmount] = useState('');
  const [userData, setUserData] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState('');
  const [checksPaymentStatus, setChecksPaymentStatus] = useState(false);
  const [toast, setToast] = useState(false);
  const { isLoading, setIsLoading, dialog, setDialog, paymentStatus, setPaymentStatus, initPhonePe, startTransaction } = useTransaction();

  const currentDate = new Date().toLocaleString();
  const user = isReady && loginData?.data;

  useEffect(() => {
    if (status === 1 && amounts) {
      setAmount(amounts.toString());
    }
  }, [status, amounts]);

  const fetchUserData = useCallback(async () => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const response = await userDetail(user._id);
      console.log('User data response:', response);
      const formattedData = {
        ...response.data,
        total_balance: Number(parseFloat(response?.data?.total_balance || 0).toFixed(2)),
        bonus_wallet: Number(parseFloat(response?.data?.bonus_wallet || 0).toFixed(2)),
        total_earning: Number(parseFloat(response?.data?.total_earning || 0).toFixed(2)),
      };
      console.log('User data:', formattedData);
      setUserData(formattedData);
    } catch (error) {
      console.log('Error fetching user data:', error);
      setDialog({ visible: true, message: 'Failed to fetch user data' });
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, setIsLoading, setDialog]);

  useFocusEffect(
    useCallback(() => {
      if (isReady && loginData) {
        fetchUserData();
      }
    }, [isReady, loginData, fetchUserData])
  );

  const handleAddCash = async () => {
    if (!amount) {
      setDialog({ visible: true, message: 'Please enter an amount' });
      return;
    }

    setIsLoading(true);
    try {
      const { mobile, name, aadhar, _id: userId } = userData;
      const response = await initPhonePe({ mobile, name, aadhar, userId, amount });
      await handleTransaction(response);
    } catch (error) {
      setDialog({ visible: true, message: `Transaction error: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransaction = async (response) => {
    try {
      const { base64, checksum, callBack_url, transaction_id } = response;
      const res = await startTransaction(base64, checksum, callBack_url, transaction_id);
      setChecksPaymentStatus(true);

      if (res.status) {
        const paymentResponse = await checkPaymentStatus(transaction_id);
        setTimeout(() => setChecksPaymentStatus(false), 3000);

        if (paymentResponse?.data?.status === 1) {
          setIsPaymentSuccess('success');
          setPaymentStatus({ status: 'success', message: paymentResponse.data.message });
          if (status === 1) {
            await handlePurchase();
          }
        } else {
          setIsPaymentSuccess('failed');
          setPaymentStatus({ status: 'failed', message: 'Transaction Failed' });
        }
      }
    } catch (error) {
      console.log('Transaction error:', error);
      setDialog({ visible: true, message: error.message });
      setIsPaymentSuccess('');
      setChecksPaymentStatus(false);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await storeTicket(game_id, ticket_id, user._id);
      if (response.status === 1) {
        setToast(true);
      }
    } catch (error) {
      setDialog({ visible: true, message: 'Purchase failed' });
    }
  };

  const totalAmount =
  (userData?.total_balance || 0) +
  (userData?.bonus_wallet || 0) +
  (userData?.total_earning || 0);

  console.log('Total Amount:', totalAmount);


  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <AnimatedLoader />
      ) : (
        <View style={styles.innerContainer}>
          <Header
            balance={totalAmount}
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <View style={styles.addCashContainer}>
              <AmountInput amount={amount} setAmount={setAmount} />
              <PresetAmountButtons onAmountPress={setAmount} />
              <TouchableOpacity style={styles.addCashButton} onPress={handleAddCash}>
                <Text style={styles.addCashButtonText}>ADD CASH</Text>
              </TouchableOpacity>
            </View>
            <FeaturesSection />
            <TouchableOpacity style={styles.referralBanner}>
              <Image
                source={require('../../../assets/images/Screens/referal.png')}
                style={styles.referralImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <AlertDialogRed
        visible={dialog.visible}
        onClose={() => setDialog({ ...dialog, visible: false })}
        message={dialog.message}
        onOkPress={() => setDialog({ ...dialog, visible: false })}
      />
      <PaymentStatusCard
        checksPaymentStatus={checksPaymentStatus}
        status={isPaymentSuccess}
        setIsPaymentSuccess={setIsPaymentSuccess}
        setCheckPaymentStatus={setChecksPaymentStatus}
        amount={amount}
        date={currentDate}
        buttonText={status === 1 && isPaymentSuccess === 'success' ? 'Start Game' : ''}
        toast={toast}
        ticket_id={ticket_id}
        game_id={game_id}
        user_id={user_id}
      />
    </SafeAreaView>
  );
};

AddCashScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user_id: PropTypes.string,
      status: PropTypes.number,
      amounts: PropTypes.number,
      ticket_id: PropTypes.string,
      game_id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default AddCashScreen;
