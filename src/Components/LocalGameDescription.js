import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from './CommonHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LocalGameDescription() {
    return (
        <LinearGradient
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
            <View style={{ flex: 0.15 }}>
                <CommonHeader title={'Leader Board'} />
            </View>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <Text style={styles.title}>📜 Description</Text>
                        <Text style={styles.text}>This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!
                        This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: wp('2%'),
    },
    card: {
        backgroundColor: '#F8D9A8',
        borderRadius: wp('4%'),
        padding: hp('2.5%'),
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: wp('4%'),
        elevation: 12,
        borderWidth: wp('0.7%'),
        borderColor: '#FFD700',
        transform: [{ perspective: 1000 }, { rotateX: '-5deg' }],
    },
    title: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        textAlign: 'center',
        color: '#FFD700',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        textTransform: 'uppercase',
        letterSpacing: 2,
        backgroundColor: '#742D1A',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('3%'),
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    text: {
        fontSize: wp('4%'),
        lineHeight: hp('3%'),
        color: '#333',
        textAlign: 'justify',
    },
})
