import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';
import PinkPrizeCard from './PinkPrizeCard';
import GoldenCard from './GoldenCard';
import UpcomingGameCard from './UpcomingGameCard';


const UpcomingGame = (props) => {

    const {gameData} = props;

    const filteredData = gameData.filter((item) => item.status === 1);

    const renderItem = (items) => {
        return (<>
           <UpcomingGameCard items={items} />
        </>)
    }
    return (
        <FlatList
            horizontal
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: hp('45%')
    },
});
export default UpcomingGame;


