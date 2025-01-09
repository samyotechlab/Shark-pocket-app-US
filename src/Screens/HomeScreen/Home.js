import {
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
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';
import MyGame from '../../Components/MyGame';
import UpcomingGame from '../../Components/UpcomingGame';
import CloseDialog from '../../Components/CloseDialog';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [myGame, setMyGames] = useState([]);
  const data = isReady && loginData && loginData?.data;
  const [refreshing, setRefreshing] = useState(false);
  // const [states, setState] = useState([])
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllData();
      setRefreshing(false);
    }, 2000);
  };

  const getAllData = async () => {
    setLoader(true);
    try {
      const response = await getGameData(data._id);
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
      // setState(response.data)
      checkCurrentState(response.data)
    } catch (error) {
      console.log("error", error)
    }
  }

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
    if (isReady) {
      stateList();
      getAllData();
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
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                  <Image source={sharkLogo} style={styles.logo} />
                </View>

                {/* Rupee Wallet Section */}
                <LinearGradient colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']} style={styles.walletContainer}>
                  <Image source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }} style={styles.walletIcon} />
                  <Text style={styles.walletText}>
                    ₹ {data?.total_balance || 0}
                  </Text>
                </LinearGradient>

                {/* Icons Section */}
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

            <View style={{ flex: 1.2, marginVertical: hp('2%') }}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 22,
                }}>
                <Image source={Lighting} style={styles.light} />
                <Text style={styles.myGame}>AVAILABLE GAMES</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AvailableGame', { gameData });
                  }}>
                  <Text style={styles.view}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1.5, marginTop: wp('2%'), marginLeft: hp('1%') }}>
                <AvailbleGameCard gameData={gameData} />
              </View>
            </View>

            <View style={{ flex: 0.8, margin: wp('2%') }}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: wp('4%'),
                }}>
                <Image source={Lighting} style={styles.light} />
                <Text style={styles.myGame}>UPCOMING GAMES</Text>
                <TouchableOpacity>
                  {/* <Text style={styles.view}>View All</Text> */}
                </TouchableOpacity>
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
    paddingLeft: hp('8%'),
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
