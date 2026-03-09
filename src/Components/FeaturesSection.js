import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iconic from 'react-native-vector-icons/Ionicons';
import Tds from '../../assets/images/Screens/tds.png';

const FeaturesSection = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Image source={Tds} style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Download TDS Certificate</Text>
        <View style={styles.arrowContainer}>
          <Iconic name="chevron-forward-outline" size={hp('2%')} color={'black'} />
        </View>
      </TouchableOpacity>
      <View style={styles.featuresRow}>
        <View style={styles.feature}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/security-checked.png' }}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>100% Safe{'\n'}Payments</Text>
        </View>
        <View style={styles.feature}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/flash-on.png' }}
            style={styles.featureIcon}
            tintColor="#4FBF03"
          />
          <Text style={styles.featureText}>Instant Deposit{'\n'}And Withdrawal</Text>
        </View>
        <View style={styles.feature}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/group.png' }}
            style={styles.featureIcon}
            tintColor="#4FBF03"
          />
          <Text style={styles.featureText}>Trusted by{'\n'}15cr+ Players</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: 'white',
    marginTop: hp('1%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#00000033',
    borderWidth: wp('0.5%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('5%'),
  },
  iconContainer: {
    marginRight: wp('3%'),
  },
  icon: {
    width: wp('6%'),
    height: hp('3%'),
  },
  buttonText: {
    flex: 1,
    fontSize: hp('1.8%'),
    fontFamily: 'Montserrat-Medium',
    color: '#696969',
  },
  arrowContainer: {
    marginLeft: wp('2%'),
  },
  featuresRow: {
    margin: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: wp('8%'),
    height: hp('4%'),
    marginBottom: hp('1%'),
  },
  featureText: {
    fontSize: wp('3%'),
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: wp('5%'),
  },
});

export default FeaturesSection;