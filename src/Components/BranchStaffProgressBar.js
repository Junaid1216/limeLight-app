import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const BAR_HEIGHT = 3.67;


const BranchStaffProgressBar = ({ achieved, remaining }) => {
  const [barWidth, setBarWidth] = useState(0);
  const progress = Math.min(1, Math.max(0, achieved / 100));

  return (
    <View style={styles.row}>
      <View
        style={styles.barBox}
        onLayout={e => {
          const width = e.nativeEvent.layout.width;
          if (width > 0) {
            setBarWidth(width);
          }
        }}
      >
        {barWidth > 0 && (
          <Progress.Bar
            progress={progress}
            width={barWidth}
            height={BAR_HEIGHT}
            color={Colors.green}
            unfilledColor={Colors.amber}
            borderWidth={0}
            borderRadius={wp(2)}
            animated={false}
          />
        )}
      </View>

      <View style={styles.percentRow}>
        <Text style={styles.greenText}>{achieved}%</Text>
        <Text style={styles.orangeText}>{remaining}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barBox: {
    flex: 1,
    height: BAR_HEIGHT,
    marginRight: wp(1),
    borderRadius: wp(2),
    overflow: 'hidden',
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  greenText: {
    fontSize: 6.55,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.green,
    marginRight: wp(0.6),
  },
  orangeText: {
    fontSize: 6.55,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.amber,
  },
});

export default BranchStaffProgressBar;
