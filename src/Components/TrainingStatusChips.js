import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { trainingStatuses } from '../Constants/DummyData';

const TrainingStatusChips = ({ active, onChange }) => (
  <View style={styles.chipRow}>
    {trainingStatuses.map(status => {
      const isActive = active === status;
      return (
        <TouchableOpacity
          key={status}
          activeOpacity={0.8}
          style={[styles.statusChip, isActive && styles.statusChipActive]}
          onPress={() => onChange(status)}
        >
          <Text
            style={[
              styles.statusChipText,
              isActive && styles.statusChipTextActive,
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  statusChip: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.7),
    borderRadius: wp(5),
    backgroundColor: Colors.lightGreen,
    marginRight: wp(2.5),
  },
  statusChipActive: {
    backgroundColor: Colors.green,
  },
  statusChipText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs2,
    color: Colors.green,
  },
  statusChipTextActive: {
    color: Colors.white,
  },
});

export default TrainingStatusChips;
