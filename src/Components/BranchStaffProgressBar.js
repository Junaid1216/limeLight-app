import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fonts } from '../Constants/Fonts';

const BranchStaffProgressBar = ({ achieved, remaining }) => {
  const achievedValue = Number(achieved ?? 0);
  const remainingValue = Number(remaining ?? 0);
  const progress = Math.min(1, Math.max(0, achievedValue / 100));
  const fillColor = progress > 0 ? Colors.green : 'transparent';

  return (
    <View style={styles.column}>
      <Progress.Bar
        progress={progress}
        width={styles.BAR_WIDTH.width}
        height={styles.BAR_HEIGHT.height}
        color={fillColor}
        unfilledColor={Colors.amber}
        borderWidth={0}
        borderRadius={styles.BAR_HEIGHT.borderRadius}
        animated={false}
      />

      <View style={styles.percentRow}>
        <Text style={styles.greenText} numberOfLines={1}>
          {achievedValue}%
        </Text>
        <Text style={styles.orangeText} numberOfLines={1}>
          {remainingValue}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    alignSelf: 'stretch',
  },
  BAR_WIDTH: {
    width: wp(22),
  },
  BAR_HEIGHT: {
    height: wp(2),
    borderRadius: wp(1),
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(22),
    marginTop: wp(0.8),
  },
  greenText: {
    fontSize: wp(2.2),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.green,
    flexShrink: 0,
  },
  orangeText: {
    fontSize: wp(2.2),
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.amber,
    flexShrink: 0,
  },
});

export default BranchStaffProgressBar;
