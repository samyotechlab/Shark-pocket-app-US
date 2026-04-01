import React from 'react';
import { Image, Text, View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WalletBalance({ totalAmount }) {
  return (
    <View style={styles.shadowWrapper}>
      <LinearGradient
        colors={['#3B191080', '#FFFFFF80', '#FFFFFF80']}
        style={styles.balanceContainer}
      >
        <View style={styles.balanceRow}>

          <Text style={styles.sectionTitle}>BALANCE</Text>

          <View style={styles.balanceContent}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/wallet--v1.png' }}
              style={styles.walletIcon}
            />
            <Text style={styles.balanceAmount} numberOfLines={1} adjustsFontSizeToFit>
              ₹{Number(totalAmount).toFixed(2)}
            </Text>
          </View>

        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    marginRight: Platform.OS === 'ios' ? wp('4%') : 0,
    borderRadius: wp('3%'),
    marginTop:  Platform.OS === 'ios' ? hp('0.5%') :  hp('1.5%'),
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius:  5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  balanceContainer: {
    borderRadius:      wp('3%'),
    paddingVertical: Platform.OS === 'ios' ? 0 : hp('2%'),
    paddingHorizontal: Platform.OS === 'ios' ? 0: wp('4%'),
    overflow:          'hidden',  
  },

  balanceRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal : Platform.OS === 'ios' ? wp('4%') : 0,
  },

  balanceContent: {
    flexDirection: 'row',
    alignItems:    'center',
  },

  walletIcon: {
    width:      wp('6%'),
    height:     wp('6%'),
    marginRight: wp('2%'),
    resizeMode: 'contain',
  },

  sectionTitle: {
    color:      '#FFFFFF',
    fontSize:   wp('5%'),
    fontFamily: 'Montserrat-Bold',
  },

  balanceAmount: {
    color:      '#fff',
    fontSize:   wp('6%'),
    fontFamily: 'LuckiestGuy-Regular',
    lineHeight: Platform.OS === 'ios' ? wp('6%') * 3: wp('6%') * 1.4 ,
  },
});