import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchField = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3B191033', '#FFFFFF33']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search"
            style={styles.input}
            placeholderTextColor="#999999"
          />
             <Icon name="search" size={25} color="#FFFFFF" style={styles.icon} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height:hp('6%')
      },
      gradientBackground: {
        borderRadius: 30,
        padding: 10,
      },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF' 
  },
});

export default SearchField;
