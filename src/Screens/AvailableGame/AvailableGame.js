import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import AvailableCard from '../../Components/AvailableCard'


export default function AvailableGame() {
    const navigation = useNavigation()
    const route = useRoute();
    const { gameData, status } = route.params
    console.log("route.params", gameData, status)
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

    const renderItem = ({ item, index }) => {
        return (<>

            <TouchableOpacity style={styles.container1} onPress={() => {
                navigation.navigate('GameName', { game_id: item._id })
            }} >
                {
                    status === "1" ? (
                        <AvailableCard gameData={item} status={"4"} index={index} />
                    )
                        : (
                            <AvailableCard gameData={item} status={"2"} index={index} />
                        )

                }

            </TouchableOpacity>
        </>)
    }
    return (
        <LinearGradient
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
            <CommonHeader title={"Available Games"} />
            <View style={styles.container}>
                <FlatList
                    data={myGames}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                />
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
        marginTop: hp('3%')
    },
    scrollContainer: {
        marginBottom: hp('5%'),
    },
    container1: {
        flex: 1,
        paddingLeft: wp('5%'),
        marginBottom: hp('2%')
    }
})
