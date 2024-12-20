import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchField = () => {
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
            style={styles.input}
            // placeholder="Search..."
            placeholderTextColor="#888"
          />
             <Icon name="search" size={20} color="#FFFFFF" style={styles.icon} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height:hp('5%')
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
    marginLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default SearchField;
