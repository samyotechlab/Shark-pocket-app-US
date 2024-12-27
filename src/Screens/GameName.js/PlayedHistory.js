import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import trophy from '../../../assets/images/Screens/trophy2.png'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PlayedHistory = () => {
  const myGames = [{
    id: 1,
    date: '27-02-2024',
    time: '02:23 Pm',
    score: '2236.2',
  }, {
    id: 2,
    date: '27-02-2024',
    time: '02:23 Pm',
    score: '2236.2',
  }, {
    id: 3,
    date: '27-02-2024',
    time: '02:23 Pm',
    score: '2236.2',
  }, {
    id: 4,
    date: '27-02-2024',
    time: '02:23 Pm',
    score: '2236.2',
  }]

  const renderItem = ({ item }) => {
    return (
      <>
       <View style={styles.container1} >
        <View style={styles.cardOuterContainer}>
          <LinearGradient
            colors={['#F38424', '#F7A552', '#F9D479']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.cardContainer}>
            {/* Trophy Icon */}
            <Image
              source={trophy}
              style={styles.trophyIcon}
            />

            {/* Details Section */}
            <View style={styles.detailsContainer}>
              <Text style={styles.titleText}>Played On</Text>
              <View style={styles.dateTimeRow}>
                <Text style={styles.dateText}>{item.date}{item.time}</Text>
                {/* <Text style={styles.timeText}>02:23 Pm</Text> */}
              </View>
            </View>

            {/* Score */}
            <Text style={styles.scoreText}>{item.score}</Text>
          </LinearGradient>
        </View>
        </View>
      </>
    )
  }
  return (

    <View style={styles.container}>
      <FlatList
        data={myGames}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  cardOuterContainer: {
    backgroundColor: '#F2E30B',
    borderRadius: 12,
    padding: 4,


  },
          container:{
                flex:1,
            },
            container1: {
              flex: 1,
              margin:10
          },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  trophyIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: '#2A1610',
    fontSize: 18,
    fontFamily: 'Audiowide-Regular',
    marginBottom: 5,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#000000B2',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  timeText: {
    color: '#000',
    fontSize: 14,
  },
  scoreText: {
    color: '#2A1610',
    fontSize: 24,
    fontFamily: 'Audiowide-Regular',
  },
});

export default PlayedHistory;
