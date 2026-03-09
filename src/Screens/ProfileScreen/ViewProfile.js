import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconics from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { updateImage, updateProfile } from '../../Service/Login';
import AnimatedLoader from '../../Components/AnimatedLoader';
import ImagePicker from 'react-native-image-crop-picker';

const ViewProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { usersData, status } = route.params
  const [loader, setLoader] = useState(false)
  const [profileImage, setProfileImage] = useState(usersData.avatar || null);
  const [isEditing, setIsEditing] = useState({ mobile: false, email: false });
  const [formData, setFormData] = useState({
    name: usersData.name,
    state: usersData.state,
    gender: usersData.gender,
    mobile: usersData.mobile,
    email: usersData.email,
    userImage: usersData.userImage
  });


  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setProfileImage(image);
        uploadImageToServer(image);
      }).catch((error) => {
        console.log(error)
      })
  };

  const uploadImageToServer = async (image) => {
    const data = new FormData();
    data.append('avatar', {
      uri: image.path,
      type: image.type || 'image/jpeg',
      name: image.filename || `aadhar_photo${Date.now()}.jpg`,
    });
    data.append('user_id', usersData._id);
    setLoader(true)
    try {
      const response = await updateImage(data)
      if (response.status == 1) {
        handleInputChange('avatar', response.data.userImage);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoader(false)
    }
  };

  // const saveUpdatedField = async (field, value) => {
  //   const updatedData = { user_id: usersData._id, [field]: value };
  //   setLoader(true);

  //   try {
  //     const response = await updateProfile(updatedData);
  //     if (response.status === 1) {
  //       Toast.show({ text1: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!` });
  //       setIsEditing((prev) => ({ ...prev, [field]: false }));
  //     } else {
  //       Toast.show({ text1: "Update failed.", type: "error" });
  //     }
  //   } catch (error) {
  //     console.error(`Error updating ${field}:`, error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      {
        !loader ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <TouchableOpacity onPress={status === 1 ? (() => navigation.navigate('HomeScreen', { screen: "Profile" })
              ) : (() => navigation.goBack())} style={styles.back}>
                <Iconics name="chevron-back" size={27} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.header}>My Profile</Text>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.imageWrapper}>
                <Image source={formData.userImage
                  ? { uri: formData.userImage }
                  : require('../../../assets/images/Screens/avatar.webp')}
                  style={styles.profileImage} />
                <TouchableOpacity style={styles.cameraIcon}
                onPress={openImagePicker}
                >
                  <Icon name="camera-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>{usersData.name}</Text>
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
                <Icon name="gender-male-female" size={25} color="#000000B2" />
                <TextInput
                  value={usersData.gender == 'F' ? "Female" : "male"}
                  style={styles.input}
                  editable={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="phone-outline" size={25} color="#000000B2" />
                <TextInput
                  value={formData.mobile}
                  // onChangeText={(text) => handleInputChange('mobile', text)}
                  style={styles.input}
                  editable={false}
                />
                {/* <TouchableOpacity 
                style={styles.changeButton}   
                disabled
                onPress={() => saveUpdatedField('mobile',formData.mobile)} 
                >
                  <Text style={styles.changeText}>CHANGE</Text>
                </TouchableOpacity> */}
              </View>

              {/* <View style={styles.inputWrapper}>
                <Icon name="email-outline" size={25} color="#000000B2" />
                <TextInput
                  value={formData.email}
                  style={styles.input}
                  onChangeText={(text) => handleInputChange('email', text)}
                />
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => saveUpdatedField('email', formData.email)}
                >
                  <Text style={styles.changeText}>CHANGE</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Note: All information is fetched from Aadhaar details and is not editable. Only the profile image can be updated.
          </Text>
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
  changeButton: {
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    padding: 8
  },
  changeText: {
    color: '#414BFF',
    fontSize: 12
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8
  },
  saveText: {
    color: '#fff',
    fontSize: 12
  },
  noteContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F5F5F5', // Light background for contrast
    borderRadius: 5,
  },
  noteText: {
    fontSize: 14,
    color: 'red', // Muted color for readability
    lineHeight: 20,
  },
});

export default ViewProfile;
