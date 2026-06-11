import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { trainingTabs } from '../Constants/DummyData';

const TrainingTabs = ({ active, onChange }) => (
  <View style={styles.segment}>
    {trainingTabs.map(tab => {
      const isActive = active === tab;
      return (
        <TouchableOpacity
          key={tab}
          activeOpacity={0.9}
          style={[styles.segmentItem, isActive && styles.segmentItemActive]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[styles.segmentText, isActive && styles.segmentTextActive]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(3),
    padding: wp(1.2),
  },
  segmentItem: {
    flex: 1,
    paddingVertical: hp(1.1),
    borderRadius: wp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: Colors.green,
  },
  segmentText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs5,
    color: Colors.grey,
  },
  segmentTextActive: {
    color: Colors.white,
  },
});

export default TrainingTabs;
