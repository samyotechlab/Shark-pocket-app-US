import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../../assets/images/Screens/profile.jpeg';
import Iconics from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { updateProfile } from '../../Service/Login';
import AnimatedLoader from '../../Components/AnimatedLoader';

const ViewProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    state: userData.state,
    gender: userData.gender,
    mobile: userData.mobile,
    email: userData.email
  });


  const handleInputChange = (field, value) => {
    console.log("value", value)
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handelUpdate = async () => {
    console.log("formData",formData.email)
    setLoader(true);
    try {
      const formData = new FormData();
      console.log("formData========>",formData)
      formData.append('user_id', userData._id);
      formData.append('contact_number', formData.mobile);
      formData.append('email', formData.email);
  
      // Append avatar if available
      if (formData.avatar) {
        formData.append('avatar', {
          uri: formData.avatar.uri,
          name: formData.avatar.fileName,
          type: formData.avatar.type,
        });
      }
      console.log(formData)
      const response = await updateProfile(formData);
      console.log(response)}
       catch (error) {
      console.log("error", error)
    } finally {
      setLoader(false)
    }
  }


  return (
    <View style={styles.container}>
      {
        !loader ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Iconics name="chevron-back" size={27} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.header}>My Profile</Text>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={profile}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.cameraIcon}>
                  <Icon name="camera-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>{userData.name}</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="account-outline" size={25} color="#000000B2" />
                <TextInput
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  style={styles.input}
                  editable={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="map-marker-outline" size={25} color="#000000B2" />
                <TextInput
                  value={formData.state}
                  onChangeText={(text) => handleInputChange('state', text)}
                  style={styles.input}
                  editable={false}
                />
              </View>

              <View style={[styles.inputWrapper, { zIndex: 1000 }]}>
                <Icon name="gender-male" size={25} color="#000000B2" />
                <TextInput
                  value={userData.gender == 'F' ? "Female" : "male"}
                  style={styles.input}
                  editable={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="phone-outline" size={25} color="#000000B2" />
                <TextInput
                  value={formData.mobile}
                  onChangeText={(text) => handleInputChange('mobile', text)}
                  style={styles.input}
                />
                <TouchableOpacity style={{ backgroundColor: '#F1F1F1', borderRadius: 20, padding: 10 }} onPress={handelUpdate}  >
                  <Text style={styles.changeText}>CHANGE</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="email-outline" size={25} color="#000000B2" />
                <TextInput value={formData.email} style={styles.input} onChangeText={(text) => handleInputChange('email', text)} />
                <TouchableOpacity style={{ backgroundColor: '#F1F1F1', borderRadius: 20, padding: 10 }} onPress={handelUpdate} >
                  <Text style={styles.changeText}>CHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (<AnimatedLoader />)
      }

      <Toast ref={Toast.setRef} />
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
    marginHorizontal: 20
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
    paddingVertical: 6,
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
