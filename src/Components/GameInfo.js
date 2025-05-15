import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function GameInfo({ gameData }) {
    console.log("gameData.game_info", gameData.game_info);
    const [selectedLanguage, setSelectedLanguage] = useState(
        Array.isArray(gameData?.game_info) && gameData?.game_info?.[0]?.language
            ? gameData.game_info[0].language
            : 'ENGLISH'
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const selectedDescription = Array.isArray(gameData?.game_info)
        ? gameData.game_info.find((info) => info.language === selectedLanguage)?.description
        : 'No description available';

    return (
        <View style={styles.container}>
            {Array.isArray(gameData?.game_info) && gameData.game_info.length > 0 && (
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.pickerButton}
                        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <Text style={styles.pickerText}>{selectedLanguage}</Text>
                        <Icon name="chevron-down" size={15} color="#742D1A" />
                    </TouchableOpacity>
                    {isDropdownOpen && (
                        <View style={styles.dropdownMenu}>
                            {gameData.game_info.map((info) => (
                                <TouchableOpacity
                                    key={info._id}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedLanguage(info.language);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{info.language}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.title}>📜 Game Info</Text>
                    <Text style={styles.text}>{selectedDescription}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
    dropdownContainer: {
        flex: 0.07,
        marginBottom: hp('1%'),
        borderRadius: wp('2%'),
        borderWidth: wp('0.5%'),
        borderColor: '#FFD700',
        backgroundColor: '#F8D9A8',
        justifyContent: 'center',
        width: wp('40%'),
        overflow: 'visible',
        alignSelf: 'flex-end',
        marginRight: wp('4%'),
    },
    pickerButton: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 50,
    },
    pickerText: {
        fontSize: wp('4%'),
        color: '#742D1A',
        fontFamily: 'Montserrat-SemiBold',
    },
    dropdownMenu: {
        position: 'absolute',
        top: hp('4.3%'),
        right: 0,
        left: 0,
        width: wp('40%'),
        backgroundColor: '#F8D9A8',
        borderRadius: wp('2%'),
        borderWidth: wp('0.5%'),
        borderColor: '#FFD700',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 1000,
        maxHeight: hp('15%'),
    },
    dropdownItem: {
        paddingVertical: hp('0.8%'),
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: wp('0.1%'),
        borderBottomColor: '#742D1A',
    },
    dropdownItemText: {
        fontSize: wp('3.5%'),
        color: '#742D1A',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    text: {
        fontSize: wp('4%'),
        lineHeight: hp('3%'),
        color: '#333',
        textAlign: 'justify',
    },
});