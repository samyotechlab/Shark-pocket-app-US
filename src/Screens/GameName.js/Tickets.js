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
import AlertDialog from '../../Components/AlertDialog';
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
    const route = useRoute()
    const { game_id } = route.params


    const handleNavigation = () => {
        navigation.navigate("PlayingInstruction")
    }

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
                console.log('response --->', response);
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
            console.log('Playing ticket:', item._id);
            console.log('Game ID:', item.game_id);
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
                                    {/* Box 1 */}
                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} // Centralizes '#F8CB1F'
                                        style={styles.box}
                                    >
                                        <Image source={coin} style={styles.boxIcon} />
                                        <Text style={styles.boxText}>{item.price}</Text>
                                    </LinearGradient>
                                    {/* Box 2 */}
                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} // Centralizes '#F8CB1F'
                                        style={styles.box}
                                    >
                                        <Image source={ticket} style={styles.boxIcon1} />
                                        <Text style={styles.boxText}>{item.entries}</Text>
                                    </LinearGradient>
                                    {/* Box 3 */}
                                    <LinearGradient
                                        colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        locations={[0, 0.5, 1]} // Centralizes '#F8CB1F'
                                        style={styles.box}
                                    >
                                        <Image source={timer} style={styles.boxIcon} />
                                        <Text style={styles.boxText}>{item.remaining_entries}</Text>
                                    </LinearGradient>
                                </View>
                                <TouchableOpacity style={[styles.playButton, { backgroundColor: isPurchased ? '#EF8523' : '#2DF300' }]} onPress={isPurchased ? handlePlay : handlePurchaseModal}>
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
        paddingLeft: 20,
        marginBottom: 20
    },
    card: {
        // backgroundColor: '#F8B600',
        borderRadius: 6,
        // padding: 5,
        width: '95%',
        height: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 4,
        borderColor: '#F2E30B',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    characterImage: {
        width: 100,
        height: '120%',
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
        // paddingTop:10
    },
    description: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Audiowide-Regular'
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    box: {
        borderRadius: 8,
        padding: 3,
        alignItems: 'center',
        width: 80,
        flexDirection: 'row',
        borderColor: '#C59900',
        borderWidth: 1,
        justifyContent: 'space-evenly'
    },
    boxIcon: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },
    boxIcon1: {
        width: 20,
        height: 20,
        marginBottom: 5,
        resizeMode: 'contain'
    },
    boxText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    playButton: {
        backgroundColor: '#FFD700',
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: 'center',
    },
    playButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    buttonContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3E2723',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderColor: '#F5D236',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Inter_18pt-Bold',
        color: '#FFDC4D',
        letterSpacing: 1,
        textShadowColor: '#F88600',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 15,
    },
})