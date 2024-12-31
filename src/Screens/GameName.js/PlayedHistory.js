import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import trophy from '../../../assets/images/Screens/trophy2.png'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import Toast from 'react-native-toast-message';
import { gameHistory, historyData } from '../../Service/GameHistory';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';

const PlayedHistory = () => {
  const [loader, setLoader] = useState(false)
  const { loginData, isReady } = useLoginDataStorage()
  const [gameHistoryData, setGameHistory] = useState([]);
  const data = isReady && loginData && loginData?.data
  const navigation = useNavigation()
  const route = useRoute()
  const { game_id } = route.params
  let msg

  const allGameHistory = async () => {
    setLoader(true)
    try {
      const response = await gameHistory(data._id, game_id);
      if (response) {
        setGameHistory(response?.data);

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

  useEffect(() => {
    if (isReady) {
      allGameHistory();
    } else {
      setLoader(true)
    }
  }, [isReady, loginData])

  const renderItem = ({ item }) => {
    // console.log("iotem",item)
    return (
      <>
        <View style={styles.container1} >
          <TouchableOpacity style={styles.cardOuterContainer} onPress={() => {
            navigation.navigate('GameFinishHistory', { gameHistoryData: item })
          }}>
            <LinearGradient
              colors={['#F38424', '#F7A552', '#F9D479']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0.8, y: 1 }}
              style={styles.cardContainer}>
              {/* Trophy Icon */}
              <Image
                source={trophy}
                style={styles.trophyIcon}
              />

              {/* Details Section */}
              <View style={styles.detailsContainer}>
                <Text style={styles.titleText}>Played On</Text>
                <View style={styles.dateTimeRow}>
                  <Text style={styles.dateText}>{item.game_played_at}</Text>
                  {/* <Text style={styles.timeText}>02:23 Pm</Text> */}
                </View>
              </View>

              {/* Score */}
              <Text style={styles.scoreText}>{item.score}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  return (

    <View style={styles.container}>
      {
        !loader ? (<FlatList
          data={gameHistoryData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />) : (<AnimatedLoader />)
      }

    </View>

  );
};

const styles = StyleSheet.create({
  cardOuterContainer: {
    backgroundColor: '#F2E30B',
    borderRadius: wp('3%'),
    padding: wp('1%'),
  },
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    margin: wp('1%')
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  trophyIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginRight: wp('2%'),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: '#2A1610',
    fontSize: wp('4.5%'),
    fontFamily: 'Audiowide-Regular',
    marginBottom: hp('0.5%'),
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#000000B2',
    fontSize: wp('3.5%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  timeText: {
    color: '#000',
    fontSize: wp('3.5%'),
  },
  scoreText: {
    color: '#2A1610',
    fontSize: wp('6%'),
    fontFamily: 'Audiowide-Regular',
  },
});

export default PlayedHistory;
