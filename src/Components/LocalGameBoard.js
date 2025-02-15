import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import Person4 from '../../assets/images/Screens/Person4.jpeg';
import SearchField from './SearchField';
import { useNavigation, useRoute } from '@react-navigation/native';
import { leaderBoard } from '../Service/LeaderBoard';
import Toast from 'react-native-toast-message';
import { truncateName } from '../Utilities/utilies';
import AnimatedLoader from './AnimatedLoader';
import GameInfoModal from './GameInfoModal';

export default function LocalGameBoard() {
  const route = useRoute();
  const { game_id } = route.params;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const [firstRanking, setFirstRanking] = useState(null);
  // const [secondRanking, setSecondRanking] = useState(null);
  // const [thirdRanking, setThirdRanking] = useState(null);

  const handleNavigation = () => {
    navigation.goBack();
  };

  const leaderBoardData = async () => {
    setLoader(true);
    try {
      const response = await leaderBoard(game_id);
      if (response) {
        setGameData(response.data);
        setFilteredData(response.data);
      } else {
        const msg = response?.message;
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: { msg },
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: 'Authentication Failed',
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    leaderBoardData();
  }, []);

  const handleSearch = query => {
    if (!query) {
      setFilteredData(gameData);
    } else {
      const filtered = gameData.filter(
        item =>
          (item.user_name &&
            item.user_name.toLowerCase().includes(query.toLowerCase())) ||
          (item.ranking && item.ranking.toString().includes(query)),
      );
      setFilteredData(filtered);
    }
  };

  // useEffect(() => {
  //   if (gameData && gameData.length > 0) {
  //     const rakingData = () => {
  //       gameData.forEach(item => {
  //         if (item.ranking === 1) setFirstRanking(item);
  //         if (item.ranking === 2) setSecondRanking(item);
  //         if (item.ranking === 3) setThirdRanking(item);
  //       });
  //     };
  //     rakingData();
  //   }
  // }, [gameData]);

  const renderItem = items => {
    const { item } = items;

    return (
      <>
        <View style={{ flex: 1, paddingBottom: 10 }}>
          <View
            style={{
              flex: 1,
              width: wp('80%'),
              flexDirection: 'row',
              paddingBlock: 6,
            }}>
            <View style={{ flex: 0.4 }}>
              <Image
                source={Person4}
                style={{ height: hp(3), width: wp(6), borderRadius: wp(3) }}
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.txt}>{truncateName(item?.user_name, 1)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt}>₹{item.score}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt1}>#{item.ranking}</Text>
            </View>
          </View>
          <LinearGradient
            colors={['#999999', '#FFFFFF', '#999999']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 1,
              marginTop: 10,
              marginHorizontal: wp(2),
            }}
          />
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <GameInfoModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
        <View style={{ flex: 1, marginTop: wp('5%') }}>
          <View style={styles.leaderBoard}>
            <TouchableOpacity
              style={{ flex: 0.5, justifyContent: 'center' }}
              onPress={() => {
                handleNavigation();
              }}>
              <Iconics name="chevron-back" size={25} color={'white'} />
            </TouchableOpacity>
            <View style={{ flex: 3.5, justifyContent: 'center' }}>
              <SearchField onSearch={handleSearch} gameData={gameData}
                filteredData={filteredData} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('2%') }} onPress={() => {
          setModalVisible(true)
        }}>
          <Icon name={'info-with-circle'} size={30} color={'red'} />
        </TouchableOpacity>
        <View
          style={{
            flex: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            margin: wp('5%'),
            borderRadius: 15,
          }}>
          <SafeAreaView style={{ flex: 1, margin: wp('4%') }}>
            {gameData ? (
              !loader ? (
                <FlatList
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <AnimatedLoader />
              )
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data found</Text>
              </View>
            )}
          </SafeAreaView>
        </View>
      </LinearGradient>
      <Toast ref={Toast.setRef} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  leaderBoard: {
    flex: 1,
    flexDirection: 'row',
    padding: wp('4%'),
  },
  leaderTxt: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  txt: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.8%'),
  },
  txt1: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.8%'),
    width: wp('20%'),
    paddingLeft: wp('10%'),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transprent',
  },
  noDataText: {
    fontSize: wp('5%'),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
});
