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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Person4 from '../../assets/images/Screens/Person4.jpeg';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalLeaderBoard } from '../Service/LeaderBoard';
import { truncateName } from '../Utilities/utilies';
import AnimatedLoader from './AnimatedLoader';
import Icon from 'react-native-vector-icons/Entypo';
import GameInfoModal from './GameInfoModal';
export default function GlobalLeaderBoard() {
  const [loader, setLoader] = useState(false);
  const [globalData, setGlobalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const [firstRanking, setFirstRanking] = useState(null);
  // const [secondRanking, setSecondRanking] = useState(null);
  // const [thirdRanking, setThirdRanking] = useState(null);

  const globalLeaderData = async () => {
    try {
      setLoader(true);
      const response = await globalLeaderBoard();
      if (response) {
        setGlobalData(response.data);
      } else {
        const msg = response.message;
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: { msg },
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      const msg = error.message;
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: { msg },
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    globalLeaderData();
  }, []);

  // useEffect(() => {
  //   rakingData();
  // }, [globalData]);

  // const rakingData = () => {
  //   if (globalData && globalData.length > 0) {
  //     globalData.map(item => {
  //       if (item.ranking === 1) {
  //         setFirstRanking(item);
  //       } else if (item.ranking === 2) {
  //         setSecondRanking(item);
  //       } else if (item.ranking === 3) {
  //         setThirdRanking(item);
  //       }
  //     });
  //   }

  // };

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
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
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
    <>
    <GameInfoModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 0.1,flexDirection:'row',justifyContent:'flex-end',marginRight:hp('2%'),marginTop:hp('2%')}} onPress={()=>{
    setModalVisible(true)
      }}>
        <Icon name={'info-with-circle'} size={30} color={'red'}/>
      </TouchableOpacity>
      <View
        style={{
          flex: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          margin: wp('6%'),
          borderRadius: 15,
        }}>
        <SafeAreaView style={{ flex: 1, margin: wp('4%') }}>
          {globalData ? (
            !loader ? (
              <FlatList
                data={globalData}
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
      <Toast ref={Toast.setRef} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
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
