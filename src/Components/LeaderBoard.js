import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LocalLeaderBoard from './LocalLeaderBoard';
import GlobalLeaderBoard from './GlobalLeaderBoard';
import Iconics from 'react-native-vector-icons/Ionicons';

export default function LeaderBoard() {
  const [selectedTab, setSelectedTab] = useState('Local');

  const handlePress = (tab) => {
    setSelectedTab(tab);
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedTab('Local');
    }, [])
  );

  return (
    <>
      <View style={{ flex: 1.5 }}>
        <View style={styles.leaderBoard}>
          <Text style={styles.leaderTxt}>Leader Board</Text>
          <Iconics name="search-sharp" size={25} color={'white'} />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: hp('1%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1, marginHorizontal: hp('0.5%') }}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('Local');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Local' ? 'rgba(255, 255, 255, 0.1)' : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Local' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Local
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Local' && (
                <LinearGradient
                  colors={['#FEB801', '#361911']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: hp('0.5%'),
                    borderRadius: hp('0.25%'),
                  }}
                />
              )}
            </View>


            <View style={{ flex: 1, marginHorizontal: hp('0.5%') }}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('Global');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Global' ? 'rgba(255, 255, 255, 0.1)' : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Global' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Global
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Global' && (
                <LinearGradient
                  colors={['#FEB801', '#361911']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: hp('0.5%'),
                    borderRadius: hp('0.25%'),
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 6}}>
      {selectedTab === 'Local' ? <LocalLeaderBoard /> : <GlobalLeaderBoard />}
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  leaderBoard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: wp('4%'),
    justifyContent: 'space-between'
  },
  leaderTxt: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    // letterSpacing:hp('0.2%')
  }
});
