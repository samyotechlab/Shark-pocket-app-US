import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
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
            {carouselData.length <= 2 ? (
                <View style={styles.twoCardsContainer}>
                    {carouselData.map((item, index) => (
                        <View key={index} style={styles.cardContainer}>
                            {index % 2 === 0 ? (
                                <PinkPrizeCard item={item} />
                            ) : (
                                <GoldenCard item={item} />
                            )}
                        </View>
                    ))}
                </View>
            ) : carouselData.length > 2 ? (
                <Carousel
                    data={carouselData}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width * 0.45}
                    loop={true} 
                    autoplay={true} 
                    autoplayInterval={2000}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.7}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No games or tickets are currently available.
                    </Text>
                </View>
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
