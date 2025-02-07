import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function GameInfo({ gameData }) {
    return (
        // <LinearGradient colors={['#431c0d', '#742D1A', '#A6401E']} style={styles.container}>
        <View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.title}>📜 Game Info</Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
                    </Text>
                </View>
            </ScrollView>
            </View>
        // </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#F8D9A8',
        borderRadius: wp('4%'),
        padding: hp('2.5%'),
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.5%') },
        shadowOpacity: 0.3,
        shadowRadius: wp('2%'),
        elevation: 6,
        borderWidth: wp('0.7%'),
        borderColor: '#FFD700',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#742D1A',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlign: 'justify',
    },
});

