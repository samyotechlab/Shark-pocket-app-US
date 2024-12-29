import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {API_URL} from '@env';
import CommonHeader from '../../Components/CommonHeader';
import Config from '../../Utilities/Config';

const TCScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={'Terms And Conditions'} />
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
    flex: 1,
    backgroundColor: '#361911',
  },

  webview: {
    flex: 1,
  },
});

export default TCScreen;
