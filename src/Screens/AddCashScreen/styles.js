import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, SPACING, FONTS, SIZES } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBrown,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkBrown,
    padding: SPACING.medium,
    paddingTop: hp('5%'),
    paddingBottom: hp('12%'),
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 0.6,
    fontSize: SIZES.title,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    textAlign: 'center',
  },
  wallet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderRadius: wp('2%'),
  },
  walletIcon: {
    width: hp('3%'),
    height: hp('3%'),
    marginRight: SPACING.small,
  },
  walletText: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: SIZES.title,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  addCashContainer: {
    backgroundColor: COLORS.white,
    borderRadius: wp('3%'),
    marginTop: -hp('10%'),
    marginHorizontal: SPACING.medium,
    padding: SPACING.medium,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: wp('2%'),
    elevation: 4,
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    marginRight: wp('10%'),
    width: wp('85%'),
    borderBottomColor: 'black',
    marginVertical: wp('3%'),
    border: 1,
    borderRadius: wp('3%'),
    paddingBottom: hp(0.7),

  },
  label: {
    position: 'absolute',
    top: -hp('1%'),
    left: wp('30%'),
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.small,
    fontSize: hp('1.5%'),
    color: COLORS.gray,
    zIndex: 1,
  },
  input: {
    fontSize: SIZES.input,
    textAlign: 'center',
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: wp('3%'),
    padding: SPACING.small,
    backgroundColor: COLORS.white,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.medium,
  },
  amountButton: {
    borderWidth: 1,
    borderColor: '#000000B2',
    borderRadius: wp('2%'),
    padding: SPACING.small,
    minWidth: wp('15%'),
    alignItems: 'center',
  },
  amountText: {
    fontSize: SIZES.text,
    fontFamily: FONTS.medium,
    color: '#000000B2',
  },
  addCashButton: {
    backgroundColor: COLORS.green,
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    borderColor: COLORS.white,
    borderWidth: 2,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    marginHorizontal: SPACING.medium,
  },
  addCashButtonText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 2,
    textShadowColor: '#F88600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.large,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: SIZES.icon,
    height: hp('4%'),
    marginBottom: SPACING.small,
  },
  featureText: {
    fontSize: wp('3%'),
    textAlign: 'center',
    color: COLORS.black,
  },
  referralBanner: {
    margin: SPACING.medium,
  },
  referralImage: {
    height: hp('20%'),
    width: wp('90%'),
    resizeMode: 'contain',
  },
});

export default styles;