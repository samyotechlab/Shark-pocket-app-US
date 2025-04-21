import {
  Alert,
  BackHandler,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import sharkLogo from '../../../assets/images/Screens/sharkLogo.png';
import bell from '../../../assets/images/Screens/bell.png';
import { Divider } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WinnerCard from '../../Components/WinnerCard';
import Lighting from '../../../assets/images/Screens/Lighting.png';
import AvailbleGameCard from '../../Components/AvailableGameCard';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { gameHistoryByUser, getGameData, getVersionData } from '../../Service/Home';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';
import MyGame from '../../Components/MyGame';
import UpcomingGame from '../../Components/UpcomingGame';
import CloseDialog from '../../Components/CloseDialog';
import { userDetail } from '../../Service/Login';
import GameHistory from '../../Components/GameHistory';
import shark from '../../../assets/images/Applogo/Sharkpocket1.png'
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [myGame, setMyGames] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [usersData, setUserData] = useState({})
  const [bannerData, setBannerData] = useState([]);
  const [version, setVersion] = useState({})
  const [gameHistory, setGameHistory] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const data = isReady && loginData && loginData?.data;
  const os = Platform.OS;
  const appVersion = DeviceInfo.getVersion();

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      userData();
      getAllData();
      getHistoryData();
      setRefreshing(false);
    }, 2000);
  };
  const getVesion = async () => {
    try {
      const response = await getVersionData();
      console.log("response",response)
      setVersion(response.data)
      if (os === 'android') {
        if (response.data.android !== appVersion) {
          Alert.alert(
            "Update Available",
            "Newer version available. Please update it.",
            [
              {
                text: "Update",
                onPress: () => Linking.openURL("https://sharkpocket.in/")
              }
            ]
          );
        }
      } else if (os === "ios") {
        if (response.data.ios !== appVersion) {
          Alert.alert(
            "Update Available",
            "Newer version available. Please update it.",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Update",
                onPress: () => Linking.openURL("https://apps.apple.com/app/idYOUR_APP_ID")
              }
            ]
          );
        }
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    getVesion();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      if (isReady && loginData) {
        userData();
        getAllData();
        getHistoryData();
        const onBackPress = () => {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => backHandler.remove();
      }
      }, [loginData]),
  );

  const getAllData = async (loginData) => {
    setLoader(true);
    try {
      const response = await getGameData(loginData ? loginData?._id : data?._id)
      console.log("response?.data",response?.data)
      setMyGames(response?.myGames);
      setGameData(response?.data);
      setBannerData(response?.banner);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  const getHistoryData = async (loginData) => {
    setLoader(true);
    try {
      const response = await gameHistoryByUser(loginData ? loginData?._id : data?._id)
      setGameHistory(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  const AvailableGame = Array.isArray(gameData)
    ? gameData.filter((item) => item.status === 3)
    : [];

  const UpcomingGames = Array.isArray(gameData)
    ? gameData.filter((item) => item.status === 1)
    : [];

  const userData = async (loginData) => {
    setLoader(true);
    try {
      const response = await userDetail(loginData ? loginData?._id : data?._id);
      const formattedData = {
        ...response.data,
        total_balance: parseFloat(response?.data?.total_balance || 0).toFixed(2),
        bonus_wallet: parseFloat(response?.data?.bonus_wallet || 0).toFixed(2),
        total_earning: parseFloat(response?.data?.total_earning || 0).toFixed(2),
      };
      setUserData(formattedData);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (isReady && loginData) {
      userData(loginData?.data);
      getAllData(loginData?.data);
      getHistoryData(loginData?.data);
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);
  const totalAmount =
    parseFloat(usersData?.total_balance || 0) +
    parseFloat(usersData?.bonus_wallet || 0) +
    parseFloat(usersData?.total_earning || 0);
  return (

    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      {!loader ? (
        <>
          <View style={{ backgroundColor: '#552113' }}>
            <View style={styles.container}>

              <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('ViewProfile', { usersData: usersData, status: 1 })}>
                <Image source={sharkLogo} style={styles.logo} />
              </TouchableOpacity>

              <View style={styles.logo1Container} >
                <Image source={shark} style={styles.logo} />
              </View>


              <LinearGradient colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']} style={styles.walletContainer}>
                <Image source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }} style={styles.walletIcon} />
                <Text style={styles.walletText}>
                  ₹ {totalAmount.toFixed(2) || 0}
                </Text>
              </LinearGradient>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Notification') }}>
                  <Image source={bell} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider color="#FFCE63" width={2.5} style={{ marginVertical: wp(0.2) }} />

          <ScrollView
            scrollEnabled={scrollEnabled}
            contentContainerStyle={{ flexGrow: 1, margin: hp('1%') }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
            }
          >

            <View style={{ flex: 1, marginTop: hp('1%') }}>
              <WinnerCard data={bannerData} />
            </View>

            <>
              {Array.isArray(myGame) && myGame.length > 0 ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Image source={Lighting} style={styles.light} />
                      <Text style={styles.myGame}>MY GAMES</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('AvailableGame', { gameData: myGame, status: "1" });
                      }}
                    >
                      <Text style={styles.view}>View All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5, flexDirection: 'row' }}>
                    <MyGame myGame={myGame} />
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1 }}>

                </View>
              )}
            </>

            {/* {
              Array.isArray(AvailableGame) && AvailableGame.length > 0 ? (
                <View style={{ flex: 1, marginTop: hp('1%') }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Image source={Lighting} style={styles.light} />
                      <Text style={styles.myGame}>AVAILABLE GAMES</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('AvailableGame', { gameData, status: "2" });
                      }}
                    >
                      <Text style={styles.view}>View All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5 }}>
                    <AvailbleGameCard gameData={gameData} availability="1" setScrollEnabled={setScrollEnabled} />
                  </View>
                </View>
              ) : (
                <AnimatedLoader />
              )
            } */}

            {
              Array.isArray(AvailableGame) && AvailableGame.length > 0 ? (
                <View style={{ flex: 1, marginTop: hp('1%') }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Image source={Lighting} style={styles.light} />
                      <Text style={styles.myGame}>WEEKLY GAMES</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('AvailableGame', { gameData, status: "6" });
                      }}
                    >
                      <Text style={styles.view}>View All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5, marginLeft: hp('0.7%') }}>
                    <AvailbleGameCard gameData={gameData} availability="3" setScrollEnabled={setScrollEnabled} />
                  </View>
                </View>
              ) : (
                <AnimatedLoader />
              )
            }
            {
              Array.isArray(AvailableGame) && AvailableGame.length > 0 ? (
                <View style={{ flex: 1, marginTop: hp('1%') }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Image source={Lighting} style={styles.light} />
                      <Text style={styles.myGame}>DAILY GAMES</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('AvailableGame', { gameData, status: "5" });
                      }}
                    >
                      <Text style={styles.view}>View All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5, marginLeft: hp('0.7%') }}>
                    <AvailbleGameCard gameData={gameData} availability="2" setScrollEnabled={setScrollEnabled} />
                  </View>
                </View>
              ) : (
                <AnimatedLoader />
              )
            }



            {
              Array.isArray(UpcomingGames) && UpcomingGames.length > 0 ? (
                <View style={{ flex: 1, marginTop: hp('1%') }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                      <Image source={Lighting} style={styles.light} />
                      <Text style={styles.myGame}>UPCOMING GAMES</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}
                      onPress={() => {
                        navigation.navigate('AvailableGame', { gameData, status: "3" });
                      }}
                    >
                      <Text style={styles.view}>View All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1.5, flexDirection: 'row' }}>
                    <UpcomingGame gameData={gameData} />
                  </View>
                </View>
              ) : (<View style={{ flex: 1 }}>

              </View>)
            }

            {
              gameHistory.length > 0 && (
                <View style={{ flex: 1, marginTop: hp('1%') }}>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <Image source={Lighting} style={styles.light} />
                    <Text style={styles.myGame}>GAME HISTORY</Text>
                  </View>
                  <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}
                    onPress={() => {
                      navigation.navigate('AvailableGame', { gameData: gameHistory, status: "4" });
                    }}
                  >
                    <Text style={styles.view}>View All</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row' }}>
                  <GameHistory gameData={gameHistory} />
                </View>
              </View>
              )
            }
          </ScrollView>
        </>


      ) : (
        <AnimatedLoader />
      )}

      <CloseDialog visible={visible} onClose={() => BackHandler.exitApp()} message={message} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  light: {
    paddingLeft: hp('1%'),
  },
  myGame: {
    color: '#FFB700',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('3.5%'),
    paddingLeft: hp('1%'),
  },
  view: {
    color: '#FFB700',
    fontFamily: 'Montserrat-Bold',
    textDecorationLine: 'underline',
    fontSize: wp('3%'),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    marginTop: hp('3%'),
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#361911',
  },
});
