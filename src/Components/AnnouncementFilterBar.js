import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const AnnouncementFilterBar = ({ selectedFilter, onSelectFilter }) => {
  const renderChip = (key, label) => {
    const isSelected = selectedFilter === key;

    return (
      <TouchableOpacity
        key={key}
        activeOpacity={0.7}
        style={[styles.chip, isSelected && styles.chipSelected]}
        onPress={() => onSelectFilter(key)}>
        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]} numberOfLines={1}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {renderChip('All', 'All')}
      {renderChip('HR', 'HR')}
      {renderChip('Performance', 'Performance')}
      {renderChip('Promotions', 'Promotions')}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp(1.5),
  },
  chip: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    marginRight: wp(2),
  },
  chipSelected: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  chipText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
  chipTextSelected: {
    color: Colors.white,
  },
});

export default AnnouncementFilterBar;
