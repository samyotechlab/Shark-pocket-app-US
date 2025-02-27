import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SelectedNumbers = () => {
    const route = useRoute();
    console.log(route.params);
    const { numbers, super_numbers } = route.params || {};

    const super_number = super_numbers ? super_numbers : 5;
    console.log("super_number", super_number);
    const [activeTab, setActiveTab] = useState(null);

    if (!numbers || typeof numbers !== 'string' || numbers.trim() === '') {
        return (
            <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
                <CommonHeader title={'Selected Number'} />
                <View style={styles.centeredView}>
                    <Text style={styles.noNumbersText}>No numbers available</Text>
                </View>
            </LinearGradient>
        );
    }

    const numberArray = numbers.split(',').map(num => num.trim());
    const evenNumbers = numberArray.filter(num => parseInt(num) % 2 === 0);
    const oddNumbers = numberArray.filter(num => parseInt(num) % 2 !== 0);

    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const primeNumbers = numberArray.map(num => parseInt(num)).filter(num => isPrime(num));
    const matchingNumbers = numberArray.filter(num => num.slice(-1) === super_number.toString());

    const sections = [
        { title: 'Right Selected Numbers', data: oddNumbers, colors: ['#438301', '#D2F6AD', '#438301'], borderColor: '#569218' },
        { title: 'Super Selected Number', data: matchingNumbers, colors: ['#0916B9', '#7F71BF', '#0916B9'], borderColor: '#7F71BF' },
        { title: 'Prime Selected Number', data: primeNumbers, colors: ['#D5B723', '#f7e692', '#d4b82f'], borderColor: '#EFD635' },
        { title: 'Wrong Selected Number', data: evenNumbers, colors: ['#C30303', '#F6ADAD', '#BF0404'], borderColor: '#FFA8A8' }
    ];

    return (
        <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
            <CommonHeader title={'Selected Number'} />

            <LinearGradient colors={['#0916B9', '#7F71BF', '#0916B9']} start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }} style={styles.superNumberBox}>
                <Text style={styles.superNumberText}>{super_number}</Text>
            </LinearGradient>

            <ScrollView>
                {sections.map((section, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => setActiveTab(activeTab === index ? null : index)}>
                            <LinearGradient colors={section.colors} style={[styles.tabHeader, { borderColor: section.borderColor }]}>
                                <Text style={styles.tabHeaderText}>{section.title}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {activeTab === index && (
                            <View style={styles.tabContentContainer}>
                                <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
                                    {section.data.length > 0 ? (
                                        <View style={styles.numberContainer}>
                                            {section.data.map((number, numIndex) => (
                                                <LinearGradient key={numIndex} colors={section.colors} start={{ x: 0.3, y: 0 }} end={{ x: 0.7, y: 1 }} style={[styles.numberBox, { borderColor: section.borderColor }]}>
                                                    <Text style={styles.numberText}>{number}</Text>
                                                </LinearGradient>
                                            ))}
                                        </View>
                                    ) : (
                                        <View style={styles.centeredView}>
                                            <Text style={styles.noNumbersText}>No numbers Selected</Text>
                                        </View>
                                    )}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: { flex: 1 },
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    noNumbersText: { color: 'white', fontSize: 18 },
    tabHeader: {
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
        borderWidth: hp('0.2%'),
    },
    tabHeaderText: { fontSize: hp('2.2%'), fontFamily: 'LilitaOne-Regular', color: '#361911' },
    tabContentContainer: {
        maxHeight: hp('30%'),
    },
    tabContent: {
        maxHeight: hp('30%'),

    },
    numberContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: hp('1.5%'), padding: hp('1%') },
    numberBox: {
        padding: hp('1%'),
        borderRadius: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: hp('6%'),
        height: hp('6%'),
        borderWidth: 1,
        backgroundColor: 'white'
    },
    numberText: { fontSize: hp('1.5%'), fontFamily: 'LilitaOne-Regular' },
    emptyText: { color: 'white', fontSize: 16, marginTop: 10 },
    superNumberBox: {
        width: hp('6%'),
        height: hp('6%'),
        borderRadius: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#7F71BF',
        marginHorizontal: hp('35%'),
    },
    superNumberText: {
        fontSize: hp('3%'),
        fontFamily: 'LilitaOne-Regular',
        color: '#361911',
    },
});

export default SelectedNumbers;

