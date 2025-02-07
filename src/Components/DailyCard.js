import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AvailableCard from './AvailableCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const DailyCard = ({gameData}) => {
    const dailyGameData = gameData?.filter(item => item.frequency === "daily")
        const renderItem = ({ item, index }) => {
            return (<>
    
                <TouchableOpacity style={styles.container1} >
                                <AvailableCard gameData={item} status={"2"} />
                 
    
                </TouchableOpacity>
            </>)
        }
    return (
        <FlatList
            data={dailyGameData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        />
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
        }
});

export default DailyCard;