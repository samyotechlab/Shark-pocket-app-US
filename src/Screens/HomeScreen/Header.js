import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import sharkLogo from '../../../assets/images/Screens/sharkLogo.png';
import shark from '../../../assets/images/Applogo/Sharkpocket1.png';
import bell from '../../../assets/images/Screens/bell.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Header({ usersData, totalAmount, userId, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => navigation.navigate('ViewProfile', { usersData: usersData || {}, status: 1 })}
      >
        <Image source={sharkLogo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.logo1Container}>
        <Image source={shark} style={styles.logo} />
      </View>
      <LinearGradient
        colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']}
        style={styles.walletContainer}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/wallet--v1.png' }}
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>
          ₹ {usersData ? totalAmount.toFixed(2) : 'Loading...'}
        </Text>
      </LinearGradient>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification', { user_id: userId })}>
          <Image source={bell} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginTop: hp('3%'),
    backgroundColor: '#552113',
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo1Container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp('5%'),
    width: wp('35%'),
    resizeMode: 'contain',
  },
  walletContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('1%'),
    borderRadius: wp('2%'),
    justifyContent: 'center',
  },
  walletIcon: {
    height: hp('3%'),
    width: wp('7%'),
    resizeMode: 'contain',
  },
  walletText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontFamily: 'LuckiestGuy-Regular',
    marginLeft: wp('2%'),
    textAlign: 'center',
  },
  iconsContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: wp('5%'),
  },
  icon: {
    height: hp('4%'),
    width: wp('8%'),
    resizeMode: 'contain',
  },
});