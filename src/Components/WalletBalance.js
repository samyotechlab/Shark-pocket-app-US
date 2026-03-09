import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WalletBalance = ({ balance }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3d1911', '#6a1701']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Icons name="account-balance-wallet" size={24} color={'white'} />
        <Text style={styles.text}>Withdraw wallet Balance</Text>
        <Text style={styles.amount}>₹{balance}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    marginVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    width: wp('90%'),
    marginLeft: wp('5%'),
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: hp('2%'),
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: wp('2%'),
  },
  amount: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default WalletBalance;