import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const section = {
  title: 'Description',
  colors: ["#F2E30B",'#F5A623'], 
  borderColor: '#FEB801', 
  data: 'This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!This is your full description content. You can customize this as needed. It can be longer and more detailed than the preview. You can add more lines here to test how it looks when collapsed and expanded. Enjoy building your UI!',
};

const MAX_LINES = 1;

const ExpandableSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ padding: 16 }}>
      <LinearGradient
        colors={section.colors}
        style={[
          styles.tabHeader,
          { borderColor: section.borderColor },
          expanded ? styles.expanded : styles.collapsed,
        ]}
      >
        <Text style={styles.tabHeaderText}>{section.title}</Text>
        {expanded ? (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionText}>
              {section.data}
            </Text>
          </ScrollView>
        ) : (
          <Text
            style={styles.sectionText}
            numberOfLines={MAX_LINES}
          >
            {section.data}
          </Text>
        )}
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMoreText}>
            {expanded ? 'Show less' : 'Read more'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollContainer: {
    maxHeight: 100, // Limiting height to make scrolling noticeable
    marginBottom: 6,
  },
  scrollContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  collapsed: {
    minHeight: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  expanded: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  tabHeaderText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sectionText: {
    color: '#4A2C2A',
    fontSize: 14,
    lineHeight: 20,
  },
  readMoreText: {
    color: '#4A2C2A',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});

export default ExpandableSection;