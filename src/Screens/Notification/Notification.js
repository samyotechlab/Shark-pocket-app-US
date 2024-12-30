import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {truncateText} from '../../Utillities';
import {notificationList} from '../../Service/Notification';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import {Loader} from '../../Components/Loader';
import CommonHeader from '../../Components/CommonHeader';
export default function Notification() {
  const [notification, setNotificationData] = useState([]);
  const [loader, setLoader] = useState(false);

  const notificationData = async () => {
    setLoader(true)
    try {
      const response = await notificationList();
      console.log('response', response);
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
        <View
          style={{
            flex: 1,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#CDCDCD',
            marginBottom: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={'#414141'}
            />
          </View>
          <View style={{flex: 1.5}}>
            <Text
              style={{
                color: '#414141',
                fontSize: 17,
                fontWeight: '600',
                marginHorizontal: 10,
                letterSpacing: 0.5,
              }}>
              {item.title}
            </Text>
            <Text
              style={{color: '#636363', marginHorizontal: 10, fontSize: 16}}>
              {item.created_at}
            </Text>
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
      <View style={{flex: 1, margin: 15}}>
        {notification ? (
          !loader ? (
            <FlatList
              data={notification}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            />
          ) : (
            <Loader />
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
  scrollContainer: {
    marginBottom: 10,
  },
});






