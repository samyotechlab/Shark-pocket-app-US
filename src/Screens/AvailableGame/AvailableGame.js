import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import AvailableCard from '../../Components/AvailableCard'
import DailyWeeklyBar from '../../Components/DailyWeeklyBar'
import DailyCard from '../../Components/DailyCard'
import WeeklyCard from '../../Components/WeeklyCard'

export default function AvailableGame() {
    const navigation = useNavigation()
    const route = useRoute();
    const [title, setTitle] = useState('')
    const [disabled, setDisabled] = useState(false)
    const { gameData, status } = route.params
    let myGames = []
    if (status === "1") {
        myGames = gameData;
    }
    else if (status === "2") {
        myGames = gameData.filter(game => game?.status === 3);
    } else if (status === "3") {
        myGames = gameData.filter(game => game?.status === 1);
    } else if (status === "4") {
        myGames = gameData.filter(game => game?.status === 4);
    } else {
        myGames = gameData.filter(game => game?.status === 3);
    }

    useEffect(() => {
        if (status === "1") {
            setTitle('My Game');
        } else if (status === "2") {
            setTitle('Available Games');
        } else if (status === "3") {
            setTitle('Upcoming Games');
        } else if (status === "4") {
            setTitle('Game History');
        }else if(status === "5"){
            setTitle('Daily Game')
        }else if(status === "6"){
            setTitle('Weekly Game')
        }
    }, [status]);

    const handleNavigation = (item) => {
        if (status === "4") {
            navigation.navigate('AllGameName', { game_id: item._id, game_name: item.title })
        }else if (status === "3"){
            navigation.navigate('UpcomingGameInfo', { game_id: item._id, game_name: item.title })
        }
         else {
            navigation.navigate('GameName', { game_id: item._id })
        }
    }
    const renderItem = ({ item, index }) => {
        return (<>

            <TouchableOpacity style={styles.container1} onPress={() => {
                handleNavigation(item)
            }}
                disabled={disabled}
            >
                {
                    status === "1" ? (
                        <AvailableCard gameData={item} status={"4"}  />
                    )
                        : (
                            <AvailableCard gameData={item} status={"2"} />
                        )

                }

            </TouchableOpacity>
        </>)
    }
    return (
        <>
            {
                status === "2" || status === "1" ?
                    (
                        <LinearGradient
                            colors={['#361911', '#361911', '#6A1700']}
                            style={styles.linearGradient}>
                                  <DailyWeeklyBar gameData={gameData} />
                                {/* {
                                    status === "2" ? (
                                        <DailyWeeklyBar gameData={gameData} />
                                    ) : (
                                        <DailyWeeklyBar gameData={gameData} />
                                    )
                                } */}
                          
                        </LinearGradient>
                    ) : (

                        <LinearGradient
                            colors={['#361911', '#361911', '#6A1700']}
                            style={styles.linearGradient}>
                            <CommonHeader title={title ? title : 'Available Games'} />
                            {
                                status === "5"?( <DailyCard  gameData={gameData}/>): 
                                status === "6" ?(<WeeklyCard  gameData={gameData}/>):
                                (<View style={styles.container}>
                                    <FlatList
                                        data={myGames}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.scrollContainer}
                                    />
                                </View>)
                            }
                           
                            
                        </LinearGradient>
                    )
            }

        </>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: hp('3%')
    },
    scrollContainer: {
        marginBottom: hp('5%'),
    },
    container1: {
        flex: 1,
        paddingLeft: wp('5%'),
        marginBottom: hp('2%'),
    }
})
