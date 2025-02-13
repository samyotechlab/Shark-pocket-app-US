import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        <>
        {
            filteredData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No games or tickets are currently available.
                    </Text>
                </View>
            ) : (        <FlatList
                horizontal
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
            />)
        }
     </>
    );
};
const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: hp('2%'),
    },
});
export default UpcomingGame;


