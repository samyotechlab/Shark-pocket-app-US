import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {API_URL} from '@env';
import CommonHeader from '../../Components/CommonHeader';
import Config from '../../Utilities/Config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TCScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <CommonHeader title={'Terms And Conditions'} />
      </View>
      <WebView
        source={{uri: `${API_URL}/${Config.TermCondition}`}}
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

export default TCScreen;
