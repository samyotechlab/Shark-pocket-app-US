import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl} from 'react-native';
import gst from '../../../assets/images/Screens/Gst.png';
import wallet from '../../../assets/images/Screens/rupees.png';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {userDetail} from '../../Service/Login';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AnimatedLoader from '../../Components/AnimatedLoader';
const WalletScreen = () => {
  const navigation = useNavigation();
  const {loginData, isReady} = useLoginDataStorage();
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Wallet</Text>
        <Iconics
          name="help-circle-outline"
          size={20}
          color={'white'}
          style={{paddingLeft: wp('44%'), marginBottom: 4}}
        />
        <TouchableOpacity style={styles.needHelpButton}>
          <Text style={styles.needHelpText}>Need Help</Text>
        </TouchableOpacity>
      </View>
{
  dataUser.length !=0 ?(
  !loader ? (<>
   <LinearGradient
        colors={['#3B191080', '#FFFFFF80', '#FFFFFF80']}
        style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.sectionTitle}>BALANCE</Text>
          </View>
          <View style={styles.balanceContent}>
            <Image source={wallet} style={styles.walletIcon} />
            <Text style={styles.balanceAmount}>₹ 1000</Text>
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
          <Text style={styles.label}>Deposit</Text>
          <LinearGradient
            colors={['#67FF00', '#3E9900']}
            style={styles.addCashButton}>
            <TouchableOpacity
              onPress={() => {
                handleNavigation('AddCash', {user_id: dataUser._id});
              }}>
              <Text style={styles.buttonText}>ADD CASH</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Text style={styles.amount}>₹ {dataUser.total_balance}</Text>
        <LinearGradient
          colors={['#999999', '#FFFFFF', '#999999']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 1,
            marginHorizontal: wp(2),
            marginBottom: hp('1%'),
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
          <Text style={styles.label}>Bonus</Text>
        </View>
        <Text style={styles.amount}>₹ {dataUser.bonus_wallet}</Text>
        <LinearGradient
          colors={['#999999', '#FFFFFF', '#999999']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 1,
            marginHorizontal: wp(2),
            marginBottom: hp('1%'),
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
          <Text style={styles.label}>Winning</Text>
          <TouchableOpacity 
          style={styles.withdrawButton}
          onPress={()=>{
            handleNavigation("WithdrawWallet",{dataUser:dataUser})
          }}
          >
            <Text style={styles.withdrawText}>WITHDRAW</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>₹ {dataUser.total_earning}</Text>
      </View>
      <TouchableOpacity
        style={styles.transactionContainer}
        onPress={() => {
          handleNavigation('WalletDetails', {user_id: dataUser._id});
        }}>
        <Text style={styles.transactionText}>My Transactions</Text>
        <Text style={styles.subText}>Deposit and withdrawal history</Text>
      </TouchableOpacity>

  </>):(<AnimatedLoader/>)):(
     <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data found</Text>
              </View>
  )
}
     

      <Image source={gst} style={styles.bannerImage} resizeMode="contain" />
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp('5%'),
    marginBottom: 20,
  },
  topBarTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5'),
  },
  needHelpButton: {
    backgroundColor: 'transparent',
    padding: 2,
  },
  needHelpText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  balanceContainer: {
    backgroundColor: '#6C2A1F',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'LuckiestGuy-Regular',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  cardContainer: {
    backgroundColor: '#A38C85',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: wp('5%'),
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  amount: {
    color: '#fff',
    fontSize: 20,
    // marginBottom: 10,
    paddingHorizontal: wp('13%'),
    fontFamily: 'Montserrat-Bold',
  },
  addCashButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('1%'),
    borderRadius: 5,
    marginHorizontal: hp('6%'),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  withdrawButton: {
    backgroundColor: '#FFFFFF33',
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 5,
    marginHorizontal: hp('5%'),
  },
  withdrawText: {
    color: '#444',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  transactionContainer: {
    backgroundColor: '#A38C85',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  transactionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#ddd',
    fontSize: 12,
  },
  bannerImage: {
    width: '100%',
    height: wp('75%'),
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
});
export default WalletScreen;
