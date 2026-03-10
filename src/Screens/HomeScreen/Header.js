import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';

import sharkLogo from '../../../assets/images/Screens/sharkLogo.png';
import shark     from '../../../assets/images/Applogo/Sharkpocket1.png';
import bell      from '../../../assets/images/Screens/bell.png';
import { notificationList } from '../../Service/Notification';

export default function Header({ usersData, totalAmount, userId, navigation }) {

  // ── 1. ALL HOOKS TOGETHER AT TOP ─────────────────────────────────────────
  const { width, height } = useWindowDimensions();
  const insets             = useSafeAreaInsets();   // ✅ handles notch/Dynamic Island/status bar

  const [notification,  setNotificationData] = useState([]);
  const [unreadCount,   setUnreadCount]      = useState(0);
  const [loader,        setLoader]           = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchNotifications = async () => {
        setLoader(true);
        try {
          const response = await notificationList(userId);
          if (response && isActive) {
            setNotificationData(response.data);
            setUnreadCount(response.unreadCount || 0);
          }
        } catch (error) {
          console.log('Notification error:', error);
        } finally {
          if (isActive) setLoader(false);
        }
      };

      fetchNotifications();
      return () => { isActive = false; };
    }, [userId])
  );
  // ─────────────────────────────────────────────────────────────────────────

  // ── 2. Plain variables — NOT hooks ───────────────────────────────────────
  const isLandscape = width > height;

  const logoHeight     = isLandscape ? hp('6%')   : hp('5%');
  const logoWidth      = isLandscape ? wp('18%')  : wp('30%');
  const walletIconH    = isLandscape ? hp('4%')   : hp('3%');
  const walletIconW    = isLandscape ? wp('5%')   : wp('6%');
  const walletFontSize = isLandscape ? wp('3%')   : wp('4.5%');
  const bellIconSize   = isLandscape ? wp('5%')   : wp('7%');
  const badgeSize      = isLandscape ? wp('3%')   : wp('4%');
  const badgeFontSize  = isLandscape ? wp('1.8%') : wp('2.5%');
  const headerPadV     = isLandscape ? hp('0.5%')   : hp('0.5%');

  // ✅ Safe area top:
  // - iOS: insets.top covers the notch / Dynamic Island / status bar
  // - Android: status bar height is handled by the OS so insets.top = 0 usually,
  //            but we add a small fallback just in case
  const safeTop = insets.top > 0 ? insets.top : Platform.OS === 'android' ? hp('0%') : 0;
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop:        safeTop + headerPadV,   // ✅ pushes content below notch
          paddingBottom:     headerPadV,
          paddingHorizontal: wp('3%'),
        },
      ]}
    >
      {/* Left — Profile logo */}
      <TouchableOpacity
        style={styles.logoContainer}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ViewProfile', {
            usersData: usersData || {},
            status: 1,
          })
        }
      >
        <Image
          source={sharkLogo}
          style={{ height: logoHeight, width: logoWidth, resizeMode: 'contain' }}
        />
      </TouchableOpacity>

      {/* Center — Brand logo */}
      <View style={styles.logo1Container}>
        <Image
          source={shark}
          style={{ height: logoHeight, width: logoWidth, resizeMode: 'contain' }}
        />
      </View>

      {/* Wallet balance */}
      <LinearGradient
        colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']}
        style={[
          styles.walletContainer,
          { borderRadius: wp('2%'), padding: wp('1.5%') },
        ]}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/wallet--v1.png' }}
          style={{ height: walletIconH, width: walletIconW, resizeMode: 'contain' }}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.walletText, { fontSize: walletFontSize, marginLeft: wp('1.5%') }]}
        >
          ₹ {usersData ? Number(totalAmount).toFixed(2) : '0.00'}
        </Text>
      </LinearGradient>

      {/* Bell / notifications */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Notification', {
              notification,
              loader,
              setLoader,
              userId,
            })
          }
        >
          <View style={styles.bellContainer}>
            <Image
              source={bell}
              style={{ width: bellIconSize, height: bellIconSize, resizeMode: 'contain' }}
            />
            {unreadCount > 0 && (
              <View
                style={[
                  styles.badge,
                  {
                    width:        badgeSize,
                    height:       badgeSize,
                    borderRadius: badgeSize / 2,
                    top:          -wp('1%'),
                    right:        -wp('1%'),
                  },
                ]}
              >
                <Text style={[styles.badgeText, { fontSize: badgeFontSize }]}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
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
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: '#552113',
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius:  4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logoContainer: {
    flex:           0.5,
    alignItems:     'center',
    justifyContent: 'center',
  },
  logo1Container: {
    flex:           2,
    alignItems:     'center',
    justifyContent: 'center',
  },
  walletContainer: {
    flex:           1.5,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
  },
  walletText: {
    color:      '#FFFFFF',
    fontFamily: 'LuckiestGuy-Regular',
    textAlign:  'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems:    'center',
    marginLeft:    8,
  },
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position:        'absolute',
    backgroundColor: 'red',
    justifyContent:  'center',
    alignItems:      'center',
  },
  badgeText: {
    color:      '#FFFFFF',
    fontWeight: 'bold',
  },
});