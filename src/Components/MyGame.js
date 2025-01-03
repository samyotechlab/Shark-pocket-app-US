import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinkPrizeCard from './PinkPrizeCard';
import GoldenCard from './GoldenCard';


const MyGame = (props) => {

    const { myGame } = props

    const renderItem = (items) => {
        const { item, index } = items
        return (<>
            {
                index % 2 == 0 ? (<PinkPrizeCard item={item} />) : (<GoldenCard item={item} />)
            }
        </>)
    }
    return (
        <>
            {
                myGame.length == 0 ? (<>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No games or tickets are currently available.
                        </Text>
                    </View>
                </>) : (<>
                    <FlatList
                        horizontal
                        data={myGame}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                </>)
            }
        </>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: hp('45%')
    },
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
export default MyGame;


