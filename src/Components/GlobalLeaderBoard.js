import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Person from '../../assets/images/Screens/person.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Frame from '../../assets/images/Screens/Frame.png';
import Person2 from '../../assets/images/Screens/Person2.jpeg';
import Person3 from '../../assets/images/Screens/Person3.jpeg';
import Person4 from '../../assets/images/Screens/Person4.jpeg';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalLeaderBoard } from '../Service/LeaderBoard';
import { truncateName } from '../Utilities/utilies';
import AnimatedLoader from './AnimatedLoader';

export default function GlobalLeaderBoard() {
  const [loader, setLoader] = useState(false)
  const [globalData, setGlobalData] = useState([])
  const [firstRanking, setFirstRanking] = useState(null);
  const [secondRanking, setSecondRanking] = useState(null);
  const [thirdRanking, setThirdRanking] = useState(null);


  const globalLeaderData = async () => {
    try {
      setLoader(true)
      const response = await globalLeaderBoard();
      if (response) {
        setGlobalData(response.data);
      } else {
        const msg = response.message
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: {msg},
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      const msg = error.message
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: {msg},
        visibilityTime: 3000,
      });
      
    } finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    globalLeaderData()
  }, [])

  useEffect(() => {
    rakingData();
  }, [globalData]);

  const rakingData = () => {
    globalData.map(item => {
      if (item.ranking === 1) {
        setFirstRanking(item);
      } else if (item.ranking === 2) {
        setSecondRanking(item);
      } else if (item.ranking === 3) {
        setThirdRanking(item);
      }
    });
  };



  const renderItem = items => {
    const { item } = items
    return (
      <>
        <View style={{ flex: 1, paddingBottom: 10 }}>
          <View
            style={{
              flex: 1,
              width: wp('100%'),
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
              <Text style={styles.txt}>{item.score}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txt}>#{item.ranking}</Text>
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: hp(8),
              width: hp(8),
              borderRadius: hp(8),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#F1C328',
            }}>
            <Image
              source={Person2}
              style={{ height: hp(7), width: hp(7), borderRadius: hp(7) }}
            />
          </View>
          <View style={{ position: 'absolute' }}>
            <View
              style={{
                height: hp(3),
                width: hp(3),
                backgroundColor: '#F1C328',
                borderRadius: hp(3),
                top: hp('2%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: '#000000CC' }}>2</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#FFFFFFCC',
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 14,
              paddingTop: wp('3%'),
            }}>
            {secondRanking?.user_name
              ? truncateName(secondRanking?.user_name, 1)
              : 'user'}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('10%'),
              justifyContent: 'flex-end',
              alignItems: 'center',
              top: wp('2%'),
            }}>
            <Image source={Frame} />
          </View>
          <View
            style={{
              height: hp(11),
              width: hp(11),
              borderRadius: hp(11),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#F1C328',
            }}>
            <Image
              source={Person}
              style={{ height: hp(10), width: hp(10), borderRadius: hp(10) }}
            />
          </View>
          <View style={{ position: 'absolute' }}>
            <View
              style={{
                height: hp(3),
                width: hp(3),
                borderRadius: hp(3),
                backgroundColor: '#F1C328',
                top: hp('6%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#000000CC' }}>1</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#FFFFFFCC',
              fontWeight: '500',
              fontSize: 14,
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            {firstRanking?.user_name
              ? truncateName(firstRanking?.user_name, 1)
              : 'user'}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: hp(8),
              width: hp(8),
              borderRadius: hp(8),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#F1C328',
            }}>
            <Image
              source={Person3}
              style={{ height: hp(7), width: hp(7), borderRadius: hp(7) }}
            />
          </View>
          <View style={{ position: 'absolute' }}>
            <View
              style={{
                height: hp(3),
                width: hp(3),
                backgroundColor: '#F1C328',
                borderRadius: hp(3),
                top: hp('2%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#000000CC' }}>3</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#FFFFFFCC',
              fontSize: 14,
              paddingTop: wp('3%'),
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            {thirdRanking?.user_name
              ? truncateName(thirdRanking?.user_name, 1)
              : 'user'}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          margin: wp('6%'),
          borderRadius: 15,
        }}>
        <SafeAreaView style={{ flex: 1, margin: wp('4%') }}>
          {
            globalData.length == 0 ? (
              <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>
            ) : (
              !loader ? (<FlatList
                data={globalData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />) : (<AnimatedLoader />)
            )

          }

        </SafeAreaView>
      </View>
      <Toast ref={Toast.setRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
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
