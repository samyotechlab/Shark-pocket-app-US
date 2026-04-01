import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 0.5,
    backgroundColor: '#361911',
  },
  listContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
  },
  profileTab: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginHorizontal: hp('2%'),
  },
  profileTitle: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: hp('2%'),
  },
  profileImageContainer: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    borderWidth: 3,
    borderColor: '#FFB700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('10%'),
    resizeMode: 'cover',
  },
  profileDetailsContainer: {
    justifyContent: 'center',
  },
  profileName: {
    color: 'white',
    fontSize: wp('5%'),
    marginBottom: hp('0.6%'),
    fontFamily: 'Montserrat-Bold',
  },
  profilePhone: {
    color: 'white',
    marginBottom: hp('0.6%'),
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Medium',
  },
  profileFullName: {
    color: 'white',
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Medium',
  },
  profileActionContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('0.7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewProfileText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: wp('3.5%'),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginVertical: hp('0.4%'),
    // backgroundColor:'red'
  },

    iconBorderWrapper: {
    width:          wp('11%'),
    height:         wp('11%'),
    borderRadius:   wp('5.5%'),   // exactly half = perfect circle
    borderWidth:    1,
    borderColor:    '#6A1701',
    marginRight:    wp('4%'),
    overflow:       'hidden',     // clips gradient to circle — safe here
                                  // because we don't need shadow on this element
    ...Platform.select({
      android: { elevation: 3 },
      // No iOS shadow needed on the icon circle
    }),
  },
    iconGradient: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  cardImageContainer: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    marginRight: wp('4%'),
    borderWidth: 1,
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
  },
  cardImage: {
    height: hp('5%'),
    width: wp('5%'),
    paddingTop: hp('1.30%'),
    paddingLeft: wp('0.1%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#361911',
  },
  verificationIcon: {
    marginLeft: hp('11%'),
    width: wp('6%'),
  },
  arrowImage: {
    width: wp('7%'),
    height: hp('6%'),
    paddingTop: wp(3),
  },
  itemSeparator: {
    height: hp('0.1%'),
    backgroundColor: 'lightgray',
    width: wp('70%'),
    alignSelf: 'center',
    marginVertical: hp('0.4%'),
  },
});