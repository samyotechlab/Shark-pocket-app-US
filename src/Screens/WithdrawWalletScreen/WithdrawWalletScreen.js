import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import TDSBreakupDialog from '../../Components/TDSBreakupDialog';
import CommonHeader from '../../Components/CommonHeader';
import Tickets from '../GameName.js/Tickets';
import PlayedHistory from '../GameName.js/PlayedHistory';
import { Loader } from '../../Components/Loader';
import Withdraw from './Withdraw';
import WithdrawHistory from './WithdrawHistory';

const WithdrawWalletScreen = () => {

  const [selectedTab, setSelectedTab] = useState('Withdraw');

  const [loader, setLoader] = useState(false);
  const handlePress = tab => {
    setSelectedTab(tab);
  };
  const dynamicStyles = getDynamicStyles(selectedTab);
  return (
    <SafeAreaView style={dynamicStyles.container}>
      <CommonHeader title={"Withdraw wallet"} />
      <View style={{ marginTop: 10,flex:1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: hp('2%'),
            gap: wp('10%')
          }}>
          <TouchableOpacity onPress={() => handlePress('Withdraw')}>
            <Text
              style={dynamicStyles.Withdraw}>
              Withdraw
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('WithdrawHistory')}>
            <Text
              style={dynamicStyles.WithdrawHistory}>
              Withdraw History
            </Text>
          </TouchableOpacity>

        </View>
        {selectedTab === 'Withdraw' ? (
          !loader ? (<Withdraw/>) : (<Loader />)
        ) : (
          !loader ? (<WithdrawHistory />) : (<Loader />)
        )}
    
      </View>
    </SafeAreaView>
  );
};

const getDynamicStyles = selectedTab =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#361911',
    },
    Withdraw: {
      fontSize: 18,
      color: selectedTab === 'Withdraw' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Withdraw' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Withdraw' ? '#FEB801' : '#565656',
    },
    WithdrawHistory: {
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'WithdrawHistory' ? '#FEB801' : '#565656',
      color: selectedTab === 'WithdrawHistory' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'WithdrawHistory' ? 'Montserrat-Bold' : 'Montserrat-Regular',
    }
  });

export default WithdrawWalletScreen;
