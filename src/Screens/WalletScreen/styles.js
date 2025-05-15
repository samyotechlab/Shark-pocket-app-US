import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingHorizontal: wp('5%'),
      paddingTop: hp('4%'),
    },
    scrollContainer: {
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: wp('5%'),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('3%'),
    },
    topBarTitle: {
      color: 'white',
      fontFamily: 'Montserrat-SemiBold',
      fontSize: wp('5%'),
    },
    needHelpText: {
      color: 'white',
      fontFamily: 'Montserrat-Regular',
      fontSize: wp('4%'),
    },
    cardContainer: {
      backgroundColor: '#A38C85',
      borderRadius: hp('1.5%'),
      marginTop: hp('2%'),
    },
    divider: {
      height: 1,
      marginHorizontal: wp('2%'),
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      fontSize: wp('5%'),
      color: 'white',
      fontFamily: 'Montserrat-Regular',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    balanceContainer: {
        backgroundColor: '#6C2A1F',
        padding: wp('4%'),
        borderRadius: hp('1.5%'),
      },
      balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: hp('0.1%'),
        borderColor: 'transparent',
      },
      balanceContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      walletIcon: {
        width: wp('5%'),
        height: hp('3%'),
        marginRight: wp('2%'),
      },
      balanceAmount: {
        color: '#fff',
        fontSize: wp('6%'),
        fontFamily: 'LuckiestGuy-Regular',
      },
      sectionTitle: {
        color: '#FFFFFF',
        fontSize: wp('5%'),
        fontFamily: 'Montserrat-Bold',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
      },
      iconContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconGradient: {
        height: wp('8%'),
        width: wp('8%'),
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
      textContainer: {
        justifyContent: 'center',
      },
      label: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: 'Montserrat-Regular',
      },
      amount: {
        color: '#fff',
        fontSize: hp('2.5%'),
        fontFamily: 'Montserrat-SemiBold',
      },
      buttonContainer: {
        flex: 1,
        marginRight: hp('1%'),
      },
      addCashButton: {
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('1%'),
        borderRadius: wp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
      withdrawButton: {
        paddingHorizontal: wp('0.5%'),
        paddingVertical: wp('1%'),
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF33',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        fontSize: hp('1.7%'),
        letterSpacing: 0.5,
        textAlign: 'center',
      },
      lockIcon: {
        marginTop: -wp('2%'),
        marginRight: wp('1%'),
      },
      transactionContainer: {
        flex: 0.1,
        backgroundColor: '#A38C85',
        flexDirection: 'row',
        borderRadius: wp('4%'),
        marginTop: wp('6%'),
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: hp('2%'),
      },
      transactionIcon: {
        height: wp('8%'),
        width: wp('8%'),
        borderRadius: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
      label: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: 'Montserrat-SemiBold',
      },
      transactionText: {
        color: '#fff',
        fontSize: wp('3%'),
        fontFamily: 'Montserrat-Medium',
      },
      chevron: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabContainer: {
        flexDirection: 'row',
        paddingVertical: hp('1%'),
      },
      tabText: {
        fontSize: wp('4.5%'),
        borderBottomWidth: hp('0.5%'),
        marginHorizontal: wp('2%'),
      },
      container: {
        flex: 1,
        backgroundColor: '#361911',
      },
      content: {
        flex: 0.1,
      },
      tabContent: {
        flex: 1.5,
      },
  });