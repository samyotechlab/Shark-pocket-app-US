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
import { leaderBoard, rangeShow } from '../Service/LeaderBoard';
import Toast from 'react-native-toast-message';
import { truncateName } from '../Utilities/utilies';
import AnimatedLoader from './AnimatedLoader';
import GameInfoModal from './GameInfoModal';
import RangeInfoModal from './RangeInfoModal';
import CommonHeader from './CommonHeader';
import { gameHistoryUser } from '../Service/GameHistory';

export default function LocalGameBoard() {
  const route = useRoute();
  const { game_id } = route.params;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeData,setRangeData] = useState([])
  const [gameHistoryData, setGameHistory] = useState([]);
  

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

    const allGameHistory = async (user_id,_id) => {
      setLoader(true)
      try {
        const response = await gameHistoryUser(user_id, game_id,_id);
        if (response) {
          setGameHistory(response?.data);
          navigation.navigate('GameFinishHistory',{gameHistoryData:response?.data})
        } else {
          msg = response?.message || 'An unexpected error occurred.';
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error!',
            text2: msg,
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        msg = error?.message || 'An unexpected error occurred.';
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: msg,
          visibilityTime: 3000,
        });
      }
      finally {
        setLoader(false)
      }
    };

  // const handleSearch = query => {
  //   if (!query) {
  //     setFilteredData(gameData);
  //   } else {
  //     const filtered = gameData.filter(
  //       item =>
  //         (item.user_name &&
  //           item.user_name.toLowerCase().includes(query.toLowerCase())) ||
  //         (item.ranking && item.ranking.toString().includes(query)),
  //     );
  //     setFilteredData(filtered);
  //   }
  // };

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

  const showRange = async ()=>{
    try {
      const response = await rangeShow(game_id)
      console.log("responser of the leader board",response.ranges)
      setRangeData(response.ranges)
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  }

  const renderItem = items => {
    const { item } = items;

    return (
      <>
        <View style={{ flex: 1, paddingBottom: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingBlock: 6,
            }}>
            <View style={{ flex: 0.4 }}>
              <Image
                source={Person4}
                style={{ height: hp(3), width: wp(6), borderRadius: wp(3) }}
              />
            </View>
            <TouchableOpacity style={{ flex: 1.2 }} onPress={()=>{
              allGameHistory(item?.user_id,item?._id)
            }}>
              <Text style={[styles.txt,{textDecorationLine:'underline'}]}>{truncateName(item?.userName, 1)}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt}>{item.score}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
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
      <RangeInfoModal visible={modalVisible} onClose={() => setModalVisible(false)} rangeData={rangeData} />

      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
        <View style={{flex:0.15}}>
            <CommonHeader title={'Leader Board'}/>
            </View>
          <View style={{flex:0.1,margin:hp('2%'),marginTop:hp('1%'),flexDirection:'row'}}>
            <View style={{flex:1,backgroundColor:'rgba(255, 255, 255, 0.5)',margin:hp('1%'),borderRadius:hp('1%'),flexDirection: 'row',alignItems:'center'}}>
            <View style={{ flex: 0.4 }}>
              <Image
                source={Person4}
                style={{ height: hp(3), width: wp(6), borderRadius: wp(3) }}
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.txt}>Manoj</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt}>566.3</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt1}>#1</Text>
            </View>
            </View>
        <TouchableOpacity style={{ flex: 0.1,justifyContent:'center',alignItems:'center'}} onPress={() => {
          setModalVisible(true)
          showRange()
        }}>
          <Icon name={'info-with-circle'} size={30} color={'red'} />
        </TouchableOpacity>
          </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            // margin: wp('5%'),
            borderRadius: 15,
          }}>
          <SafeAreaView style={{ flex: 1, margin: wp('2%') }}>
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
    flex: 0.1,
    flexDirection: 'row',
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
