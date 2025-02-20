import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SelectedNumbers = () => {
    const route = useRoute();
    const { numbers } = route.params || {};
    const super_number = 5

    if (!numbers || typeof numbers !== 'string' || numbers.trim() === '') {
        return (
            <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
                <CommonHeader title={'Selected Number'} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>No numbers available</Text>
                </View>
            </LinearGradient>
        );
    }

    const numberArray =  numbers.split(',').map(num => num.trim());

    const evenNumbers = numberArray.filter(num => parseInt(num) % 2 === 0);
    const oddNumbers = numberArray.filter(num => parseInt(num) % 2 !== 0);

    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
    const primeNumbers = numberArray
        .map(num => parseInt(num))
        .filter(num => isPrime(num));

    const matchingNumbers = numberArray.filter(num => num.slice(-1) === super_number.toString());


    return (
        <LinearGradient
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
            <CommonHeader title={'Selected Number'} />

            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={['#438301', '#D2F6AD', '#438301']}
                        style={[styles.rightSelectedContainer, { borderColor: '#569218' }]}>
                        <Text style={styles.rightSelectedText}>Right Selected Numbers</Text>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 10,
                        }}>
                            {oddNumbers.map((number, index) => (
                                <LinearGradient
                                    colors={['#438301', '#D2F6AD', '#438301']}
                                    start={{ x: 0.3, y: 0 }}
                                    key={index} style={[styles.numberBox, { borderColor: '#569218' }]}>
                                    <Text style={[styles.numberText, { color: '#361911' }]}>{number}</Text>
                                </LinearGradient>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>

                    <LinearGradient
                        colors={['#0916B9', '#7F71BF', '#0916B9']}
                        style={[styles.rightSelectedContainer, { borderColor: "#7F71BF" }]}>
                        <Text style={[styles.rightSelectedText, { color: '#FFFFFF' }]}>Super Selected Number</Text>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 10,
                        }}>
                            {matchingNumbers.map((number, index) => (
                                <LinearGradient
                                    colors={['#0916B9', '#7F71BF', '#0916B9']}
                                    start={{ x: 0.3, y: 0 }}
                                    key={index} style={[styles.numberBox, { borderColor: "#7F71BF" }]}>
                                    <Text style={[styles.numberText, { color: '#FFFFFF' }]}>{number}</Text>
                                </LinearGradient>
                            ))}
                        </View>

                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={['#D5B723', '#f7e692', '#d4b82f']}
                        style={[styles.rightSelectedContainer, { borderColor: "#EFD635" }]}>
                        <Text style={styles.rightSelectedText}>Prime Selected Number</Text>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 10,
                        }}>
                            {primeNumbers.map((number, index) => (
                                <LinearGradient
                                    colors={['#D5B723', '#f7e692', '#d4b82f']}
                                    start={{ x: 0.3, y: 0 }}
                                    key={index} style={[styles.numberBox, { borderColor: "#EFD635" }]}>
                                    <Text style={[styles.numberText, { color: '#361911', }]}>{number}</Text>
                                </LinearGradient>
                            ))}
                        </View>

                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={['#C30303', '#F6ADAD', '#BF0404']}
                        style={[styles.rightSelectedContainer, { borderColor: "#FFA8A8" }]}>
                        <Text style={[styles.rightSelectedText, { color: '#FFFFFF' }]}>Wrong Selected Number</Text>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 10,
                        }}>
                            {evenNumbers.map((number, index) => (
                                <LinearGradient
                                    colors={['#C30303', '#F6ADAD', '#BF0404']}
                                    start={{ x: 0.3, y: 0 }}
                                    key={index} style={[styles.numberBox, { borderColor: "#FFA8A8" }]}>
                                    <Text style={[styles.numberText, { color: '#FFFFFF' }]}>{number}</Text>
                                </LinearGradient>
                            ))}
                        </View>

                    </ScrollView>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    rightSelectedContainer: {
        height: hp('5%'),
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp('1.5%'),
        margin: hp('1.5%'),
        padding: hp('0.5%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderWidth: 2,

    },
    rightSelectedText: {
        fontSize: 20,
        fontFamily: 'LilitaOne-Regular',
        color: '#361911',
    },
    numberBox: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 65,
        borderWidth: 1
    },
    numberText: {
        fontSize: 18,
        fontFamily: 'LilitaOne-Regular',
    },
});

export default SelectedNumbers;
