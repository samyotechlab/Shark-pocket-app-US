import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box'
import { useNavigation, useRoute } from '@react-navigation/native';
const Disclaimer = () => {
    const route = useRoute();
    const {user_id,game_id} = route.params

    const navigation  = useNavigation()
  const [isChecked, setIsChecked] = useState(false);

  return (
     <LinearGradient  
            colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
      <View style={styles.card}>
        <Text style={styles.title}>Disclaimer</Text>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit purus purus massa gravida.
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
          onPress={()=>{
            navigation.navigate('AadharDetail',{user_id,game_id})
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
    height: 550,
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
    textAlign: 'justify',
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
});
export default Disclaimer;