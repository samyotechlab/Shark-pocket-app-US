import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import gst from '../../../assets/images/Screens/Gst.png'
import wallet from '../../../assets/images/Screens/rupees.png'
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const WalletScreen = () => {
  const navigation = useNavigation()
  const handleNavigation = (name)=>{
    // navigation.navigate("WalletDetails")
    navigation.navigate(name)
  }
  return (
     <LinearGradient
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>      
          <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Wallet</Text>
        <Iconics name="help-circle-outline" size={20} color={'white'} style={{paddingLeft:wp('44%'),marginBottom:4}}/>
        <TouchableOpacity style={styles.needHelpButton}>
          <Text style={styles.needHelpText}>Need Help</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['#3B191080','#FFFFFF80','#FFFFFF80']} style={styles.balanceContainer}>
  <View style={styles.balanceRow}>
    <View>
    <Text style={styles.sectionTitle}>BALANCE</Text>
    </View>
    <View style={styles.balanceContent}>
      <Image
        source={wallet}
        style={styles.walletIcon}
      />
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
      }}
    >
      <Iconics name="wallet-outline" size={20} color={'white'} />
    </LinearGradient>
          <Text style={styles.label}>Deposit</Text>
          <TouchableOpacity style={styles.addCashButton}
          onPress={()=>{
            handleNavigation("AddCash")
          }
        }
          >
            <Text style={styles.buttonText}>ADD CASH</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>₹ 0000</Text>
         <LinearGradient
                colors={['#999999', '#FFFFFF', '#999999']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 1,              
                  // marginTop: 10,          
                  marginHorizontal: wp(2), 
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
      }}
    >
      <Iconics name="wallet-outline" size={20} color={'white'} />
    </LinearGradient>
          <Text style={styles.label}>Bonus</Text>
        </View>
        <Text style={styles.amount}>₹ 0000</Text>
        {/* <View style={styles.divider} /> */}
        <LinearGradient
                colors={['#999999', '#FFFFFF', '#999999']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: 1,                      
                  marginHorizontal: wp(2), 
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
      }}
    >
      <Iconics name="wallet-outline" size={20} color={'white'} />
    </LinearGradient>
          <Text style={styles.label}>Winning</Text>
          <TouchableOpacity 
          style={styles.withdrawButton}
          onPress={()=>{
            handleNavigation("WithdrawWallet")
          }}
          >
            <Text style={styles.withdrawText}>WITHDRAW</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>₹ 0000</Text>
      </View>
      <TouchableOpacity style={styles.transactionContainer} 
      onPress={()=>{
        handleNavigation('WalletDetails')
      }}
      >
        <Text style={styles.transactionText}>My Transactions</Text>
        <Text style={styles.subText}>Deposit and withdrawal history</Text>
      </TouchableOpacity>
      <Image
        source={gst}
        style={styles.bannerImage}
        resizeMode="contain"
      />
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
    marginTop:40,
    marginBottom: 20,
  },
  topBarTitle: {
          color: 'white',
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 24,
  },
  needHelpButton: {
    backgroundColor: 'transparent',
    padding: 5,
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
    borderWidth:1,
    borderColor:'transparent'
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
    fontFamily:'PatuaOne-Regular'
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily:'Montserrat-Bold'
  },
  cardContainer: {
    backgroundColor: "#A38C85",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Montserrat-Medium'
  },
  amount: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: wp('13%'),
        fontFamily:'Montserrat-Bold'
  },
  addCashButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  withdrawButton: {
    backgroundColor: '#A1A1A1',
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 5,
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
    backgroundColor: "#A38C85",
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
    height: 200,
    borderRadius: 10,
    marginTop:20
  },
});
export default WalletScreen;


