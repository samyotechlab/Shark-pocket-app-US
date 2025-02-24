import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import Person4 from '../../assets/images/Screens/Person4.jpeg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { leaderBoard, rangeShow } from '../Service/LeaderBoard';
import Toast from 'react-native-toast-message';
import { truncateName } from '../Utilities/utilies';
import AnimatedLoader from './AnimatedLoader';
import RangeInfoModal from './RangeInfoModal';
import CommonHeader from './CommonHeader';
import { gameHistoryUser } from '../Service/GameHistory';
import SelectedNumbers from '../Screens/GameScreens/SelectedNumbers';

export default function LocalGameBoard() {
  const route = useRoute();
  const { game_id } = route.params;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeData, setRangeData] = useState([])
  const [gameHistoryData, setGameHistory] = useState([]);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const leaderBoardData = async () => {
    setLoader(true);
    try {
      const response = await leaderBoard(game_id);
      console.log("responseeeeeee", response)
      if (response) {
        setGameData(response.data);
        setFilteredData(response.data);
      } else {
        const msg = response?.message;
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: msg,
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

  const allGameHistory = async (user_id, _id) => {
    setLoader(true)
    try {
      const response = await gameHistoryUser(user_id, game_id, _id);
      if (response) {
        setGameHistory(response?.data);
        navigation.navigate('GameFinishHistory', { gameHistoryData: response?.data })
      } else {
        const msg = response?.message || 'An unexpected error occurred.';
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: msg,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      const msg = error?.message || 'An unexpected error occurred.';
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

  const showRange = async () => {
    try {
      const response = await rangeShow(game_id)
      console.log("responser of the leader board", response.ranges)
      setRangeData(response.ranges)
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
      throw error;
    }
  }

  const handleTouch = (title) => {
    setSelectedTitle(title);
    setModalVisibles(true);
  };

  const data = [
    { id: '1', value: 'A',title:"Show Total Score Of Super Number - Desc"},
    { id: '2', value: 'B',title:"Show Total Super Number Selected - Desc" },
    { id: '3', value: 'C',title:"Show Total Prime Number Selected - Desc" },
    { id: '4', value: 'D',title:"Show Total Even Number Selected -ASc"},
  ];


  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Photo</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Name</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Score</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>Rank</Text>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.gameItem, { backgroundColor: 'rgba(255, 255, 255, 0.5)', }]} onPress={() => handleTouch(item.title)}>
                  <Text style={styles.headerText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Modal
  transparent
  visible={modalVisibles}
  animationType="fade"
  onRequestClose={() => setModalVisibles(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.smallModal}>
      <Text style={styles.modalText}>{selectedTitle}</Text>
      <TouchableOpacity
        onPress={() => setModalVisibles(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      </>
      
    )
  }

  const renderItem = items => {
    const { item } = items;
    console.log("item", item)

    return (
      <>
        <View style={{ flex: 1, paddingBottom: hp('0.5%') }}>
          <View style={styles.subHeaderContainer}>
            <View style={styles.headerItem}>
              <Image
                source={Person4}
                style={{ height: hp(3), width: wp(6), borderRadius: wp(3) }}
              />
            </View>
            <TouchableOpacity style={styles.headerItem} onPress={() => {
              allGameHistory(item?.user_id, item?._id)
            }}>
              <Text style={[styles.txt, { textDecorationLine: 'underline' }]}>{truncateName(item?.userName, 1)}</Text>
            </TouchableOpacity>
            <View style={styles.headerItem}>
              <Text style={styles.txt}>{item.score}</Text>
            </View>
            <View style={styles.headerItem}>
              <Text style={styles.txt1}>#{item.rank}</Text>
            </View>
            <View style={styles.flatListContainer}>
              <FlatList
                data={[
                  { key: 'super_score', value: item?.super_number?.score },
                  { key: 'super_selected', value: item?.super_number?.selected },
                  { key: 'prime', value: item?.prime_number?.selected },
                  { key: 'even', value: item?.even_number?.selected }
                ]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={[styles.gameItem]}>
                    <Text style={styles.headerText}>{item.value}</Text>
                  </TouchableOpacity>
                )}
              />
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
        <View style={{ flex: 0.15 }}>
          <CommonHeader title={'Leader Board'} />
        </View>
        <View style={{ flex: 0.1, margin: hp('2%'), marginTop: hp('1%'), flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: hp('1%'), borderRadius: hp('1%'), flexDirection: 'row', alignItems: 'center' }}>
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
          <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
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
            borderRadius: hp('2%'),
          }}>
          {renderHeader()}
          <SafeAreaView style={{ flex: 1.5, marginTop: hp('0.5%') }}>
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
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#361911',
    // paddingVertical: hp('1%'),
    // paddingHorizontal: wp('2%'),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  subHeaderContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  headerText: {
    fontSize: hp('1.5%'),
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  flatListContainer: {
    flex: 1.5,
  },
  gameItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1%'),
    marginHorizontal: hp('1%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),

  },
  modalOverlay: {
    position: 'absolute',
    top: hp('9%'),
    left: '70%',
    transform: [{ translateX: -wp('10%') }],
    width: wp('35%'),
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  smallModal: {
    width: wp('35%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  closeButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  
  closeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});
