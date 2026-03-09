import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import Person4 from '../../assets/images/Screens/avatar.webp';
import { useNavigation, useRoute } from '@react-navigation/native';
import { leaderBoard, rangeShow } from '../Service/LeaderBoard';
import Toast from 'react-native-toast-message';
import RangeInfoModal from './RangeInfoModal';
import CommonHeader from './CommonHeader';
import { gameHistoryUser } from '../Service/GameHistory';

// Create Animated FlatList component
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function LocalGameBoard() {
  const route = useRoute();
  const { game_id, user_id,screen_name } = route.params;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeData, setRangeData] = useState([]);
  const [gameHistoryData, setGameHistory] = useState([]);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const headerScrollRef = useRef(null);
  // Initialize rowScrollRefs as a ref containing a Map
  const rowScrollRefs = useRef(new Map());
  const scrollX = useRef(new Animated.Value(0)).current;
  const isScrolling = useRef(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        if (!isScrolling.current) {
          isScrolling.current = true;
          syncScroll(nativeEvent.contentOffset.x);
          setTimeout(() => {
            isScrolling.current = false;
          }, 50); // Debounce to prevent excessive updates
        }
      },
    }
  );

  const syncScroll = (offsetX) => {
    const scrollOptions = { offset: offsetX, animated: false };
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollToOffset(scrollOptions);
    }
    rowScrollRefs.current.forEach((ref) => {
      if (ref) {
        ref.scrollToOffset(scrollOptions);
      }
    });
  };

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      if (!isScrolling.current) {
        syncScroll(value);
      }
    });
    return () => scrollX.removeListener(listener);
  }, []);

  const leaderBoardData = async () => {
    setLoader(true);
    try {
      const response = await leaderBoard(game_id);
      if (response) {
        const filteredData = response.data.filter(item => item.user_id == user_id);
        const unFilterData = response.data.filter(item => item.user_id != user_id);
        setGameData(unFilterData);
        setFilteredData(filteredData);
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

  const allGameHistory = async (user_id, _id, name) => {
    setLoader(true);
    try {
      const response = await gameHistoryUser(user_id, game_id, _id);
      if (response) {
        setGameHistory(response?.data);
        navigation.navigate('GameFinishHistory', { gameHistoryData: response?.data, user_name: name });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: error.message || 'An unexpected error occurred.',
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  const showRange = async () => {
    try {
      const response = await rangeShow(game_id);
      setRangeData(response.ranges);
    } catch (error) {
      console.error('Error fetching Data', error.message || error);
    }
  };

  const titles = {
    A: 'Total Super Number Selected',
    B: 'Total Even Number Selected',
    C: 'Total Prime Number Selected',
    D: 'Total Super Number Score',
  };

  const handleTouch = (key) => {
    if (titles[key]) {
      setSelectedTitle(titles[key]);
      setModalVisibles(true);
    }
  };

  const renderRow = ({ item }) => {
    const rowRef = (ref) => {
      if (ref) {
        rowScrollRefs.current.set(item.id || item._id || `row-${Math.random()}`, ref); // Ensure unique key
      }
    };

    return (
      <View style={styles.row}>
        <View style={styles.fixedColumns}>
          <Image source={Person4} style={styles.image} />
          <TouchableOpacity onPress={() => allGameHistory(item.user_id, item._id, item.userName)}>
            <Text style={[styles.cell, { width: 100, textDecorationLine: 'underline' }]}>{item.userName}</Text>
            {parseInt(item.winning_amount) > 0 && (
              <Text style={[styles.cel, { width: 100, fontSize: 11, color: 'green', marginTop: 5 }]}>
                Winnings : {parseInt(item.winning_amount)}
              </Text>
            )}
          </TouchableOpacity>
          <Text style={styles.cell}>{item.score}</Text>
        </View>
        <AnimatedFlatList
          ref={rowRef}
          horizontal
          data={[
            { key: 'rank', value: `#${item.rank}` },
            { key: 'prime', value: item?.prime_number?.selected || item.A },
            { key: 'super_sel', value: item?.super_number?.selected || item.B },
            { key: 'super_score', value: item?.super_number?.score || item.C },
            { key: 'even', value: item?.super_number?.score || item.D },
          ]}
          renderItem={({ item }) => <Text style={styles.cell}>{item.value}</Text>}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RangeInfoModal visible={modalVisible} onClose={() => setModalVisible(false)} rangeData={rangeData} />
      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
        <View style={{ flex: 0.15 }}>
          <CommonHeader title={'Leader Board'} screen_name={screen_name}/>
          <TouchableOpacity
            style={{ position: 'absolute', top: hp('6%'), right: hp('1%') }}
            onPress={() => {
              setModalVisible(true);
              showRange();
            }}>
            <Icon name={'info-with-circle'} size={30} color={'red'} />
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.fixedColumns}>
                <Text style={[styles.headerCell, { width: wp('20%') }]}>Image</Text>
                <Text style={[styles.headerCell, { width: wp('20%') }]}>Username</Text>
                <Text style={[styles.headerCell, { width: wp('20%') }]}>Points</Text>
              </View>
              <View style={{ flex: 1, marginLeft: hp('1%') }}>
                <AnimatedFlatList
                  ref={headerScrollRef}
                  horizontal
                  data={[
                    { key: 'rank', value: 'Rank' },
                    { key: 'A', value: 'A' },
                    { key: 'B', value: 'B' },
                    { key: 'C', value: 'C' },
                    { key: 'D', value: 'D' },
                  ]}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      disabled={item.key === 'rank'}
                      onPress={() => handleTouch(item.key)}
                      style={item.key === 'rank' ? styles.scrollableColumns : [styles.scrollableColumns, { backgroundColor: '#FFFFFF80' }]}
                    >
                      <Text style={styles.headerCell}>{item.value}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.key}
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  decelerationRate="fast"
                  bounces={false}
                  overScrollMode="never"
                />
              </View>
            </View>

            {filteredData.map((item, index) => {
              const rowRef = (ref) => {
                if (ref) {
                  rowScrollRefs.current.set(item?.id || item?._id || `filtered-${index}`, ref); // Unique key for filtered rows
                }
              };
              return (
                <View style={[styles.row, { backgroundColor: "white", opacity: 0.5 }]} key={index}>
                  <View style={styles.fixedColumns}>
                    <Image source={Person4} style={styles.image} />
                    <TouchableOpacity onPress={() => allGameHistory(item?.user_id, item?._id, item?.userName)}>
                      <Text style={[styles.cel, { width: 100, textDecorationLine: 'underline' }]}>{item?.userName}</Text>
                      {item.winning_amount > 0 && (
                        <Text style={[styles.cel, { width: 100, fontSize: 11, color: 'green', marginTop: 5 }]}>
                          Winnings : {item.winning_amount}
                        </Text>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.cel}>{item.score}</Text>
                  </View>
                  <AnimatedFlatList
                    ref={rowRef}
                    horizontal
                    data={[
                      { key: 'rank', value: `#${item?.rank}` },
                      { key: 'prime', value: item?.prime_number?.selected },
                      { key: 'super_sel', value: item?.super_number?.selected },
                      { key: 'super_score', value: item?.super_number?.score },
                      { key: 'even', value: item?.super_number?.score },
                    ]}
                    renderItem={({ item }) => <Text style={styles.cel}>{item.value}</Text>}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    bounces={false}
                    overScrollMode="never"
                  />
                </View>
              );
            })}

            <FlatList
              data={gameData}
              keyExtractor={(item) => item.id || item._id || `game-${Math.random()}`} 
              renderItem={renderRow}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </LinearGradient>
      <Toast ref={Toast.setRef} />

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
  headerContainer: {
    flex: 1,
  },
  image: {
    width: hp('3%'),
    height: hp('3%'),
    marginHorizontal: 5,
    borderRadius: hp('3%') / 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: hp('3%'),
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
  header: {
    backgroundColor: "#361911",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderTopWidth: 1,
    borderTopColor: "white",
    flexDirection: "row",
    height: 50
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.2%'),
  },
  fixedColumns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    width: wp('55%'),
  },
  scrollableColumns: {
    width: wp('15%'),
    borderRadius: hp('1%'),
    marginHorizontal: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: wp('20%'),
    textAlign: "center",
    fontFamily: 'Montserrat-SemiBold',
    color: "white",
    fontSize: hp('1.5%'),
  },
  headerCell: {
    color: "white",
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.5%'),
  },
  cel: {
    width: wp('20%'),
    textAlign: "center",
    fontFamily: 'Montserrat-SemiBold',
    color: "black",
    fontSize: hp('1.5%'),
  },
});