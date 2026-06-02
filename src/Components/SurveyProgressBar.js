import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const SurveyProgressBar = props => {
  const current = props?.current ?? 0;
  const total = props?.total ?? 0;
  const progress = total > 0 ? current / total : 0;

  return (
    <View style={styles.section}>
      <View style={styles.topRow}>
        <Text style={styles.surveyName} numberOfLines={1}>
          {props?.title}
        </Text>
        <Text style={styles.stepText}>
          {current} of {total}
        </Text>
      </View>

      <Progress.Bar
        progress={progress}
        width={null}
        height={hp(0.9)}
        color={Colors.orange}
        unfilledColor={Colors.lightOrange}
        borderWidth={0}
        borderRadius={wp(2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: hp(2.5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.2),
  },
  surveyName: {
    flex: 1,
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginRight: wp(2),
  },
  stepText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
});

export default SurveyProgressBar;
