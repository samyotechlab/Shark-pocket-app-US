import {
  Alert,
  BackHandler,
  Image,
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
import wheel from '../../../assets/images/Screens/wheel.png';
import { Divider } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WinnerCard from '../../Components/WinnerCard';
import Lighting from '../../../assets/images/Screens/Lighting.png';
import AvailbleGameCard from '../../Components/AvailableGameCard';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { getGameData, state } from '../../Service/Home';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';
import MyGame from '../../Components/MyGame';
import UpcomingGame from '../../Components/UpcomingGame';
import CloseDialog from '../../Components/CloseDialog';
import { userDetail } from '../../Service/Login';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [myGame, setMyGames] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [usersData,setUserData] = useState({})

  const data = isReady && loginData && loginData?.data;


  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllData();
      setRefreshing(false);
    }, 2000);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllData();
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [loginData]),
  );


  const getAllData = async (loginData) => {
    setLoader(true);
    try {
      const response = await getGameData(loginData?loginData?._id:data?._id);
      setMyGames(response.myGames);
      setGameData(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  const stateList = async () => {
    try {
      const response = await state();
      checkCurrentState(response.data)
    } catch (error) {
      console.log("error", error)
    }
  }

      const userData = async () => {
      setLoader(true);
      try {
        const response = await userDetail(data?._id);
        const formattedData = {
          ...response.data,
          total_balance: parseFloat(response.data.total_balance).toFixed(2),
          bonus_wallet: parseFloat(response.data.bonus_wallet).toFixed(2),
        };
        setUserData(formattedData);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoader(false);
      }
    };

  async function checkCurrentState(states) {
    try {
      const response = await fetch("http://ip-api.com/json");
      const data = await response.json();
      const currentState = data.regionName;
      const isStateInList = states.some((state) => state.name === currentState);
      if (!isStateInList) {
        setVisible(true);
        setMessage(`The current state (${currentState}) is NOT in the state list.`)
      }
    } catch (error) {
      console.error("Error fetching current state:", error);
    }
  }

  useEffect(() => {
    if (isReady&&loginData) {
      stateList();
      userData();
      getAllData(loginData?.data);
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);
  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        {!loader ? (
          <>
            <View style={{ backgroundColor: '#552113' }}>
              <View style={styles.container}>
              
                <View style={styles.logoContainer}>
                  <Image source={sharkLogo} style={styles.logo} />
                </View>

        
                <LinearGradient colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']} style={styles.walletContainer}>
                  <Image source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }} style={styles.walletIcon} />
                  <Text style={styles.walletText}>
                    ₹ {usersData?.total_balance || 0}
                  </Text>
                </LinearGradient>

              
                <View style={styles.iconsContainer}>
                  <Image source={bell} style={styles.icon} />
                  <Image source={wheel} style={styles.icon} />
                </View>
              </View>
            </View>
            <Divider color="#FFCE63" width={2.5} style={{ marginVertical: wp(0.2) }} />
            <View style={{ flex: 1, margin: wp('2%'), marginVertical: hp('2%') }}>
              <WinnerCard data={data} />
            </View>

            {myGame.length > 0 && (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 22,
                  }}>
                  <Image source={Lighting} style={styles.light} />
                  <Text style={styles.myGame}>MY GAME</Text>
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row', marginTop: 10 }}>
                  <MyGame myGame={myGame} />
                </View>
              </View>
            )}

            <View style={{ flex: 1.2,marginVertical:hp('2%')}}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
               <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',marginLeft:hp('1.5%')}}>
                <Image source={Lighting} style={styles.light} />
                <Text style={styles.myGame}>AVAILABLE GAMES</Text>
                </View>
                <TouchableOpacity
                style={{flex:0.5,alignItems:'flex-end',marginRight:hp('1%')}}
                  onPress={() => {
                    navigation.navigate('AvailableGame', { gameData });
                  }}
                  >
                  <Text style={styles.view}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1.5, marginTop: wp('2%'), marginLeft: hp('1%') }}>
                <AvailbleGameCard gameData={gameData} />
              </View>
            </View>

            <View style={{ flex: 0.8 }}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: wp('4%'),
                }}>
                <Image source={Lighting} style={styles.light} />
                <Text style={styles.myGame}>UPCOMING GAMES</Text>
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                <UpcomingGame gameData={gameData} />
              </View>
            </View>
          </>
        ) : (
          <AnimatedLoader />
        )}
      </ScrollView>
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
    fontSize: wp('5%'),
    paddingLeft: hp('1%'),
  },
  view: {
    color: '#FFB700',
    fontFamily: 'Montserrat-Bold',
    textDecorationLine: 'underline',

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    marginTop: hp('3%'),
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp('5%'),
    width: wp('10%'),
    resizeMode: 'contain',
  },
  walletContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('1%'),
    marginLeft: hp('5%'),
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
    flex: 1,
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
