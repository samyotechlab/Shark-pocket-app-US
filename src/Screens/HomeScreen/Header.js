import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import sharkLogo from '../../../assets/images/Screens/sharkLogo.png';
import shark from '../../../assets/images/Applogo/Sharkpocket1.png';
import bell from '../../../assets/images/Screens/bell.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { notificationList } from '../../Service/Notification';
import { useFocusEffect } from '@react-navigation/native';

export default function Header({ usersData, totalAmount, userId, navigation }) {
  const [notification, setNotificationData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loader, setLoader] = useState(false);
  
    const notificationData = async () => {
      setLoader(true)
      try {
        const response = await notificationList(userId);
        if (response) {
          setNotificationData(response.data);
          setUnreadCount(response.unreadCount || 0);
        }
      } catch (error) {
        console.log('error', error);
      }finally{
        setLoader(false)
      }
    };
    useFocusEffect(
      React.useCallback(() => {
        notificationData();
      }, [userId])
    );
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
      <TouchableOpacity onPress={() => navigation.navigate('Notification', { notification:notification,loader:loader,setLoader:setLoader,userId:userId})}>
        <View style={styles.bellContainer}>
          <Image source={bell} style={styles.icon} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
  },
  badge: {
    position: 'absolute',
    top: -wp('1%'), 
    right: -wp('1%'),
    backgroundColor: 'red',
    borderRadius: wp('3%'),
    width: wp('4%'),
    height: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
  },
});