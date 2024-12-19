import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function LeaderBoard() {
    const [selectedTab, setSelectedTab] = useState('Local');

    const handlePress = tab => {
      setSelectedTab(tab);
    };
    useFocusEffect(
      useCallback(() => {
        setSelectedTab('Local');
      }, []),
    );
  return (
    <View style={{flex: 1,flexDirection:'row',padding:hp('1%')}}>
          <TouchableOpacity
            onPress={() => {
              handlePress('Local');
            }}
            style={{
              flex:1,    
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:hp('1%'),
              marginHorizontal: hp('1%'), 
              height: hp('5%'),
             backgroundColor: selectedTab === 'Local' ? 'rgba(255, 255, 255, 0.1)' : '#361911'
            }}>
            <Text
              style={{
                fontSize: 20,
                color: selectedTab === 'Local' ? 'white' : '#FFFFFFB2',
                   fontFamily:'Montserrat-Medium'
              }}>
              Local
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePress('Global');
            }}
            style={{
                flex:1,
                marginHorizontal: hp('1%'), // Add spacing between buttons
                height: hp('5%'),
              justifyContent: 'center',
              borderRadius:hp('1%'),
              alignItems: 'center',
              backgroundColor: selectedTab === 'Global' ? 'rgba(255, 255, 255, 0.1)' : '#361911' 
            }}>
            <Text
              style={{
                fontSize: 20,
                color: selectedTab === 'Global' ? 'white' : '#FFFFFFB2',
                fontFamily:'Montserrat-Medium'
              }}>
              Global
            </Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})