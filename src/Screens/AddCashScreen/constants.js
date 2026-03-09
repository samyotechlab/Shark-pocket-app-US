import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  green: '#4FBF03',
  darkBrown: '#361911',
  gray: '#555',
  lightGray: '#aaa',
  borderGray: '#ddd',
};

export const SPACING = {
  small: wp('2%'),
  medium: wp('4%'),
  large: wp('8%'),
};

export const FONTS = {
  bold: 'Inter_18pt-Bold',
  medium: 'Inter_18pt-Medium',
  semiBold: 'Montserrat-SemiBold',
  regular: 'LuckiestGuy-Regular',
};

export const SIZES = {
  text: wp('4%'),
  title: wp('5%'),
  input: hp('2%'),
  icon: wp('8%'),
};