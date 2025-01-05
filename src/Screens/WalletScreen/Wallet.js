import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import gst from '../../../assets/images/Screens/Gst.png';
import wallet from '../../../assets/images/Screens/rupees.png';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { userDetail } from '../../Service/Login';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AnimatedLoader from '../../Components/AnimatedLoader';
const WalletScreen = () => {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [dataUser, setData] = useState({});
  const data = isReady && loginData && loginData?.data;
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      userData();
      setRefreshing(false);
    }, 2000);
  };

  const userData = async () => {
    setLoader(true);
    try {
      const response = await userDetail(data._id);
      const formattedData = {
        ...response.data,
        bonus_wallet: parseFloat(response.data.bonus_wallet).toFixed(2),
      };
      setData(formattedData);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (isReady) {
      userData();
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);

  const handleNavigation = (name, user_id) => {
    navigation.navigate(name, user_id);
  };
  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Wallet</Text>
          <Iconics
            name="help-circle-outline"
            size={20}
            color={'white'}
            style={{ paddingLeft: wp('44%'), marginBottom: 4 }}
          />
          <TouchableOpacity style={styles.needHelpButton}>
            <Text style={styles.needHelpText}>Need Help</Text>
          </TouchableOpacity>
        </View>
        {
          dataUser.length != 0 ? (
            !loader ? (<>
              <LinearGradient
                colors={['#3B191080', '#FFFFFF80', '#FFFFFF80']}
                style={styles.balanceContainer}>
                <View style={styles.balanceRow}>
                  <View>
                    <Text style={styles.sectionTitle}>BALANCE</Text>
                  </View>
                  <View style={styles.balanceContent}>
                    <Image source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }} style={styles.walletIcon} />
                    <Text style={styles.balanceAmount}>{dataUser.total_balance}</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={styles.cardContainer}>
                <View style={styles.row}>
                  <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={{
                      height: wp('8%'),
                      width: wp('8%'),
                      borderRadius: wp('4%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Iconics name="wallet-outline" size={20} color={'white'} />
                  </LinearGradient>
                  <View>
                    <Text style={styles.label}>Deposit</Text>
                    <Text style={styles.amount}>₹ {dataUser.total_balance}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleNavigation('AddCash', { user_id: dataUser._id });
                    }}>
                    <LinearGradient
                      colors={['#67FF00', '#67FF00', '#3E9900']}

                      style={styles.addCashButton}>

                      <Text style={styles.buttonText}>ADD CASH</Text>

                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.amount}>₹ {dataUser.total_balance}</Text> */}
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1,
                    marginHorizontal: wp(2),
                    marginBottom: hp('1%'),
                    marginTop: hp('1%'),
                  }}
                />
                {/* <View style={styles.divider} /> */}
                <View style={styles.row}>
                  <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={{
                      height: wp('8%'),
                      width: wp('8%'),
                      borderRadius: wp('4%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Iconics name="gift-outline" size={20} color={'white'} />
                  </LinearGradient>
                  <View>
                    <Text style={styles.label}>Bonus</Text>
                    <Text style={styles.amount}>₹ {dataUser.bonus_wallet}</Text>
                  </View>
                </View>

                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1,
                    marginHorizontal: wp(2),
                    marginBottom: hp('1%'),
                    marginTop: hp('1%'),
                  }}
                />
                <View style={styles.row}>
                  <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={{
                      height: wp('8%'),
                      width: wp('8%'),
                      borderRadius: wp('4%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Iconics name="trophy-outline" size={20} color={'white'} />
                  </LinearGradient>
                  <View>
                    <Text style={styles.label}>Winning</Text>
                    <Text style={styles.amount}>₹ {dataUser.total_earning}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={()=>{
                      handleNavigation("WithdrawWallet",{dataUser:dataUser})
                    }}>
                    <View
                      style={[styles.withdrawButton, { backgroundColor: '#FFFFFF33' }]}>
                      <EvilIcons
                        name="lock"
                        size={30}
                        color={'white'}
                        style={{justifyContent: 'center', alignItems: 'center',marginTop: -wp('1%')}}
                      />
                      <Text style={styles.buttonText}>WITHDRAW</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.transactionContainer}
                onPress={() => {
                  handleNavigation('WalletDetails', { user_id: dataUser._id });
                }}>
                  <LinearGradient
                    colors={['#3E180E1A', '#FFFFFF1A']}
                    style={{
                      height: wp('8%'),
                      width: wp('8%'),
                      borderRadius: wp('5%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Iconics name="timer-outline" size={22} color={'white'} />
                  </LinearGradient>
                  <View>
                    <Text style={styles.label1}>My Transactions</Text>
                    <Text style={styles.transactionText}>Deposit and withdrawal history</Text>
                  </View>
                    <View style={{justifyContent: 'center', alignItems: 'center',paddingLeft: wp('6%')}}>
                      <Iconics
                        name="chevron-forward-outline"
                        size={25}
                        color={'white'}
                        style={{justifyContent: 'center', alignItems: 'center'}}
                      />
                    </View>

              </TouchableOpacity>

              <View style={{flex:1,marginVertical:hp('12%')}}>
                {/* <Text>alignItems</Text> */}
               <Image source={gst} style={styles.bannerImage} resizeMode="contain" />
              </View>

            </>) : ( <View style={styles.loaderContainer}>
              <AnimatedLoader />
            </View>)) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>
          )
        }
     
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'), 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp('5%'),
    marginBottom: wp('5%'),
  },
  topBarTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5'),
  },
  needHelpButton: {
    backgroundColor: 'transparent',
    padding: hp('1%'),
  },
  needHelpText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: wp('4%'),
  },
  balanceContainer: {
    backgroundColor: '#6C2A1F',
    padding: wp('4%'),
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: hp('0.1%'),
    borderColor: 'transparent',
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: wp('5%'),
    height: hp('3%'),
    marginRight: wp('2%'),
  },
  balanceAmount: {
    color: '#fff',
    fontSize: wp('6%'),
    fontFamily: 'LuckiestGuy-Regular',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Bold',
  },
  cardContainer: {
    backgroundColor: '#A38C85',
    padding: hp('2%'),
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
  },
  row: {
    flexDirection: 'row',
    gap: wp('5%'),
    flex: 1
  },
  label: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-Regular',
  },
  label1: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  amount: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  addCashButton: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('1%'),
    marginHorizontal: hp('7%'),
    marginVertical: hp('1%'),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.7%'),
    letterSpacing: 1,
  },
  withdrawButton: {
    paddingHorizontal:wp('2%'),
    paddingVertical: wp('1%'),
    borderRadius: 5,
    marginHorizontal: hp('4%'),
    marginVertical: hp('1.5%'),
    flexDirection: 'row',
  },
  withdrawText: {
    color: '#444',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: wp('3%'),
  },
  transactionContainer: {
    backgroundColor: '#A38C85',
    flexDirection: 'row', 
    padding: wp('3%'),
    flex:1,
    borderRadius: wp('4%'),
    marginTop: wp('3%'), 
    gap: wp('5%'),

  },
  transactionText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  subText: {
    color: '#ddd',
    fontSize: 12,
  },
  bannerImage: {
    alignSelf:'flex-end',
    justifyContent:'flex-end'
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: wp('5%'),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: hp('40%'),
  },
});
export default WalletScreen;
