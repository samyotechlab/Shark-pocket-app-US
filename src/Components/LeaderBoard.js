import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LocalLeaderBoard from './LocalLeaderBoard';
import GameInfoModal from './GameInfoModal';

export default function LeaderBoard() {
  const [selectedTab, setSelectedTab] = useState('Weekly');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()


  const handlePress = tab => {
    setSelectedTab(tab);
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedTab('Weekly');
    }, []),
  );

  return (
    <>
      <GameInfoModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <View style={{ flex: 1.5 }}>
        <View style={styles.leaderBoard}>
          <Text style={styles.leaderTxt}>Leader Board</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('PointsSelection')
          }}>
            <LinearGradient
              colors={["#FEB801", "#361911"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <View>
                <Text style={styles.buttonText}>Points Selection</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
                  handlePress('Weekly');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Weekly'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Weekly' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Weekly
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Weekly' && (
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
                  handlePress('Daily');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor:
                    selectedTab === 'Daily'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : '#361911',
                  height: hp('5%'),
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: selectedTab === 'Daily' ? 'white' : '#FFFFFFB2',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Daily
                </Text>
              </TouchableOpacity>
              {selectedTab === 'Daily' && (
                <LinearGradient
                  colors={['#361911', '#FEB801']}
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
      <View style={{ flex: 6 }}>
        <LocalLeaderBoard type={selectedTab === "Weekly" ? "weekly" : "daily"} />
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
    marginRight: hp('2%'),
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
