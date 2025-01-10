import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchField = ({ onSearch ,gameData = [], filteredData = []}) => {
  console.log(gameData)
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };
  const toggleSearch = () => {
    if (gameData.length === 0 || filteredData.length === 0) {
      return; 
    }
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
      onSearch('');
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 2.5 }}>
        {
          isSearchActive ? (<LinearGradient
            colors={['#3B191033', '#FFFFFF33', '#FFFFFF33']}
            style={styles.gradientBackground}
          >
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.input}
              placeholderTextColor="#999999"
            />
          </LinearGradient>) : (null)
        }

      </View>

      <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
        <Icon name={isSearchActive ? 'close' : 'search'} size={25} color="#FFFFFF" style={styles.icon} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

  },
  gradientBackground: {
    flex: 1,
    borderRadius: wp('10%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  icon: {
    marginHorizontal: wp('3%')
  },
  input: {
    flex: 1,
    fontSize: hp('2%'),
    color: '#FFFFFF'
  },
  searchIcon: {
    flex: 0.5,
    justifyContent: 'center',
  }
});

export default SearchField;

