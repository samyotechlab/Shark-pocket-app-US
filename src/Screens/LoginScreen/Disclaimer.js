import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
import { useNavigation, useRoute } from '@react-navigation/native';
const Disclaimer = () => {
  const route = useRoute();
  const { user_id, game_id } = route.params

  const navigation = useNavigation()
  const [isChecked, setIsChecked] = useState(false);

  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      <View style={styles.card}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Why Need Aadhaar ?</Text> 
          <Text style={styles.text}>
            We need to ensure that you are Above 18 Years old and does not belong to below restricted states –
            Assam, Sikkim, Nagaland, Odisha, Telangana and Andhra Pradesh.
            to ensure compliance with State Gaming laws.
          </Text>
          <Text style={styles.title}>आधार की आवश्यकता क्यों है?</Text> 
          <Text style={styles.text}>
          हमें यह सुनिश्चित करने की आवश्यकता है कि आपकी आयु 18 वर्ष से अधिक है और आप निम्न प्रतिबंधित राज्यों - असम, सिक्किम, नागालैंड, ओडिशा, तेलंगाना और आंध्र प्रदेश से संबंधित नहीं हैं।
          राज्य गेमिंग कानूनों का अनुपालन सुनिश्चित करने के लिए।
          </Text>
          <Text style={styles.title}>आधार का आवश्यक आहे?</Text> 
          <Text style={styles.text}>
          आम्हाला खात्री करावी लागेल की तुमचे वय १८ वर्षांपेक्षा जास्त आहे आणि तुम्ही खालील प्रतिबंधित राज्यांशी संबंधित नाही - आसाम, सिक्कीम, नागालँड, ओडिशा, तेलंगणा आणि आंध्र प्रदेश.
          राज्य गेमिंग कायद्यांचे पालन सुनिश्चित करण्यासाठी.
          </Text>
        </ScrollView>
        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => setIsChecked(!isChecked)}
            isChecked={isChecked}
            checkedCheckBoxColor="#FFD700"
            uncheckedCheckBoxColor="#9B9B9B"
          />
          <Text style={styles.checkboxText}>I agree</Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          disabled={!isChecked}
          onPress={() => {
            navigation.navigate('AadharDetail', { user_id, game_id })
          }}
        >
          <Text style={styles.buttonText}>VERIFY AADHAR CARD</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#632E1C',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    height: 600,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
    marginTop:10
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  aadharText:{
    textAlign:'center',
    fontSize:16,
  }
});
export default Disclaimer;