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
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { updateProfile } from '../../Service/Login';
import Toast from 'react-native-toast-message';

const ViewProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const navigation = useNavigation();
  const route = useRoute()
  const [gender, setGender] = useState([
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
  ]);
  const { userData } = route.params
  const [formData, setFormData] = useState({
    name: userData.name,
    state: userData.state,
    gender: userData.gender,
    mobile: userData.mobile,
    email: userData.email
  });

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response) => {
        if (response.assets && response.assets.length > 0) {
          const imageUri = response.assets[0].uri;
          setProfileImage(imageUri);


          const updatedData = new FormData();
          updatedData.append('user_id', userData._id);
          updatedData.append('profile_image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'profile_image.jpg',
          });

          try {
            const res = await updateProfile(updatedData);
            if (res.status === 1) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Profile Update',
                text2: 'Profile Update Successfully',
                visibilityTime: 3000
              });
            } else {
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error!',
                text2: 'failed To update profile image',
                visibilityTime: 3000,
              });
            }
          } catch (error) {
            console.error('Error updating profile image:', error);
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error!',
              text2: 'Authentication Failed',
              visibilityTime: 3000,
            });
          }
        }
      }
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMobileUpdate = async () => {
    const updatedData = new FormData();
    updatedData.append('user_id', userData._id);
    updatedData.append('mobile', formData.mobile);

    try {
      const res = await updateProfile(updatedData);
      if (res.status === 1) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Profile Update',
          text2: 'Profile Update Successfully',
          visibilityTime: 3000
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: 'Authentication Failed',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating mobile number:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: 'Authentication Failed',
        visibilityTime: 3000,
      });
    }
  };

  const handleEmailUpdate = async () => {
    const updatedData = {
      user_id: userData._id,
      email: formData.email,
    };
    try {
      const res = await updateProfile(updatedData);
      if (res.status === 1) {
        Alert.alert('Success', 'Email updated successfully');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: 'Failed To Update Email',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating email:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: 'Authentication Failed',
        visibilityTime: 3000,
      });
    }
  };




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
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
        <Text style={styles.profileName}>{userData.name}</Text>
      </View>

      {/* Input Fields */}
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
            value={userData.gender}
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
          <TouchableOpacity style={{ backgroundColor: '#F1F1F1', borderRadius: 20, padding: 10 }} onPress={handleMobileUpdate}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="email-outline" size={25} color="#000000B2" />
          <TextInput value={formData.email} style={styles.input}  onChangeText={(text) => handleInputChange('email', text)}/>
          <TouchableOpacity style={{ backgroundColor: '#F1F1F1', borderRadius: 20, padding: 10 }} onPress={handleEmailUpdate}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>
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
