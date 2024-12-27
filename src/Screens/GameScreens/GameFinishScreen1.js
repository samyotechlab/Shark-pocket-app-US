import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function GameFinishScreen({ isVisible, onClose, gameHistoryData }) {
  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
       <LinearGradient colors={['#F38424', '#F7A552', '#F9D479']}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
     style={styles.underContainer}>
      <View style={styles.headerContainer}>
        <LinearGradient 
        colors={['#F38424', '#F7C929', '#F9D479']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{flex:1,borderRadius:wp('2%'),margin:wp('1.5%'),width:wp('77%')}}>
        <View style={styles.score}>
        <Text style={styles.headerText}>YOUR SCORE</Text>
        </View>
        <View style={styles.scoreBox}>
          <LinearGradient 
          colors={['#00E000', '#00B300', '#00B300']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
           style={styles.scoreBox1}>
          <Image source={{ uri: 'https://img.icons8.com/emoji/48/coin-emoji.png' }} style={styles.coinImage} />
          <Text style={styles.scoreText}>1564</Text>
          </LinearGradient>
        </View>
        </LinearGradient>
      </View>

      <View style={{flex:2,margin:wp('3%')}}>
              <ScrollView style={styles.tableContainer}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.rowText}>Double</Text>
              <Text style={styles.rowText}>18*2</Text>
              <Text style={styles.rowText}>36</Text>
            </View>
          ))}
      </ScrollView>
      <View style={{flex:0.3,justifyContent:'center',alignItems:'center'}}>
 <TouchableOpacity style={styles.homeButton}>
        <Text style={styles.homeButtonText}>HOME</Text>
      </TouchableOpacity>
      </View>
      </View>



     
    </LinearGradient>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderRadius: hp('2%'),
    margin: wp('5%'),
    backgroundColor:'#F2E30B',
    
  },
  underContainer:{
    flex:1,
    margin:10,
    borderRadius:10,
    width:wp('87.5%'),
  },
  container1: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: wp('5%'),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    backgroundColor:'#F2E30B'
  },
  headerContainer: {
    flex:0.5,
    backgroundColor:'#F2E30B',
    margin:wp('4%'),
    borderRadius:wp('2%'),
    borderColor:'#000000',
    borderWidth:2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 1,
  },
  headerText: {
    fontSize: 28,
    fontFamily:'LilitaOne-Regular',
    color: '#FFF',
    textAlign:'center',
  },
  score :{
    flex:1.5,
    backgroundColor:'#F2BB00',
    borderRadius:wp('10%'),
    margin:wp('3.5%'),
    borderColor:'#000000',
    borderWidth:1,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems:'center',
    justifyContent:'center',
  },
  scoreBox: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  scoreBox1:{
    height:hp('6%'),
    width:wp('35%'),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:2
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  coinImage: {
    width: 30,
    height: 30,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#FFF',
  },
  rowText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  homeButton: {
    // flex:1.5,
    backgroundColor:'#F2BB00',
    borderRadius:wp('10%'),
    margin:wp('3.5%'),
    borderColor:'#000000',
    borderWidth:1,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:wp('3%'),
    paddingHorizontal:wp('13%')
  },
  homeButtonText: {
    fontSize: 28,
    fontFamily:'LilitaOne-Regular',
    color: '#FFF',
    textAlign:'center',
  },
});
