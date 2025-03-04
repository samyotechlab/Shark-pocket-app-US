import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
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
import Person4 from '../../assets/images/Screens/Person4.jpeg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { leaderBoard, rangeShow } from '../Service/LeaderBoard';
import Toast from 'react-native-toast-message';
import RangeInfoModal from './RangeInfoModal';
import CommonHeader from './CommonHeader';
import { gameHistoryUser } from '../Service/GameHistory';

export default function LocalGameBoard() {
  const route = useRoute();
  const { game_id, user_id } = route.params;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeData, setRangeData] = useState([])
  const [gameHistoryData, setGameHistory] = useState([]);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  const headerScrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowScrollRefs = useRef({});

  const handleHeaderScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollPosition(offsetX);
    Object.values(rowScrollRefs.current).forEach((ref) => {
      if (ref) {
        ref.scrollTo({ x: offsetX, animated: false });
      }
    });
  };
  const handleRowScroll = (event, rowId) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollPosition(offsetX);
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollTo({ x: offsetX, animated: false });
    }
    Object.entries(rowScrollRefs.current).forEach(([id, ref]) => {
      if (id !== rowId && ref) {
        ref.scrollTo({ x: offsetX, animated: false });
      }
    });
  };

  const leaderBoardData = async () => {
    setLoader(true);
    try {
      const response = await leaderBoard(game_id);
      if (response) {
        const filteredData = response.data.filter(item => item.user_id == user_id);
        const unFilterData = response.data.filter(item => item.user_id != user_id);
        setGameData(unFilterData);
        setFilteredData(filteredData);
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

  const showRange = async () => {
    try {
      const response = await rangeShow(game_id)
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

  const headers = [
    { key: 'Rank', label: 'Rank' },
    { key: 'Total Prime Number Selected - DESC', label: 'A' },
    { key: 'Total Super Number Selected - DESC', label: 'B' },
    { key: 'Total Super Number Score - DESC', label: 'C' },
    { key: 'Total Even Number Selected - ASC', label: 'D' },

  ];


  const renderRow = ({ item }) => {
    const rowRef = (ref) => (rowScrollRefs.current[item.id] = ref);
    return (
      <View style={styles.row}>
        <View style={styles.fixedColumns}>
          <Image source={Person4} style={styles.image} />
             <TouchableOpacity onPress={() => allGameHistory(item.user_id, item._id)}>
            <Text style={[styles.cell, { width: 100, textDecorationLine: 'underline' }]}>{item.userName}</Text>
           </TouchableOpacity>
          <Text style={styles.cell}>{item.score}</Text>
        </View>
        <ScrollView
          horizontal
          ref={rowRef}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollableColumns}
          onScroll={(e) => handleRowScroll(e, item.id)}
          scrollEventThrottle={16}
          contentOffset={{ x: scrollPosition, y: 0 }}
          contentContainerStyle={  { justifyContent:'center'}}
        >
          <Text style={styles.cell}>#{item.rank}</Text>
          <Text style={styles.cell}>{item?.prime_number?.selected}</Text>
          <Text style={styles.cell}>{item?.super_number?.selected}</Text>
          <Text style={styles.cell}>{item?.super_number?.score}</Text>
          <Text style={styles.cell}>{item?.super_number?.score}</Text>
        </ScrollView>
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
          <CommonHeader title={'Leader Board'} />
          <TouchableOpacity style={{ position: 'absolute', top: hp('6%'), right: hp('1%') }} onPress={() => {
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
          }}>

          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.fixedColumns}>
                <Text style={styles.headerCell}>Image</Text>
                <Text style={styles.headerCell}>Username</Text>
                <Text style={styles.headerCell}>Points</Text>
              </View>
              <ScrollView
                horizontal
                ref={headerScrollRef}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollableColumns}
                onScroll={handleHeaderScroll}
                scrollEventThrottle={16}
                contentOffset={{ x: scrollPosition, y: 0 }}
                contentContainerStyle={  { justifyContent:'center'}}
              >
                <Text style={styles.headerCell}>Rank</Text>
                <Text style={styles.headerCell}>A</Text>
                <Text style={styles.headerCell}>B</Text>
                <Text style={styles.headerCell}>C</Text>
                <Text style={styles.headerCell}>D</Text>
              </ScrollView>
            </View>
            {
              filteredData.map((item, index) => {
                const rowRef = (ref) => (rowScrollRefs.current[item.id] = ref)
                return (
                  <View style={[styles.row,{ backgroundColor: "white", opacity: 0.7 }]}>
                  <View style={styles.fixedColumns}>
                    <Image source={Person4} style={styles.image} />
                       <TouchableOpacity onPress={() => allGameHistory(item.user_id, item._id)}>
                      <Text style={[styles.cel, { width: 100, textDecorationLine: 'underline' }]}>{item.userName}</Text>
                     </TouchableOpacity>
                    <Text style={styles.cel}>{item.score}</Text>
                  </View>
                  <ScrollView
                    horizontal
                    ref={rowRef}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollableColumns}
                    onScroll={(e) => handleRowScroll(e, item.id)}
                    scrollEventThrottle={16}
                    contentOffset={{ x: scrollPosition, y: 0 }}
                    contentContainerStyle={  { justifyContent:'center'}}
                  >
                    <Text style={styles.cel}>#{item.rank}</Text>
                    <Text style={styles.cel}>{item?.prime_number?.selected}</Text>
                    <Text style={styles.cel}>{item?.super_number?.selected}</Text>
                    <Text style={styles.cel}>{item?.super_number?.score}</Text>
                    <Text style={styles.cel}>{item?.super_number?.score}</Text>
                  </ScrollView>
                </View>
                )

              })
            }
            <FlatList
              data={gameData}
              keyExtractor={(item) => item.id}
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
    paddingVertical: hp('1.5%'),
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: hp('1.5%'),
    paddingHorizontal:hp('1.2%')
  },
  fixedColumns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    width: wp('50%'),
  },
  scrollableColumns: {
    flexDirection: "row",
    width: wp('10%'),
  },
  cell: {
    width: wp('20%'),
    textAlign: "center",
    fontFamily: 'Montserrat-SemiBold',
    color: "white",
    fontSize:hp('1.5%'),
  },
  headerCell: {
    width: wp('19%'),
    color: "white",
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    fontSize:hp('1.5%'),
  },
  cel: {
    width: wp('20%'),
    textAlign: "center",
    fontFamily: 'Montserrat-SemiBold',
    color: "#361911",
    fontSize:hp('1.5%'),
  },
});

