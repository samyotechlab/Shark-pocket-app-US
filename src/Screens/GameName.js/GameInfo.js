import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const GameInfo = ({gameData}) => {
    console.log("gameData",gameData)
    
    const renderItem = ({item})=>{
        console.log("ite,",item)
      return (
        <View style={styles.container1}>
        <LinearGradient
        colors={['#F38424', '#F7A552', '#F9D479']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.gradient}
    >
        <View style={styles.container2}>
            <Text style={styles.text}>{item}</Text>
        </View>

    </LinearGradient>
    </View>
      )
    
    }
    return (
     <View style={styles.container}>
                <FlatList
                  data={gameData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
     </View>   
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
        container1: {
          flex: 1,
          margin: wp('1%')
        },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default GameInfo;