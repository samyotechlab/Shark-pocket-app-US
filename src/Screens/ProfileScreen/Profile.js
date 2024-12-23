// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function ProfileScreen() {
//   return (
//     <View>
//       <Text>ProfileScreen</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})

import React, {useState} from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
const SharkPocketScreen = () => {
  const data2 = [
    {
      title: 'Notification',
      icon: 'bell-outline',
    },
    {
      title: 'Game History',
      icon: 'gamepad-variant-outline',
    },
    {
      title: 'Bank Account',
      icon: 'bank-outline',
    },
    {
      title: 'Pan verification',
      icon: 'security',
    },
    {
      title: 'Aadhar Verification',
      icon: 'security',
    },
    {
      title: 'Contact us',
      icon: 'phone-outline',
    },
    {
      title: 'How To Play',
      icon: 'message-arrow-right-outline',
    },
    {
      title: 'Refund and Policy',
      icon: 'undo',
    },
    {
      title: 'Terms & Conditions',
      icon: 'bookmark-outline',
    },
    {
      title: "FAQ's",
      icon: 'bookmark-outline',
    },
    {
      title: 'Support',
      icon: 'help-circle-outline',
    },
    {
      title: 'Log out',
      icon: 'logout',
    },
  ];
  const _renderCard = ({item}) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View>
          <LinearGradient
            colors={['#3D1911', '#6A1701']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.cardImageContainer}>
            <Icon
              name={item.icon}
              size={wp('5%')}
              color="#fff"
              style={styles.cardImage}
            />
          </LinearGradient>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{item.title}</Text>
        </View>
        <View style={styles.cardArrowContainer}>
          <Icon
            name="chevron-right"
            size={wp('6%')}
            color="#361911"
            style={styles.arrowImage}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View colors={['#3D1911', '#6A1701']} style={styles.profileContainer}>
          <View>
            <Text style={styles.profileTitle}>Profile</Text>
          </View>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileImageText}>Image</Text>
            </View>
            <View style={styles.profileDetailsContainer}>
              <View>
                <Text style={styles.profileName}>amit123</Text>
                <Text style={styles.profilePhone}>(+91) 8789546587</Text>
                <View style={styles.profileInfoContainer}>
                  <Text style={styles.profileFullName}>Amit Sharma</Text>
                  <Text style={styles.profileDot}>...</Text>
                </View>
              </View>
              <View style={styles.profileActionContainer}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </View>
            </View>
          </View>
        </View>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <View style={styles.flatListContainer}>
              <FlatList
                data={data2}
                renderItem={_renderCard}
                keyExtractor={(_item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
export default SharkPocketScreen;
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    marginBottom: hp('5%'),
  },
  profileContainer: {
    padding: wp('4%'),
    backgroundColor: '#361911',
  },
  profileTitle: {
    fontSize: wp('5%'),
    fontWeight: '500',
    marginBottom: hp('3%'),
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  profileImageContainer: {
    backgroundColor: '#9C4831',
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    borderWidth: 3,
    borderColor: '#FFB700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: 'white',
    fontSize: wp('3.5%'),
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: wp('5%'),
  },
  profileName: {
    color: 'white',
    fontSize: wp('5%'),
    marginBottom: hp('0.6%'),
    fontWeight: '500',
  },
  profilePhone: {
    color: 'white',
    marginBottom: hp('0.6%'),
    fontSize: wp('3%'),
  },
  profileInfoContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  profileFullName: {
    color: 'white',
    fontSize: wp('3%'),
  },
  profileDot: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: wp('50%'),
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1.5%'),
    marginLeft: wp('2%'),
    textAlign: 'center',
    lineHeight: hp('1.6%'),
  },
  profileActionContainer: {
    borderColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewProfileText: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp('5%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    fontWeight: '500',
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
  cardContainer: {
    height: hp('5.8%'),
    borderBottomWidth: 0.8,
    borderBottomColor: 'lightgray',
    marginLeft: wp('4%'),
    marginTop: hp('2%'),
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    marginRight: wp('4%'),
    borderWidth: 1,
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
    backgroundColor: '#361911',
  },
  cardImage: {
    height: hp('6%'),
    width: wp('6%'),
    paddingTop: hp('1.75%'),
    paddingLeft: wp('0.6%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardTextContainer: {
    width: wp('70%'),
  },
  cardText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: 'black',
    opacity: 0.7,
  },
  cardArrowContainer: {
    width: wp('20%'),
  },
  arrowImage: {
    height: hp('6%'),
    width: wp('6%'),
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#596AFD',
    width: '90%',
    alignContent: 'center',
    marginTop: hp('20%'),
    marginLeft: wp('5%'),
    height: hp('8%'),
    borderRadius: 30,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: wp('5%'),
    color: 'white',
    marginLeft: wp('30%'),
    marginTop: hp('1.5%'),
  },
});






