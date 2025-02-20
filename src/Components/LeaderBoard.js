import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LocalLeaderBoard from './LocalLeaderBoard';
import GlobalLeaderBoard from './GlobalLeaderBoard';
import Iconics from 'react-native-vector-icons/Ionicons';
import GameInfoModal from './GameInfoModal';

export default function LeaderBoard() {
  const [selectedTab, setSelectedTab] = useState('Local');
    const [modalVisible, setModalVisible] = useState(false);
  

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedTab('Local');
    }, []),
  );

  return (
    <>
          <GameInfoModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <View style={{flex: 1.5}}>
        <View style={styles.leaderBoard}>
          <Text style={styles.leaderTxt}>Leader Board</Text>
          <TouchableOpacity style={styles.button} onPress={()=>{
                      setModalVisible(true)

          }}>
        <LinearGradient
          colors={["#FEB801", "#361911"]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientButton}
        >
          <View>
            <Text style={styles.buttonText}>Points Selection</Text>
           
          </View>
        </LinearGradient>
      </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: hp('1%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, marginHorizontal: hp('0.5%')}}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('Local');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Local'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Local' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Weekly
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Local' && (
                <LinearGradient
                  colors={['#FEB801', '#361911']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: hp('0.5%'),
                    borderRadius: hp('0.25%'),
                  }}
                />
              )}
            </View>

            <View style={{flex: 1, marginHorizontal: hp('0.5%')}}>
              <TouchableOpacity
                onPress={() => {
                  handlePress('Global');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Global'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Global' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Daily
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Global' && (
                <LinearGradient
                  colors={['#361911','#FEB801']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
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
      <View style={{flex: 6}}>
        {selectedTab === 'Local' ? <LocalLeaderBoard  type="weekly"/> : <LocalLeaderBoard type="daily"/>}
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
    justifyContent: 'space-between',
    // backgroundColor: 'white',
  },
  leaderTxt: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5'),
    // letterSpacing:hp('0.2%')
  },
  button: {
    borderRadius: hp('1%'),
    overflow: "hidden",
    marginRight:hp('2%'),
  },
  gradientButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp('1.5%'),
    textAlign: "center",
    fontFamily: 'Montserrat-SemiBold',
  },
});
