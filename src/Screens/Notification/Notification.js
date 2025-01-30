import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {notificationList} from '../../Service/Notification';
import CommonHeader from '../../Components/CommonHeader';
import AnimatedLoader from '../../Components/AnimatedLoader';
import { useRoute } from '@react-navigation/native';
export default function Notification() {
  const route = useRoute()
  const {user_id} = route
  const [notification, setNotificationData] = useState([]);
  const [loader, setLoader] = useState(false);

  const notificationData = async () => {
    setLoader(true)
    try {
      const response = await notificationList(user_id);
      if (response) {
        setNotificationData(response.data);
      }
    } catch (error) {
      console.log('error', error);
    }finally{
      setLoader(false)
    }
  };
  useEffect(() => {
    notificationData();
  }, []);

  
  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
      <Ionicons
              name="notifications-outline"
              size={25}
              color={'#000000'}
            />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.date}>{item.created_at}</Text>
      </View>
    </View>
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#361911', paddingBottom: wp('4%')}}>
        <CommonHeader title={'Notification'} />
      </View>
      <View style={styles.container}>
        {notification ? (
          !loader ? (

            <FlatList
              data={notification}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <AnimatedLoader />
          )
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: hp(2)}}>No data found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: wp('4%'),
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('0.5%'), 
  },
  iconContainer: {
    width: wp('10%'), 
    height: wp('10%'), 
    borderRadius: wp('5%'), 
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'), 
  },
  icon: {
    width: wp('6%'), 
    height: wp('6%'),
    tintColor: '#000',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp('4%'),
    fontFamily:'Montserrat-Medium',
    color: '#696969',
  },
  date: {
    fontSize: wp('3%'), 
    color: '#696969',
    fontFamily:'Montserrat-Medium',
  },
  separator: {
    height: hp('0.1%'),
    backgroundColor: '#e0e0e0',
    marginVertical: hp('1%'),
    width:wp('80%'),
    alignSelf:'center'
  },
});






