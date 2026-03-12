import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import trophy from '../../../assets/images/Screens/trophy2.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import Toast from 'react-native-toast-message';
import { gameHistory } from '../../Service/GameHistory';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';

const CARD_RADIUS   = wp('4%');
const BORDER_WIDTH  = 2;         
const INNER_RADIUS  = CARD_RADIUS - BORDER_WIDTH;

const PlayedHistory = () => {
  const [loader,          setLoader]       = useState(false);
  const [gameHistoryData, setGameHistory]  = useState([]);
  const [refreshing,      setRefreshing]   = useState(false);

  const { loginData, isReady } = useLoginDataStorage();
  const data       = isReady && loginData && loginData?.data;
  const navigation = useNavigation();
  const route      = useRoute();
  const { game_id, title } = route.params;

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      allGameHistory();
      setRefreshing(false);
    }, 2000);
  };

  const allGameHistory = async () => {
    setLoader(true);
    try {
      const response = await gameHistory(data._id, game_id);
      if (response) {
        setGameHistory(response?.data || []);
      } else {
        Toast.show({
          type:           'error',
          position:       'top',
          text1:          'Error!',
          text2:          response?.message || 'An unexpected error occurred.',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type:           'error',
        position:       'top',
        text1:          'Error!',
        text2:          error?.message || 'An unexpected error occurred.',
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (isReady) {
      allGameHistory();
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);

  const handleNavigation = () => {
    navigation.navigate('LocalGameBoard', { game_id, user_id: data._id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GameFinishHistory', {
            gameHistoryData: item,
            title,
            user_name: data.userName,
          })
        }
        activeOpacity={0.85}
      >
        <View style={styles.borderWrapper}>
          <LinearGradient
            colors={['#F38424', '#F7A552', '#F9D479']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.cardContainer}>
              <Image source={trophy} style={styles.trophyIcon} />

              <View style={styles.detailsContainer}>
                <Text style={styles.titleText}>Played On</Text>
                <View style={styles.dateTimeRow}>
                  <Text style={styles.dateText}>{item.game_played_at}</Text>
                </View>
                <TouchableOpacity
                  style={styles.dateTimeRow}
                  onPress={handleNavigation}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.viewText}>View Dashboard</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.scoreText}>{item.score}</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loader ? (
        <AnimatedLoader />
      ) : gameHistoryData.length > 0 ? (
        <FlatList
          data={gameHistoryData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingVertical: hp('1%'),
  },

  itemWrapper: {
    paddingHorizontal: wp('3%'),
    paddingVertical:   hp('0.8%'),
  },

  borderWrapper: {
    borderRadius: CARD_RADIUS,
    borderWidth:  BORDER_WIDTH,
    borderColor:  '#F2E30B',
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius:  6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  gradient: {
    borderRadius: INNER_RADIUS,
    overflow:     'hidden',
  },

  cardContainer: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical:   hp('2.2%'),
  },

  trophyIcon: {
    width:      wp('12%'),
    height:     wp('12%'),      
    marginRight: wp('3%'),
    resizeMode: 'contain',
  },

  detailsContainer: {
    flex:           1,
    justifyContent: 'center',
  },

  titleText: {
    color:        '#2A1610',
    fontSize:     wp('4.5%'),
    fontFamily:   'Audiowide-Regular',
    marginBottom: hp('0.6%'),
  },

  dateTimeRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   hp('0.4%'),
  },

  dateText: {
    color:      '#000000B2',
    fontSize:   wp('3.5%'),
    fontFamily: 'Montserrat-SemiBold',
  },

  viewText: {
    color:             'red',
    fontSize:          wp('3.5%'),
    fontFamily:        'Montserrat-SemiBold',
    textDecorationLine:'underline',
  },

  scoreText: {
    color:      '#2A1610',
    fontSize:   wp('6.5%'),
    fontFamily: 'Audiowide-Regular',
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  emptyText: {
    color:             'white',
    fontSize:          wp('4%'),   
    fontWeight:        '500',
    textAlign:         'center',
    paddingHorizontal: wp('8%'),
  },
});

export default PlayedHistory;