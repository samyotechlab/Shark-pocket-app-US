import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinkPrizeCard from './PinkPrizeCard';
import GoldenCard from './GoldenCard';

const { width } = Dimensions.get('window');

const MyGame = (props) => {
    const { myGame } = props;
    const [carouselData, setCarouselData] = useState([]);

    useEffect(() => {
        setCarouselData(myGame);
    }, [myGame]);

    const renderItem = ({ item, index }) => (
        <View style={styles.cardContainer}>
            {index % 2 === 0 ? (
                <PinkPrizeCard item={item} />
            ) : (
                <GoldenCard item={item} />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {carouselData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No games or tickets are currently available.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={carouselData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    twoCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('2%'),
    },
    cardContainer: {
        width: width * 0.43,
        marginHorizontal: wp('1%'),
    
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
