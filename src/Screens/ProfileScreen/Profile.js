import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions, useNavigation} from '@react-navigation/native';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AlertDialog from '../../Components/AlertDialog';
import profile from '../../../assets/images/Screens/profile.jpeg';
import {userDetail} from '../../Service/Login';
import {truncateName} from '../../Utilities/utilies';
const SharkPocketScreen = () => {
  const navigation = useNavigation();
  const {isReady, loginData} = useLoginDataStorage();
  const {clearLoginData} = useLoginDataStorage();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const data = isReady && loginData && loginData?.data;
  const data2 = [
    {
      title: 'Notification',
      icon: 'bell-outline',
      url: 'Notification',
    },
    {
      title: 'Game History',
      icon: 'gamepad-variant-outline',
      url: 'GameHistory',
    },
    {
      title: 'Bank Account',
      icon: 'bank-outline',
      url: 'BankAccount',
    },
    {
      title: 'Pan verification',
      icon: 'security',
      url: 'PanVerification',
    },
    {
      title: 'Aadhar Verification',
      icon: 'security',
      url: 'AadharDetail',
    },
    {
      title: 'Contact us',
      icon: 'phone-outline',
      url: 'ContactUs',
    },
    {
      title: 'How To Play',
      icon: 'message-arrow-right-outline',
      url: 'HowtoPlay',
    },

    {
      title: 'Refund and Policy',
      icon: 'undo',
      url: 'Refund',
    },
    {
      title: 'Terms & Conditions',
      icon: 'bookmark-outline',
      url: 'T&CScreen',
    },
    {
      title: "FAQ's",
      icon: 'bookmark-outline',
      url: 'Faq',
    },
    {
      title: 'Support',
      icon: 'help-circle-outline',
      url: 'Support',
    },
    {
      title: 'Log out',
      icon: 'logout',
      url: 'Logout',
    },
  ];

  const handleNavigation = url => {
    navigation.navigate(url, {user_id: data._id});
  };

  const handleLogout = async () => {
    try {
      await clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SplashScreen'}],
        }),
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const viewProfile = async () => {
    setLoader(true);
    try {
      const response = await userDetail(data._id);
      if (response.status === 1) {
        setUserData(response.data);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (isReady) {
      viewProfile();
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);

  const _renderCard = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            handleNavigation(item.url);
          }}>
          <View>
            <LinearGradient
              colors={['#3D1911', '#6A1701']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.cardImageContainer}>
              <Icon
                name={item.icon}
                size={wp('5%')}
                color="#fff"
                style={styles.cardImage}
              />
            </LinearGradient>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
          <View style={styles.cardArrowContainer}>
            <Icon
              name="chevron-right"
              size={wp('7%')}
              color="#000000"
              style={styles.arrowImage}
            />
          </View>
        </TouchableOpacity>
        <AlertDialog
          visible={visible}
          onClose={() => setVisible(false)}
          onOkPress={handleLogout}
        />
      </>
    );
  };
  return (
    <>
      <View colors={['#3D1911', '#6A1701']} style={styles.profileContainer}>
        <View>
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={profile} style={styles.profileImage} />
          </View>
          <View style={styles.profileDetailsContainer}>
            <View>
              <Text style={styles.profileName}>
                {truncateName(userData.name, 1)}
              </Text>
              <Text style={styles.profilePhone}>(+91) {userData.mobile}</Text>
              <View style={styles.profileInfoContainer}>
                <Text style={styles.profileFullName}>{userData.name}</Text>
                <Text style={styles.profileDot}>...</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.profileActionContainer}
              onPress={() => {
                navigation.navigate('ViewProfile', {userData});
              }}>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data2}
              renderItem={_renderCard}
              keyExtractor={(_item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default SharkPocketScreen;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    marginBottom: hp('5%'),
  },
  profileContainer: {
    padding: wp('4%'),
    backgroundColor: '#361911',
  },
  profileTitle: {
    marginTop: wp('6%'),
    fontSize: wp('5%'),
    fontWeight: '500',
    marginBottom: hp('2%'),
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  profileImageContainer: {
    backgroundColor: '#9C4831',
    width: wp('17%'),
    height: wp('17%'),
    borderRadius: wp('8.5%'),
    borderWidth: 3,
    borderColor: '#FFB700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('7.5%'),
    resizeMode: 'cover',
  },
  profileImageText: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: wp('5%'),
  },
  profileName: {
    color: 'white',
    fontSize: wp('5%'),
    marginBottom: hp('0.6%'),
    fontFamily: 'Montserrat-Bold',
  },
  profilePhone: {
    color: 'white',
    marginBottom: hp('0.6%'),
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Medium',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  profileFullName: {
    color: 'white',
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Medium',
  },
  profileDot: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    backgroundColor: 'white',
    borderRadius: wp('50%'),
    paddingVertical: wp('1.2%'),
    paddingHorizontal: wp('1.2%'),
    marginLeft: wp('2%'),
    textAlign: 'center',
    lineHeight: hp('1.2%'),
  },
  profileActionContainer: {
    marginLeft: wp('-8%'),
    borderColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewProfileText: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('0.7%'),
    fontFamily: 'Montserrat-Medium',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardContainer: {
    height: hp('5.8%'),
    borderBottomWidth: 0.8,
    borderBottomColor: 'lightgray',
    marginLeft: wp('4%'),
    marginTop: hp('1.8%'),
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    marginRight: wp('4%'),
    borderWidth: 1,
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
    backgroundColor: '#361911',
  },
  cardImage: {
    height: hp('6%'),
    width: wp('6%'),
    paddingTop: hp('1.75%'),
    paddingLeft: wp('0.6%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardTextContainer: {
    width: wp('70%'),
  },
  cardText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#361911',
  },
  cardArrowContainer: {
    width: wp('20%'),
  },
  arrowImage: {
    height: hp('6%'),
    width: wp('6%'),
    resizeMode: 'contain',
    paddingTop: wp(3),
  },
  button: {
    backgroundColor: '#596AFD',
    width: '90%',
    alignContent: 'center',
    marginTop: hp('20%'),
    marginLeft: wp('5%'),
    height: hp('8%'),
    borderRadius: 30,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: wp('5%'),
    color: 'white',
    marginLeft: wp('30%'),
    marginTop: hp('1.5%'),
  },
});
