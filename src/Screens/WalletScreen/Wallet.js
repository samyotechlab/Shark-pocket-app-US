import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import Iconic from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useWalletData from './useWalletData';
import WalletBalance from './WalletBalance';
import WalletCard from './WalletCard';
import AnimatedLoader from '../../Components/AnimatedLoader';
import AlertDialogRed from '../../Components/AlertDialogRed';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import TransactionCard from './TransactionCard';

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
    setLoader,
  } = useWalletData(userId);

  const totalAmount =
    (userData?.total_balance || 0) +
    (userData?.bonus_wallet || 0) +
    (userData?.total_earning || 0) +
    (userData?.wallet || 0);

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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
          {/* ── Header ─────────────────────────────────────────── */}
          <View style={styles.header}>
            <Text style={styles.topBarTitle}>Wallet</Text>
            <View style={styles.headerRight}>
              <Iconics name="help-circle-outline" size={wp('5.5%')} color="white" />
              <TouchableOpacity
                onPress={() => navigation.navigate('Support', { user_id: userId })}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.needHelpText}>Need Help</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Content ────────────────────────────────────────── */}
          {loader ? (
            <View style={styles.loaderContainer}>
              <AnimatedLoader />
            </View>
          ) : userData?._id ? (
            <>
              {/* Balance */}
              <WalletBalance totalAmount={totalAmount} />

              {/* Wallet Cards */}
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
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.divider}
                />
                <WalletCard
                  icon="cash-outline"
                  label="Wallet"
                  amount={userData?.wallet || 0}
                />
              </View>

              {/* Transaction History */}
              <TransactionCard
                onPress={() => handleNavigation('WalletDetails', { user_id: userId })}
              />

              {/* Withdraw Policy */}
              <View style={{
                marginRight: Platform.OS === 'ios' ? wp('4%') : 0,
                borderRadius: wp('3%'),
                marginTop: Platform.OS === 'ios' ? hp('0.5%') : hp('1.5%'),
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}>
                <TouchableOpacity
                  style={styles.transactionContainer}
                  onPress={() => handleNavigation('WithDrawPolicy')}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={styles.transactionIcon}
                  >
                    <Iconic name="payments" size={wp('5.5%')} color="white" />
                  </LinearGradient>
                  <Text style={styles.transactionLabel}>Withdraw Policy</Text>
                  <Iconics
                    name="chevron-forward-outline"
                    size={wp('6%')}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>

      <AlertDialogRed
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        message={message}
        onOkPress={handleAadharRedirect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#361911',
  },

  linearGradient: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? wp('2%') : wp('5%'),
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp('3%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },

  topBarTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5%'),
  },

  needHelpText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: wp('3.8%'),
  },

  cardContainer: {
    backgroundColor: '#A38C85',
    marginTop: hp('2%'),
    borderRadius: wp('3%'),
    marginRight: Platform.OS === 'ios' ? wp('4%') : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  divider: {
    height: 1,
    marginHorizontal: wp('2%'),
  },
  transactionContainer: {
    backgroundColor: '#A38C85',
    flexDirection: 'row',
    borderRadius: wp('4%'),
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    overflow: 'hidden',
  },

  transactionIcon: {
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',

  },

  transactionLabel: {
    flex: 1,
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: wp('3%'),
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp('50%'),
  },

  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp('50%'),
  },

  noDataText: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});