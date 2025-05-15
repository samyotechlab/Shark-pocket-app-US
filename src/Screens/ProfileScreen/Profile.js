import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { userDetail } from '../../Service/Login';
import AlertDialogGreen from '../../Components/AlertDialogGreen';
import AlertDialogRed from '../../Components/AlertDialogRed';
import ProfileHeader from './ProfileHeader';
import MenuItem from './MenuItem';
import styles from './styles';
import { notificationList } from '../../Service/Notification';

const SharkPocketScreen = () => {
  const navigation = useNavigation();
  const { isReady, loginData, clearLoginData } = useLoginDataStorage();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [url, setItemUrl] = useState('');
  const [notification, setNotificationData] = useState([]);
  const data = isReady && loginData && loginData?.data;

  const menuItems = [
    { title: 'Notification', icon: 'bell-outline', url: 'Notification' },
    { title: 'Game History', icon: 'gamepad-variant-outline', url: 'GameHistory' },
    {
      title: 'Aadhar Verification',
      icon: 'security',
      url: 'AadharDetail',
      is_verified: userData.is_aadhar_verified,
    },
    {
      title: 'Pan verification',
      icon: 'security',
      url: 'PanVerification',
      is_verified: userData.is_pan_verified,
    },
    {
      title: 'Bank Account',
      icon: 'bank-outline',
      url: 'BankAccount',
      is_verified: userData.is_account_verified,
    },
    { title: 'Contact us', icon: 'phone-outline', url: 'ContactUs' },
    { title: 'How To Play', icon: 'message-arrow-right-outline', url: 'HowtoPlay' },
    { title: 'Privacy Policy', icon: 'message-arrow-right-outline', url: 'PrivacyPolicy' },
    { title: 'Refund and Policy', icon: 'undo', url: 'Refund' },
    { title: 'Withdraw Policy', icon: 'security', url: 'WithDrawPolicy' },
    { title: 'Terms & Conditions', icon: 'bookmark-outline', url: 'T&CScreen' },
    { title: "FAQ's", icon: 'bookmark-outline', url: 'Faq' },
    { title: 'Support', icon: 'help-circle-outline', url: 'SupportScreen' },
    { title: 'Log out', icon: 'logout', url: 'Logout' },
  ];

  const fetchUserProfile = useCallback(async () => {
    setLoader(true);
    try {
      const response = await userDetail(data._id);
      if (response.status === 1) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoader(false);
    }
  }, [data?._id]);

  useEffect(() => {
    if (isReady && loginData) {
      fetchUserProfile();
    } else {
      setLoader(true);
    }
  }, [isReady, loginData, fetchUserProfile]);

  useFocusEffect(
    useCallback(() => {
      if (isReady && loginData) {
        fetchUserProfile();
      }
    }, [isReady, loginData, fetchUserProfile])
  );

  const handleNotification = async () => {
    try {
      setLoader(true)
      const response = await notificationList(data._id)
      console.log("reposne",response)
      if (response.status === 1) {
        setNotificationData(response.data);
         navigation.navigate('Notification', { notification:notification,loader:loader,setLoader:setLoader,userId:data._id})
      }
    } catch (error) {
     console.log('error', error);
    } finally {
      setLoader(false)
    }
  }

  const handleNavigation = (url) => {
    if (url === 'Logout') {
      setVisible(true);
    } else if (url === 'Notification') {
      handleNotification()
    }
    else {
      navigation.navigate(url, { user_id: data._id, mobile: userData.mobile });
    }
  };

  const handleModal = (msg, redirectUrl) => {
    setMessage(msg);
    setItemUrl(redirectUrl);
    setIsModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      await clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <>
      <MenuItem
        item={item}
        userData={userData}
        onNavigate={handleNavigation}
        onModal={handleModal}
      />
      <View style={styles.itemSeparator} />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileTab}>
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <ProfileHeader
          userData={userData}
          onViewProfile={() => navigation.navigate('ViewProfile', { usersData: userData })}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <AlertDialogGreen
        visible={visible}
        onClose={() => setVisible(false)}
        onOkPress={handleLogout}
        message="Are You Sure You Want to Logout?"
        ok="Yes"
      />
      <AlertDialogRed
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        message={message}
        onOkPress={() => {
          setIsModalVisible(false);
          navigation.navigate(url, { user_id: data._id, mobile: userData.mobile });
        }}
      />
    </View>
  );
};

export default SharkPocketScreen;










