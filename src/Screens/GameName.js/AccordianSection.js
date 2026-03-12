import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const section = {
  title: 'Description',
  gradientColors: ['#F2E30B', '#F5A623'],
  borderColor: '#FEB801',
  data:
    'This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

const MAX_PREVIEW_LINES = 1;
const BORDER_WIDTH = 2;

const ExpandableSection = () => {
  const [expanded, setExpanded] = useState(false);


  useWindowDimensions();

  const BORDER_RADIUS = wp('3.5%');
  const INNER_RADIUS  = BORDER_RADIUS - BORDER_WIDTH;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.borderWrapper,
          {
            borderColor:  section.borderColor,
            borderRadius: BORDER_RADIUS,
            ...Platform.select({
              ios: {
                shadowColor:   '#000',
                shadowOffset:  { width: 0, height: 3 },
                shadowOpacity: 0.24,
                shadowRadius:  5,
              },
              android: {
                elevation: 5,
              },
            }),
          },
        ]}
      >
        <LinearGradient
          colors={section.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: INNER_RADIUS, overflow: 'hidden' }}
        >
          <View style={styles.innerPadding}>

            <Text style={styles.title}>{section.title}</Text>

            {expanded ? (
              <ScrollView
                style={styles.expandedScroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <Text style={styles.descriptionText}>{section.data}</Text>
              </ScrollView>
            ) : (
              <Text
                style={styles.descriptionText}
                numberOfLines={MAX_PREVIEW_LINES}
                ellipsizeMode="tail"
              >
                {section.data}
              </Text>
            )}

            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setExpanded(!expanded)}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 20, right: 20 }}
            >
              <Text style={styles.readMoreText}>
                {expanded ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingVertical:   hp('0.8%'),
  },
  borderWrapper: {
    borderWidth: BORDER_WIDTH,
  },

  innerPadding: {
    paddingVertical:   hp('1.2%'),
    paddingHorizontal: wp('4.5%'),
  },

  title: {
    fontSize:     wp('4.8%'),
    fontWeight:   '700',
    color:        '#1A1200',
    marginBottom: hp('0.8%'),
  },

  descriptionText: {
    fontSize:   wp('3.6%'),
    lineHeight: wp('3.6%') * 1.4,
    color:      '#3C2A1A',
    fontWeight: '500',
  },

  expandedScroll: {
    maxHeight: hp('14%'),
  },

  scrollContent: {
    paddingBottom: hp('0.5%'),
  },

  readMoreButton: {
    alignSelf:         'flex-end',
    marginTop:         hp('0.6%'),
    paddingVertical:   hp('0.5%'),
    paddingHorizontal: wp('3%'),
  },

  readMoreText: {
    fontSize:          wp('3.8%'),
    fontWeight:        '700',
    color:             '#2A1A00',
    textDecorationLine:'underline',
  },
});

export default ExpandableSection;