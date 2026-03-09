import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import CommonHeader from './CommonHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function WebViewScreen(props) {
    const { title, uri } = props;
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <CommonHeader title={title} />
            </View>
            <WebView
                source={{ uri }}
                style={styles.webview}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#361911',
        paddingBottom: wp('4%'),
    },

    webview: {
        flex: 1,
    },
})