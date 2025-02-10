import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';

const SelectedNumbers = () => {
    const route = useRoute();
    const { numbers } = route.params;

    const numberArray = numbers.split(',').map(num => num.trim());

    return (
        <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
            <View style={styles.container}>
              <CommonHeader title={'Selected Number'}/>
                <View style={styles.numbersContainer}>
                    {numberArray.map((number, index) => (
                        <View key={index} style={styles.numberBox}>
                            <Text style={styles.numberText}>{number}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Make text visible on dark background
        marginBottom: 20,
        textAlign: 'center',
    },
    numbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    numberBox: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white box
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    numberText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // White text for better visibility
    },
});

export default SelectedNumbers;
