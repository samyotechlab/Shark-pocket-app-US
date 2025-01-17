import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import CommonHeader from '../../Components/CommonHeader';
import Config from '../../Utilities/Config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { baseApiurl } from '../../Service/AxiosInstance';

const FAQ = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <CommonHeader title={'FAQ'} />
      </View>
      <WebView
        source={{uri: `${baseApiurl}/${Config.HelpSupport}`}}
        style={styles.webview}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#361911',
    paddingBottom: wp('4%'),
  },

  webview: {
    flex: 1,
  },
});

export default FAQ;
