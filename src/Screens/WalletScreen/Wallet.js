import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import gst from '../../../assets/images/Screens/Gst.png';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { userDetail } from '../../Service/Login';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AnimatedLoader from '../../Components/AnimatedLoader';
import AlertDialogRed from '../../Components/AlertDialogRed';

const WalletScreen = () => {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [dataUser, setData] = useState({});
  const data = isReady && loginData && loginData?.data;
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const  [message,setMessage] = useState("")

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
        total_balance: Number(parseFloat(response?.data?.total_balance || 0).toFixed(2)),
        bonus_wallet: Number(parseFloat(response?.data?.bonus_wallet || 0).toFixed(2)),
        total_earning: Number(parseFloat(response?.data?.total_earning || 0).toFixed(2)),

      };
      setData(formattedData);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, [isReady]),
  );

  useEffect(() => {
    if (isReady) {
      userData();
    } else {
      setLoader(true);
    }
  }, [isReady]);

  const total_amount = (dataUser?.total_balance) + (dataUser?.bonus_wallet) + (dataUser?.total_earning)
  
  const handleNavigation = (name, user_id,{check}) => {
    if(check==1){
      if(dataUser?.is_aadhar_verified==0){
        setIsModalVisible(true);
        setMessage("Please verify your aadhar card to proceed further")
      }else{
        navigation.navigate(name, user_id);
      }
    }else{
      navigation.navigate(name, user_id);
    }
  };
  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        {
          dataUser?.length != 0 ? (
            !loader ? (<>
              <View style={{ flex: 0.1, flexDirection: 'row', marginTop: wp('5%') }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.topBarTitle}>Wallet</Text>
                </View>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Iconics
                    name="help-circle-outline"
                    size={20}
                    color={'white'}
                  />
                </View>
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Support')}>
                    <Text style={styles.needHelpText}>Need Help</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <LinearGradient
                colors={['#3B191080', '#FFFFFF80', '#FFFFFF80']}
                style={styles.balanceContainer}>
                <View style={styles.balanceRow}>
                  <View>
                    <Text style={styles.sectionTitle}>BALANCE</Text>
                  </View>
                  <View style={styles.balanceContent}>
                    <Image source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }} style={styles.walletIcon} />
                    <Text style={styles.balanceAmount}>₹ {total_amount.toFixed(2) || 0}</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <View style={styles.cardContainer}>
                  <View style={[styles.row]}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
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
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Deposit</Text>
                      <Text style={styles.amount}>₹ {dataUser?.total_balance || 0}</Text>
                    </View>
                    
                    <TouchableOpacity
                      style={{ flex: 1, marginRight: hp('1%') }}
                      onPress={() => {
                        handleNavigation('AddCash',
                           { user_id: dataUser?._id, balance: dataUser?.total_balance, status: 2 },
                           {check:1});
                      }}>
                      <LinearGradient
                        colors={['#67FF00', '#67FF00', '#3E9900']}

                        style={styles.addCashButton}>

                        <Text style={[styles.buttonText, { fontSize: hp('1.7%') }]}>ADD CASH</Text>

                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <LinearGradient
                    colors={['#999999', '#FFFFFF', '#999999']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 1,
                      marginHorizontal: wp(2),
                    }}
                  />
                  <View style={[styles.row]}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
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
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                      <Text style={styles.label}>Bonus</Text>
                      <Text style={styles.amount}>₹ {dataUser?.bonus_wallet || 0}</Text>
                    </View>


                  </View>
                  <LinearGradient
                    colors={['#999999', '#FFFFFF', '#999999']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 1,
                      marginHorizontal: wp(2),
                    }}
                  />
                  <View style={[styles.row]}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
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
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={styles.label}>Winning</Text>
                      <Text style={styles.amount}>₹ {dataUser?.total_earning || 0}</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, marginRight: hp('1%') }}
                      onPress={() => {
                        handleNavigation("WithdrawWallet",
                           { dataUser: dataUser },
                           {check:1})
                      }}>
                      <View
                        style={[styles.withdrawButton, { backgroundColor: '#FFFFFF33', }]} >
                        <EvilIcons
                          name="lock"
                          size={30}
                          color={'white'}
                          style={{ marginTop: -wp('2%') }}
                        />
                        <Text style={styles.buttonText}>WITHDRAW</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.transactionContainer}
                  onPress={() => {
                    handleNavigation('WalletDetails',
                       { user_id: dataUser?._id },
                       {check:3});
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
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Iconics
                      name="chevron-forward-outline"
                      size={25}
                      color={'white'}
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    />
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end', marginBottom: hp('2%') }}>
                {/* <Image source={gst} resizeMode='contain' /> */}
              </View>
            </>) : (<View style={styles.loaderContainer}>
              <AnimatedLoader />
            </View>)) : (<View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>)
        }
      </ScrollView>
      <AlertDialogRed visible={isModalVisible} onClose={() => setIsModalVisible(false)} message={message} onOkPress={() =>{
         setIsModalVisible(false)
         navigation.navigate("AadharDetail",{ user_id: data._id, mobile: dataUser.mobile })}} />
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
    flex: 0.5,
    flexDirection: 'row',
    marginTop: wp('5%'),
    backgroundColor: 'black'
  },
  topBarTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5'),
  },
  needHelpText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: wp('4%'),
  },
  balanceContainer: {
    backgroundColor: '#6C2A1F',
    padding: wp('4%'),
    borderRadius: hp('1.5%'),
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
    flex: 0.3,
    backgroundColor: '#A38C85',
    borderRadius: hp('1.5%'),
    marginTop: hp('2.5%'),

  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: hp('2.5%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  addCashButton: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('1%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.5%'),
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  withdrawButton: {
    paddingHorizontal: wp('0.5%'),
    paddingVertical: wp('1%'),
    borderRadius: 5,
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
    flex: 0.3,
    borderRadius: wp('4%'),
    marginTop: wp('6%'),
    gap: wp('5%'),
    alignItems: 'center',
    paddingHorizontal: hp('2%')

  },
  transactionText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Medium',
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
