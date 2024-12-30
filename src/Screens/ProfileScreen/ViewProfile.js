import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../../assets/images/Screens/profile.jpeg';
import Iconics from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ViewProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute()
  const {userData} = route.params
  
  console.log("userData",userData)
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Iconics name="chevron-back" size={27} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.header}>My Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={profile}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
            <Icon name="camera-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Amit Sharma</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="account-outline" size={25} color="#000000B2" />
          <TextInput value={userData.name}  style={styles.input} />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="map-marker-outline" size={25} color="#000000B2" />
          <TextInput value={userData.state}  style={styles.input} />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="gender-male" size={25} color="#000000B2" />
          <TextInput value={userData.gender}  style={styles.input} />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="phone-outline" size={25} color="#000000B2" />
          <TextInput value={userData.mobile} style={styles.input} />
          <TouchableOpacity style={{backgroundColor:'#F1F1F1',borderRadius:20,padding:10}}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="email-outline" size={25} color="#000000B2" />
          <TextInput value="Email ID" style={styles.input} />
          <TouchableOpacity style={{backgroundColor:'#F1F1F1',borderRadius:20,padding:10}}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  header: {
    fontSize: 20,
    marginVertical: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginHorizontal:20
  },
  profileContainer: {
    alignItems: 'center',
    position: 'relative', 
  },
  imageWrapper: {
    width: wp('36%'),
    height: wp('36%'),
    borderRadius: wp('18%'),
    borderWidth: 5,
    borderColor: '#E59D00',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraIcon: {
    position: 'absolute',
    top: wp('22%'), 
    right: wp('1%'),
    backgroundColor: '#FFC107',
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#101010CC',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  changeText: {
    color: '#414BFFCC',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
});

export default ViewProfile;
