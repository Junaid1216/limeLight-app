import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';

const BranchStaffProgressBar = ({ achieved, remaining }) => {
  const progress = Math.min(1, Math.max(0, achieved / 100));

  return (
    <View style={styles.row}>
      <Progress.Bar
        progress={progress}
        width={styles.BAR_WIDTH.width}
        height={styles.BAR_HEIGHT.height}
        color={Colors.green}
        unfilledColor={Colors.amber}
        borderWidth={0}
        borderRadius={styles.BAR_HEIGHT.borderRadius}
        animated={false}
      />

      <View style={styles.percentRow}>
        <Text style={styles.greenText} numberOfLines={1}>
          {achieved}%
        </Text>
        <Text style={styles.orangeText} numberOfLines={1}>
          {remaining}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BAR_WIDTH: {
    width: wp(17),
  },
  BAR_HEIGHT: {
    height: wp(1),
    borderRadius: wp(0.5),
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: wp(1.8),
  },
  greenText: {
    fontSize: wp(2.4),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.green,
    marginRight: wp(1.4),
  },
  orangeText: {
    fontSize: wp(2.4),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.amber,
  },
});

export default BranchStaffProgressBar;
