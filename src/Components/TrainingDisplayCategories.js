import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';
import { trainingDisplayCategories } from '../Constants/DummyData';

const TrainingDisplayCategories = ({ active, onChange, categories = trainingDisplayCategories }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryRow}
  >
    {categories.map(cat => {
      const isActive = active === cat;
      return (
        <TouchableOpacity
          key={cat}
          activeOpacity={0.8}
          style={[styles.categoryChip, isActive && styles.categoryChipActive]}
          onPress={() => onChange(cat)}
        >
          <Text
            style={[
              styles.categoryChipText,
              isActive && styles.categoryChipTextActive,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  categoryRow: {
    paddingBottom: hp(1.8),
  },
  categoryChip: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.9),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: Colors.platinum,
    backgroundColor: Colors.white,
    marginRight: wp(2.5),
  },
  categoryChipActive: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  categoryChipText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xs2,
    color: Colors.charcoalText,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
});

export default TrainingDisplayCategories;
