import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../Utilities/utilies';
import { historyData } from '../../Service/GameHistory';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import Toast from 'react-native-toast-message';
import Game from '../../../assets/images/Screens/game1.png'
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../../Components/Loader';

export default function AllPlayedGames() {

    const { isReady, loginData } = useLoginDataStorage()
    const [history, setHistory] = useState([]);
    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()

    const data = isReady && loginData && loginData?.data 



    const historyDataList = async () => {
        try {
            setLoader(true)
            const response = await historyData(data._id);
            console.log('response', response);
            if (response) {
                setHistory(response?.data);
            } else {
                Toast.error(response?.message);
            }
        } catch (error) {
            console.log('error', error);
        }finally{
            setLoader(false);
        }
    };

    useEffect(() => {
        if (isReady) {
            historyDataList();
        } else {
            setLoader(true)
        }
    }, [isReady, loginData])


    const gradientColors = [
        ['#F38424', '#F7A552', '#F9D479'],
        ['#E3398C', '#CC8FAD'],
        ['#75B831', '#BAFF74'],
        ['#0916B9', '#A1A8FF'],
    ];

    const borderColors = [
        '#F2E30B',
        '#5C233F',
        '#78C800',
        '#1A0DAB',
    ];
    const renderItem = ({ item, index }) => {
        console.log("item",item)
        const formattedDate = formatDate(item.game_start_date);
        const colors = gradientColors[index % gradientColors.length];
        const border = borderColors[index % borderColors.length];
        return (<>

            <TouchableOpacity style={styles.container1} onPress={() => {
                navigation.navigate('AllGameName', { game_id: item._id })
            }} >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0.8, y: 1 }}
                    style={[styles.card, { borderColor: border }]}
                >
                    <View style={styles.content}>
                        <Image
                            source={Game}
                            style={styles.characterImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>
                                GET ₹{item.game_winning_cost} & PLAY NOW
                            </Text>
                            <Text style={styles.description}>
                                You will get the ₹{item.game_winning_cost} prize money
                                enroll yourself before game start
                            </Text>
                            <Text style={styles.startText}>
                                Start <Text style={styles.dateText}>{formattedDate}</Text>
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>₹ {item.game_winning_cost} CASH WIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </>)
    }
    return (
        <LinearGradient
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
            <CommonHeader title={"All Played Games"} />
            {
                !loader  ?( <View style={styles.container}>
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    />
                </View>):(<Loader/>)
            }
           
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: hp('5%')
    },
    scrollContainer: {
        marginBottom: hp('5%'),
    },
    container1: {
        flex: 1,
        paddingLeft: wp('5%'),
        marginBottom: hp('2%')
    },
    card: {
        borderRadius: wp('2%'),
        width: wp('90%'),
        height: hp('20%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.5%') },
        shadowOpacity: 0.3,
        shadowRadius: wp('1.5%'),
        elevation: 5,
        borderWidth: wp('1%'),
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    characterImage: {
        width: wp('25%'),
        height: hp('25%'),
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        paddingLeft: wp('3%'),
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: wp('4%'),
        fontFamily: 'Audiowide-Regular',
        color: '#2A1610',
    },
    description: {
        fontSize: wp('3%'),
        color: '#000000',
        marginVertical: hp('1%'),
        fontFamily: 'Montserrat-Bold',
    },
    startText: {
        fontSize: wp('4%'),
        color: '#FFFFFF',
        fontFamily: 'Audiowide-Regular',
    },
    dateText: {
        color: '#FFFFFF',
        paddingHorizontal: wp('2%'),
        borderRadius: wp('1%'),
        fontFamily: 'Audiowide-Regular',
        fontSize: wp('4%'),
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginTop: hp('1.5%'),
    },
    button: {
        backgroundColor: '#3E2723',
        borderRadius: wp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('7%'),
        alignItems: 'center',
        borderColor: '#F5D236',
        borderWidth: wp('0.5%'),
    },
    buttonText: {
        fontSize: wp('4.5%'),
        fontFamily: 'Inter_18pt-Bold',
        color: '#FFDC4D',
        letterSpacing: wp('0.25%'),
        textShadowColor: '#F88600',
        textShadowOffset: { width: 0, height: hp('0.25%') },
        textShadowRadius: wp('3.75%'),
    }
})

