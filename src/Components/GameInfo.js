import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function GameInfo({ gameData }) {
    return (

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
    );
}

const styles = StyleSheet.create({
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
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlign: 'justify',
    },
});

