import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex:         1,
    marginBottom: hp('2%'),
  },
  card: {
    borderRadius: wp('3%'),
    marginRight:  wp('4%'),   
    padding:      hp('0.5%'),
    ...Platform.select({
      ios: {
        shadowColor:   '#000',
        shadowOffset:  { width: 0, height: hp('0.4%') },
        shadowOpacity: 0.3,
        shadowRadius:  wp('1.2%'),
      },
      android: {
        elevation: 5,           
      },
    }),
  },

  content: {
    flexDirection: 'row',
    flex:          1,
  },

  characterImage: {
    width:      wp('25%'),
    height:     hp('15%'),
    resizeMode: 'contain',
    alignSelf:  'center',
  },

  textContainer: {
    flex: 1,
  },

  description: {
    fontSize:   wp('4%'),
    color:      '#000000',
    fontFamily: 'Audiowide-Regular',
    textAlign:  'center',
  },

  headerRow: {
    flexDirection:  'row',
    justifyContent: 'space-evenly',
    alignItems:     'center',
    marginVertical: hp('1%'),
  },

  title: {
    fontSize:          wp('3%'),
    color:             '#000000',
    fontFamily:        'Audiowide-Regular',
    textAlign:         'center',
    textDecorationLine:'underline',
  },

  dataRow: {
    flexDirection:  'row',
    justifyContent: 'space-evenly',
  },

  box: {
    borderRadius:   wp('2%'),
    padding:        wp('1%'),     
    alignItems:     'center',
    width:          wp('20%'),
    flexDirection:  'row',
    borderColor:    '#C59900',
    borderWidth:    1,     
    justifyContent: 'center',
  },

  boxText: {
    fontSize:   wp('3.5%'),
    fontFamily: 'Audiowide-Regular',
    color:      '#000000',
  },

  buttonContainer: {
    alignItems:     'center',
    marginVertical: hp('1%'),
  },

  playButton: {
    borderRadius:      wp('2%'), 
    paddingVertical:   hp('0.7%'),
    paddingHorizontal: wp('1%'),
    alignItems:        'center',
    borderRightWidth:  1,
    borderLeftWidth:   1,
    borderTopWidth:    5,
    borderBottomWidth: 5,
    width:             wp('40%'),
    ...Platform.select({
      ios: {
        shadowColor:   'rgba(0, 0, 0, 0.4)',
        shadowOpacity: 0.8,
        shadowRadius:  wp('3%'),   
        shadowOffset:  { width: 1, height: hp('1%') }, 
      },
      android: {
        elevation: 8,           
      },
    }),
  },

  playButtonText: {
    letterSpacing:    wp('0.5%'),  
    fontSize:         wp('4.5%'),
    fontFamily:       'LilitaOne-Regular',
    color:            '#FFFFFF',
    textShadowColor:  '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textTransform:    'uppercase',
  },
});