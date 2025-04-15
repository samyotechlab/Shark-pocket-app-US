import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { userDetail } from '../../Service/Login';
import { truncateName } from '../../Utilities/utilies';
import AlertDialogGreen from '../../Components/AlertDialogGreen';
import AlertDialogRed from '../../Components/AlertDialogRed';
const SharkPocketScreen = () => {
  const navigation = useNavigation();
  const { isReady, loginData } = useLoginDataStorage();
  const { clearLoginData } = useLoginDataStorage();
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [url,setItemUrl] = useState('')
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
      title: 'Aadhar Verification',
      icon: 'security',
      url: 'AadharDetail',
      is_verified: userData.is_aadhar_verified,
      touch: true
    },
    {
      title: 'Pan verification',
      icon: 'security',
      url: 'PanVerification',
      is_verified: userData.is_pan_verified,
      touch: true
    },
    {
      title: 'Bank Account',
      icon: 'bank-outline',
      url: 'BankAccount',
      is_verified: userData.is_account_verified,

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
      url: 'SupportScreen',
    },
    {
      title: 'Log out',
      icon: 'logout',
      url: 'Logout',
    },
  ];
  const handleNavigation = (url) => {
    if (url === "Logout") {
      setVisible(true)
    } else {
      navigation.navigate(url, { user_id: data._id, mobile: userData.mobile });
    }
  }
  const handleModal = (item) => {
    setMessage(item)
    setIsModalVisible(true)
  }
  const handleLogout = async () => {
    try {
      await clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
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

  useFocusEffect(
    React.useCallback(() => {
      if (isReady && loginData) {
        viewProfile();
      }
    }, [isReady])
  );

  const VerificationIcon = ({ isVerified }) => (
    <Icon
      style={{ marginLeft: hp('11%') }}
      name={isVerified ? 'check-circle' : 'dots-horizontal-circle'}
      size={wp('6%')}
      color={isVerified ? '#21B600' : '#E90000'}
    />
  );

  const _renderCard = ({ item }) => {
    const isAadharVerified = userData.is_aadhar_verified === 1;
    const isPanVerified = userData.is_pan_verified === 1;
    return (
      <>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            if(item.url === "AadharDetail"){
              !isAadharVerified ? (handleNavigation(item.url)) :("")
            }else if(item.url === "PanVerification") {
              !isAadharVerified ?
               (
               handleModal("Aadhar is not Verified, please verify aadhar first."),
               setItemUrl("AadharDetail")
              )
               :
              !isPanVerified ?(handleNavigation(item.url)) : ("")
            }else if(item.url === "BankAccount"){
              !isPanVerified ? (
                handleModal("Pancard is not verified, please verify pancard first."),
                setItemUrl("PanVerification")
              ):
              (handleNavigation(item.url))
            }else{
              handleNavigation(item.url)
            }
          }}>
          <View style={{ flex: 0.5 }}>
            <LinearGradient
              colors={['#3D1911', '#3D1911', '#6A1701']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
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

          <View style={styles.verificationIcon}>
            {item.is_verified !== undefined && (
              <VerificationIcon isVerified={item.is_verified} />
            )}
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
        <AlertDialogGreen visible={visible} onClose={() => setVisible(false)} onOkPress={handleLogout} message={"Are You Sure You Want to Logout?"} ok={"Yes"} />
      </>
    );
  };
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.profileContainer} >
        <View style={styles.profileTab}>
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
        <View style={styles.profileHeader} >
          <View style={styles.profileImageContainer}>
            <Image source={userData.avatar
              ? { uri: userData.avatar }
              : require('../../../assets/images/Screens/profile.jpeg')}
              style={styles.profileImage} />
          </View>
          <View style={styles.profileDetailsContainer}>
            <View>
              <Text style={styles.profileName}>
                {truncateName(userData.userName, 1)}
              </Text>
              <Text style={styles.profilePhone}>(+91) {userData.mobile}</Text>
              <View style={styles.profileInfoContainer}>
                <Text style={styles.profileFullName}>{userData.name}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileActionContainer}
            onPress={() => {
              navigation.navigate('ViewProfile', { usersData: userData });
            }}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.container}>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data2}
              renderItem={_renderCard}
              keyExtractor={(_item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{
                  height: hp('0.1%'),
                  backgroundColor: 'lightgray',
                  width: wp('70%'),
                  alignSelf: 'center',
                  marginVertical: hp('0.4%'),
                }}
                />
              )}
            />
          </View>
        </View>
      </View>         
      </View>
      <AlertDialogRed visible={isModalVisible} onClose={() => setIsModalVisible(false)} message={message} onOkPress={() =>{
         setIsModalVisible(false)
         navigation.navigate(url,{ user_id: data._id, mobile: userData.mobile })}} />
    </>
  );
};
export default SharkPocketScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: hp('0.5%')
  },
  flatListContainer: {
    marginBottom: hp('1%'),
  },
  profileContainer: {
    flex: 0.5,
    backgroundColor: '#361911',
  },
  listContainer:{
    flex: 1.5,
    backgroundColor: '#fff',
  },
  profileTab:{
    flex:0.5,
    justifyContent:'flex-end',
    marginHorizontal:hp('2%')
  },
  profileTitle: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    flex: 1,
    marginHorizontal:hp('2%'),
  },
  profileImageContainer: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    borderWidth: 3,
    borderColor: '#FFB700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('10%'),
    resizeMode: 'cover',
  },
  profileImageText: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 1,
    marginLeft: wp('4%'),
    marginTop: hp('0.4%'),
    marginBottom: hp('0.4%'),
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
  },
  cardImage: {
    height: hp('6%'),
    width: wp('6%'),
    paddingTop: hp('1.75%'),
    paddingLeft: wp('0.6%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTextContainer: {
    flex: 1,

  },
  cardText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#361911',
  },
  cardArrowContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: wp('4%'),
  },
  verificationIcon: {
    flex: 1,
  },
  arrowImage: {
    height: hp('6%'),
    width: wp('6%'),
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










