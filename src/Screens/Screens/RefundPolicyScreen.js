import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Config from '../../Utilities/Config';
import CommonHeader from '../../Components/CommonHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { baseApiurl } from '../../Service/AxiosInstance';

const RefundPolicyScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <CommonHeader title={'Refund Policy'} />
      </View>
      <WebView
        source={{uri: `${baseApiurl}/${Config.Refund}`}}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
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

export default RefundPolicyScreen;
