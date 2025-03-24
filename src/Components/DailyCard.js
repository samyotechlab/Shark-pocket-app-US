import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AvailableCard from './AvailableCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';


const DailyCard = ({ gameData, frequencyStatus }) => {
    const navigation = useNavigation()
    const dailyGameData = gameData?.filter(item => item.frequency === "daily")

    const handleNavigation = (item) => {
        frequencyStatus === "3" ? (
            navigation.navigate('UpcomingGameInfo', { game_id: item._id, game_name: item.title })) :
            (navigation.navigate('GameName', { game_id: item._id, title: item.title }))
    }
    const renderItem = ({ item, index }) => {
        return (<>

            <TouchableOpacity style={styles.container1} onPress={() => {
                handleNavigation(item)
            }}>
                {
                    frequencyStatus === "1" ? (
                        <AvailableCard gameData={item} status={"4"} />
                    ) : (
                        <AvailableCard gameData={item} status={"2"} />
                    )
                }



            </TouchableOpacity>
        </>)
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={dailyGameData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        marginBottom: hp('5%'),
    },
    container1: {
        flex: 1,
        paddingLeft: wp('5%'),
        marginBottom: hp('2%'),
    },
    container: {
        flex: 1,
        marginTop: hp('3%')
    },
});

export default DailyCard;