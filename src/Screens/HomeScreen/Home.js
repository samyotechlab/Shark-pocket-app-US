import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, BackHandler, Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { gameHistoryByUser, getGameData, getVersionData } from '../../Service/Home';
import { userDetail } from '../../Service/Login';
import Header from './Header';
import WinnerBanner from './WinnerBanner';
import GameSection from './GameSection';
import GameHistorySection from './GameHistorySection';
import AnimatedLoader from '../../Components/AnimatedLoader';
import CloseDialog from '../../Components/CloseDialog';
import MyGame from '../../Components/MyGame';
import AvailbleGameCard from '../../Components/AvailableGameCard';
import UpcomingGame from '../../Components/UpcomingGame';


export default function HomeScreen() {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [usersData, setUserData] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [version, setVersion] = useState({});
  const [gameHistory, setGameHistory] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const data = isReady && loginData?.data;
  const appVersion = DeviceInfo.getVersion();

  const refreshData = useCallback(() => {
    setRefreshing(true);
    setLoader(true);
    Promise.all([fetchUserData(), fetchGameData(), fetchHistoryData()])
      .then(() => setRefreshing(false))
      .finally(() => setLoader(false));
  }, []);

  const checkAppVersion = useCallback(async () => {
    try {
      const response = await getVersionData();
      setVersion(response.data);
      const os = Platform.OS;
      const storeUrl = os === 'android' 
        ? 'https://sharkpocket.in/'
        : 'https://apps.apple.com/app/idYOUR_APP_ID';
      const currentVersion = os === 'android' ? response.data.android : response.data.ios;

      if (currentVersion !== appVersion) {
        Alert.alert(
          'Update Available',
          'Newer version available. Please update it.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Update', onPress: () => Linking.openURL(storeUrl) },
          ],
        );
      }
    } catch (error) {
      console.log('Version check error:', error);
    }
  }, [appVersion]);

  const fetchUserData = useCallback(async () => {
    if (!data?._id) return;
    try {
      const response = await userDetail(data._id);
      if (response?.data) {
        setUserData({
          ...response.data,
          total_balance: parseFloat(response.data.total_balance || 0).toFixed(2),
          bonus_wallet: parseFloat(response.data.bonus_wallet || 0).toFixed(2),
          total_earning: parseFloat(response.data.total_earning || 0).toFixed(2),
        });
      } else {
        setUserData({});
      }
    } catch (error) {
      setUserData({});
    }
  }, [data]);

  const fetchGameData = useCallback(async () => {
    if (!data?._id) return;
    try {
      const response = await getGameData(data._id);
      setGameData(response?.data || []);
      setMyGames(response?.myGames || []);
      setBannerData(response?.banner || []);
    } catch (error) {
      console.log('Game data error:', error);
    }
  }, [data]);

  const fetchHistoryData = useCallback(async () => {
    if (!data?._id) return;
    try {
      const response = await gameHistoryByUser(data._id);
      setGameHistory(response.data || []);
    } catch (error) {
      console.log('Game history error:', error);
    }
  }, [data]);

  const memoizedDataFetch = useMemo(() => {
    if (isReady && loginData) {
      return Promise.all([fetchUserData(), fetchGameData(), fetchHistoryData()]);
    }
    return Promise.resolve();
  }, [isReady, loginData, fetchUserData, fetchGameData, fetchHistoryData]);

  useEffect(() => {
    checkAppVersion();
    if (isReady && loginData) {
      setLoader(true);
      memoizedDataFetch
        .then(() => setLoader(false))
        .catch(() => setLoader(false));
    } else {
      setLoader(true);
    }
  }, [isReady, loginData, memoizedDataFetch, checkAppVersion]);

  useFocusEffect(
    useCallback(() => {
      if (isReady && loginData) {
        memoizedDataFetch.catch((error) => console.log('Focus data fetch error:', error));
        const onBackPress = () => {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => backHandler.remove();
      }
    }, [isReady, loginData, memoizedDataFetch]),
  );

  const totalAmount = usersData
    ? parseFloat(usersData.total_balance || 0) +
      parseFloat(usersData.bonus_wallet || 0) +
      parseFloat(usersData.total_earning || 0)
    : 0;

  const availableGames = Array.isArray(gameData)
    ? gameData.filter((item) => item.status === 3)
    : [];

  const upcomingGames = Array.isArray(gameData)
    ? gameData.filter((item) => item.status === 1)
    : [];

  return (
    <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
      {loader ? (
        <AnimatedLoader />
      ) : (
        <>
          <Header 
            usersData={usersData} 
            totalAmount={totalAmount} 
            userId={data?._id} 
            navigation={navigation} 
          />
          <Divider color="#FFCE63" width={2.5} style={{ marginVertical: hp(0.2) }} />
          <ScrollView
            scrollEnabled={scrollEnabled}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}
          >
            <WinnerBanner data={bannerData} />
            <GameSection
              title="MY GAMES"
              data={myGames}
              component={MyGame}
              navigation={navigation}
              status="1"
              setScrollEnabled={setScrollEnabled}
            />
            <GameSection
              title="WEEKLY GAMES"
              data={availableGames}
              component={AvailbleGameCard}
              navigation={navigation}
              status="6"
              availability="3"
              setScrollEnabled={setScrollEnabled}
            />
            <GameSection
              title="DAILY GAMES"
              data={availableGames}
              component={AvailbleGameCard}
              navigation={navigation}
              status="5"
              availability="2"
              setScrollEnabled={setScrollEnabled}
            />
            <GameSection
              title="UPCOMING GAMES"
              data={upcomingGames}
              component={UpcomingGame}
              navigation={navigation}
              status="3"
              setScrollEnabled={setScrollEnabled}
            />
            <GameHistorySection
              data={gameHistory}
              navigation={navigation}
              setScrollEnabled={setScrollEnabled}
            />
          </ScrollView>
          <CloseDialog visible={visible} onClose={() => BackHandler.exitApp()} message={message} />
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    margin: hp('1%'),
  },
});