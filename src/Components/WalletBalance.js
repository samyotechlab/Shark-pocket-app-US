import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WalletBalance = ({ balance }) => {
  const BORDER_RADIUS = wp('5%');

  return (
    <View style={styles.container}>
      <View style={[styles.shadowWrapper, { borderRadius: BORDER_RADIUS }]}>
        <LinearGradient
          colors={['#3d1911', '#6a1701']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { borderRadius: BORDER_RADIUS }]}
        >
          <Icons name="account-balance-wallet" 
          size= { Platform.OS === 'ios' ? wp('8%') : wp('6%') }
          color="white" />
          <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
            Withdraw wallet Balance
          </Text>
          <Text style={styles.amount} numberOfLines={1}>
            ₹{balance}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:    hp('1%'),
    paddingHorizontal: wp('5%'),
    // backgroundColor:'yellow
  },

  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius:  4,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  gradient: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingVertical:  Platform.OS === 'ios' ? 0 : hp('1.8%'),
    paddingHorizontal: wp('4%'),
    overflow:          'hidden', 
    height:            hp('6%'),
  },

  text: {
    flex:              1,
    color:             '#fff',
    fontSize:          wp('3.8%'),
    fontFamily:        'Montserrat-Medium',
    paddingHorizontal: wp('2%'),
    lineHeight:        wp('3.8%') * 1.4, // ✅ prevents text clipping on iOS
  },

  amount: {
    color:      '#fff',
    fontSize:   wp('4.5%'),
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: wp('4.5%') * 1.4, // ✅ prevents ₹ symbol clipping on iOS
  },
});

export default WalletBalance;