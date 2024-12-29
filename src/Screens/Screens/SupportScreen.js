import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from '../../Components/CommonHeader'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SupportScreen() {

    const [expandedIndex, setExpandedIndex] = useState(null); // State to track the expanded dropdown

    const categories = [
      {
        title: 'Technical',
        content: 'Here you can find solutions to technical issues.',
      },
      {
        title: 'Games play assistance',
        content: 'Need help with gameplay? We’ve got you covered.',
      },
      {
        title: 'Account Management',
        content: 'Manage your account settings and preferences here.',
      },
      {
        title: 'Feedback and Suggestion',
        content: 'Share your feedback or suggestions with us.',
      },
    ];

    const toggleDropdown = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index); // Toggle the dropdown for the selected index
      };
  return (
    <View style={styles.maincontainer}>
    <CommonHeader title={'Support'} />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greetingText}>Hello Amit,</Text>
      <Text style={styles.infoText}>
        Select from any category below to get us started helping you.
      </Text>
      <TouchableOpacity style={styles.previousQuestions}>
        <Text style={styles.linkText}>See previous questions</Text>
      </TouchableOpacity>

      {categories.map((category, index) => (
        <View key={index} style={styles.dropdownContainer}>
          {/* Dropdown Header */}
          <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(index)}>
            <Text style={styles.categoryText}>{category.title}</Text>
            <Icon
              name={expandedIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          {/* Dropdown Content */}
          {expandedIndex === index && (
            <View style={styles.dropdownContent}>
              <Text style={styles.contentText}>{category.content}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#361911',
      },
      container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
      },
      previousQuestions: {
        marginBottom: 20,
      },
      linkText: {
        fontSize: 16,
        color: '#007BFF',
      },
      dropdownContainer: {
        marginBottom: 10,
      },
      dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e2e2e2',
      },
      categoryText: {
        fontSize: 16,
        color: '#000',
      },
      dropdownContent: {
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginTop: 5,
      },
      contentText: {
        fontSize: 14,
        color: '#555',
      },
})