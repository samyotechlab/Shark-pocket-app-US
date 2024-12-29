import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {API_URL} from '@env';
import Config from '../../Utilities/Config';
import CommonHeader from '../../Components/CommonHeader';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={'Contact Us'} />
      <WebView
        source={{uri: `${API_URL}/${Config.Contact}`}}
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
    flex: 1,
    backgroundColor: '#361911',
  },

  webview: {
    flex: 1,
  },
});

export default ContactScreen;
