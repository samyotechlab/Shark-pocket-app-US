import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import Game from '../../../assets/images/Screens/game1.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { storeTicket, ticketList } from '../../Service/Tickets';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import coin from '../../../assets/images/Screens/coin.png'
import ticket from '../../../assets/images/Screens/ticket.png'
import timer from '../../../assets/images/Screens/timer.png'
import AlertDialog from '../../Components/AlertDialogRed';
import { Loader } from '../../Components/Loader';

export default function Tickets() {
    const navigation = useNavigation();
    const { loginData, isReady } = useLoginDataStorage();
    const data = isReady && loginData && loginData?.data
    const [loader, setLoader] = useState(false);
    const [ticketData, setTicketData] = useState([])
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [purchasedTickets, setPurchasedTickets] = useState({});
    const route = useRoute();
    const { game_id } = route.params

    const getAllTicket = async () => {
        setLoader(true)
        try {
            const response = await ticketList(game_id, data._id)
            setTicketData(response.data)
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        if (isReady) {
            getAllTicket();
        } else {
            setLoader(true)
        }
    }, [isReady, loginData])

    const renderItem = ({ item }) => {
        const isPurchased = purchasedTickets[item._id] || item.is_bought === 1;

        const handlePurchase = async () => {
            try {
                console.log('Purchasing ticket for:', selectedItem);
                setVisible(false);
                const response = await storeTicket(
                    game_id,
                    selectedItem._id,
                    data._id,
                );
                if (response.status === 0) {
                    setIsModalVisible1(true);
                    setMessage(response.message);
                } else {
                    setPurchasedTickets(prev => ({ ...prev, [selectedItem._id]: true }));
                    setSelectedItem(null);
                }
            } catch (error) {
                console.log('Purchase failed:', error);
            }
        };

        const handlePurchaseModal = () => {
            setSelectedItem(item);
            setVisible(true);
        };

        const handlePlay = () => {
            navigation.navigate('PlayingInstruction', {
                ticket_id: item._id,
                game_id: item.game_id,
            });
        };
        return (
            <>
                <AlertDialog visible={visible} onClose={() => setVisible(false)} onOkPress={handlePurchase} />
                <View style={styles.container1} >
                    <LinearGradient
                        colors={['#F38424', '#F7A552', '#F9D479']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 0.8, y: 1 }}
                        style={styles.card}
                    >
                        <View style={styles.content}>
                            <Image
                                source={Game}
                                style={styles.characterImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.description}>
                                    You will get the ₹3000 prize money
                                    enroll yourself before game start
                                </Text>
                                <View style={styles.boxContainer}>
                                 
                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} 
                                        style={styles.box}
                                    >
                                        <Image source={coin} style={styles.boxIcon} />
                                        <Text style={styles.boxText}>{item.price}</Text>
                                    </LinearGradient>
                                  
                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} 
                                        style={styles.box}
                                    >
                                        <Image source={ticket} style={styles.boxIcon1} />
                                        <Text style={styles.boxText}>{item.entries}</Text>
                                    </LinearGradient>

                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} 
                                        style={styles.box}
                                    >
                                        <Image source={timer} style={styles.boxIcon} />
                                        <Text style={styles.boxText}>{item.remaining_entries}</Text>
                                    </LinearGradient>
                                </View>
                          
                                <TouchableOpacity style={[styles.playButton, { backgroundColor: isPurchased ? '#EFC328' : '#2DF300' }]} onPress={isPurchased ? handlePlay : handlePurchaseModal}>
                               
                                    <Text style={styles.playButtonText}> {isPurchased ? 'Play Now' : 'Purchase'}</Text>
                    
                                </TouchableOpacity>

                

                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </>
        )
    }

    return (
        <>
            {
                !loader ? (<View style={styles.container}>
                    <FlatList
                        data={ticketData}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                    />
                </View>) : (<Loader />)
            }
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        paddingLeft: wp('3%'),
        marginBottom: hp('2%'),
    },
    card: {
        borderRadius: wp('2%'),
        width: wp('95%'),
        height: hp('20%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp('0.4%') },
        shadowOpacity: 0.3,
        shadowRadius: wp('1.2%'),
        elevation: 5,
        borderWidth: wp('1%'),
        borderColor: '#F2E30B',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    characterImage: {
        width: wp('25%'),
        height: hp('20%'),
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        paddingLeft: wp('3%'),
        justifyContent: 'space-between',
    },
    description: {
        fontSize: wp('3.5%'),
        color: '#000000',
        fontFamily: 'Audiowide-Regular',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('1%'),
    },
    box: {
        borderRadius: wp('2%'),
        padding: wp('1%'),
        alignItems: 'center',
        width: wp('20%'),
        flexDirection: 'row',
        borderColor: '#C59900',
        borderWidth: wp('0.3%'),
        justifyContent: 'space-evenly',
    },
    boxIcon: {
        width: wp('5%'),
        height: wp('5%'),
        marginBottom: hp('0.5%'),
    },
    boxIcon1: {
        width: wp('5%'),
        height: wp('5%'),
        marginBottom: hp('0.5%'),
        resizeMode: 'contain',
    },
    boxText: {
        fontSize: wp('3.5%'),
        fontFamily:'LilitaOne-Regular',
        color: 'white',
        textShadowColor: 'black', 
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 1, 
    },
    playButton: {
        borderRadius: wp('1%'),
        paddingVertical: hp('1%'),
        alignItems: 'center',
        borderWidth:1,
        borderColor:'black',
        marginRight:wp('25%'),
        marginTop:hp('1%')
    },
    playButtonText: {
        fontSize: wp('4%'),
        fontFamily:'LilitaOne-Regular',
        color: 'white',
        textShadowColor: 'black', 
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 1, 
        textTransform:'uppercase',
        letterSpacing:2
    },
    buttonContainer: {
        alignItems: 'flex-start',
        marginTop: hp('1%'),
    },
    button: {
        backgroundColor: '#3E2723',
        borderRadius: wp('2%'),
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('8%'),
        alignItems: 'center',
        borderColor: '#F5D236',
        borderWidth: wp('0.5%'),
    },
    buttonText: {
        fontSize: wp('4.5%'),
        fontFamily: 'Inter_18pt-Bold',
        color: '#FFDC4D',
        letterSpacing: wp('0.5%'),
        textShadowColor: '#F88600',
        textShadowOffset: { width: 0, height: hp('0.3%') },
        textShadowRadius: wp('2%'),
    },
});
