import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../Components/CommonHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Deposite from '../WalletDetails/Deposite';
import Bonus from '../WalletDetails/Bonus';
import Winning from '../WalletDetails/Winning';
import WithDraw from '../WalletDetails/WithDraw';
import { useRoute } from '@react-navigation/native';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function WalletDetails() {
  const route = useRoute();
  const { user_id } = route.params;
  const [selectedTab, setSelectedTab] = useState('Deposite');
  const [loader, setLoader] = useState(false);

  const handlePress = (tab) => {
    setSelectedTab(tab);
  };

  const dynamicStyles = getDynamicStyles(selectedTab);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#361911' }}>
      <CommonHeader title={'Wallet Details'} />
      <View style={{ flex: 1}}>
        <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            paddingVertical: hp('1%'),
            paddingHorizontal: hp('2%'),
          }}
        >
          <TouchableOpacity onPress={() => handlePress('Deposite')}>
            <Text style={dynamicStyles.deposite}>Deposite</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Bonus')}>
            <Text style={dynamicStyles.bonus}>Bonus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Winning')}>
            <Text style={dynamicStyles.winning}>Winning</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Withdraw')}>
            <Text style={dynamicStyles.withdraw}>WithDraw</Text>
          </TouchableOpacity>
     
        </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          {selectedTab === 'Deposite' ? (
            !loader ? (
              <Deposite user_id={user_id} />
            ) : (
              <AnimatedLoader />
            )
          ) : selectedTab === 'Bonus' ? (
            !loader ? (
              <Bonus user_id={user_id} />
            ) : (
              <AnimatedLoader />
            )
          ) : selectedTab === 'Winning' ? (
            !loader ? (
              <Winning user_id={user_id} />
            ) : (
              <AnimatedLoader />
            )
          ) : (
            !loader ? (
              <WithDraw user_id={user_id} />
            ) : (
              <AnimatedLoader />
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const getDynamicStyles = (selectedTab) =>
  StyleSheet.create({
    deposite: {
      fontSize: wp('4.5%'),
      color: selectedTab === 'Deposite' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Deposite' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      borderBottomWidth: hp('0.5%'),
      borderBottomColor: selectedTab === 'Deposite' ? '#FEB801' : '#565656',
      marginHorizontal: wp('2%'),
    },
    bonus: {
      fontSize: wp('4.5%'),
      borderBottomWidth: hp('0.5%'),
      borderBottomColor: selectedTab === 'Bonus' ? '#FEB801' : '#565656',
      color: selectedTab === 'Bonus' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Bonus' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      marginHorizontal: wp('2%'),
    },
    winning: {
      fontSize: wp('4.5%'),
      borderBottomWidth: hp('0.5%'),
      borderBottomColor: selectedTab === 'Winning' ? '#FEB801' : '#565656',
      color: selectedTab === 'Winning' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Winning' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      marginHorizontal: wp('2%'),
    },
    withdraw: {
      fontSize: wp('4.5%'),
      borderBottomWidth: hp('0.5%'),
      borderBottomColor: selectedTab === 'Withdraw' ? '#FEB801' : '#565656',
      color: selectedTab === 'Withdraw' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Withdraw' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      marginHorizontal: wp('2%'),
    },
  });

