import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useWalletData from './useWalletData';
import WalletBalance from './WalletBalance';
import WalletCard from './WalletCard';
import AnimatedLoader from '../../Components/AnimatedLoader';
import AlertDialogRed from '../../Components/AlertDialogRed';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TransactionCard from './TransactionCard';
import styles from './styles';


export default function WalletScreen() {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const userId = isReady && loginData?.data?._id;
  const {
    userData,
    loader,
    refreshing,
    isModalVisible,
    message,
    refreshData,
    setIsModalVisible,
    setMessage,
  } = useWalletData(userId);

  const totalAmount =
    (userData?.total_balance || 0) +
    (userData?.bonus_wallet || 0) +
    (userData?.total_earning || 0);

  const handleNavigation = (screen, params, check = false) => {
    if (check && userData?.is_aadhar_verified === 0) {
      setIsModalVisible(true);
      setMessage('Please verify your Aadhar card to proceed further.');
    } else {
      navigation.navigate(screen, params);
    }
  };

  const handleAadharRedirect = () => {
    setIsModalVisible(false);
    navigation.navigate('AadharDetail', { user_id: userId, mobile: userData.mobile });
  };

  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.topBarTitle}>Wallet</Text>
          <View style={styles.headerRight}>
            <Iconics name="help-circle-outline" size={20} color="white" />
            <TouchableOpacity onPress={() => navigation.navigate('Support', { user_id: userId })}>
              <Text style={styles.needHelpText}>Need Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {userData?._id ? (
          !loader ? (
            <>
              <WalletBalance totalAmount={totalAmount} />
              <View style={styles.cardContainer}>
                <WalletCard
                  icon="wallet-outline"
                  label="Deposit"
                  amount={userData?.total_balance || 0}
                  buttonText="ADD CASH"
                  onPress={() =>
                    handleNavigation(
                      'AddCash',
                      { user_id: userId, balance: userData?.total_balance, status: 2 },
                      true
                    )
                  }
                />
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.divider}
                />
                <WalletCard
                  icon="gift-outline"
                  label="Bonus"
                  amount={userData?.bonus_wallet || 0}
                />
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.divider}
                />
                <WalletCard
                  icon="trophy-outline"
                  label="Winning"
                  amount={userData?.total_earning || 0}
                  buttonText="WITHDRAW"
                  buttonIcon="lock"
                  buttonIconComponent={EvilIcons}
                  onPress={() =>
                    handleNavigation('WithdrawWallet', { dataUser: userData }, true)
                  }
                />
              </View>
              <TransactionCard
                onPress={() => handleNavigation('WalletDetails', { user_id: userId })}
              />
            </>
          ) : (
            <View style={styles.loaderContainer}>
              <AnimatedLoader />
            </View>
          )
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>
        )}
      </ScrollView>
      <AlertDialogRed
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        message={message}
        onOkPress={handleAadharRedirect}
      />
    </LinearGradient>
  );
}


