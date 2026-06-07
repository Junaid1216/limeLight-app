// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Progress from 'react-native-progress';
// import { hp, wp } from '../Assets/Responsive';
// import { Colors } from '../Constants/Colors';
// import { Fontsize } from '../Constants/Fontsize';
// import { Fonts } from '../Constants/Fonts';

// const SurveyProgressBar = props => {
//   const current = props?.current ?? 0;
//   const total = props?.total ?? 0;
//   const color = props?.color ?? '#2F6FED';

//   const progress = total > 0 ? current / total : 0;

//   return (
//     <View style={styles.section}>
//       <View style={styles.topRow}>
//         <Text style={styles.surveyName} numberOfLines={1}>
//           {props?.title}
//         </Text>
//         <Text style={styles.stepText}>
//           {current} of {total}
//         </Text>
//       </View>

//       {/* <Progress.Bar
//         progress={progress}
//         width={null}
//         height={hp(0.9)}
//         color={Colors.orange}
//         unfilledColor={Colors.lightOrange}
//         borderWidth={0}
//         borderRadius={wp(2)}
//       /> */}
//       <Progress.Bar
//         progress={progress}
//         width={null}
//         height={5}
//         borderWidth={0}
//         borderRadius={10}
//         color={color}
//         unfilledColor="#E5E7EB"
//         animated
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   section: {
//     marginBottom: hp(2.5),
//   },
//   topRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: hp(1.2),
//   },
//   surveyName: {
//     flex: 1,
//     fontSize: Fontsize.xs2,
//     fontFamily: Fonts.poppinsSemiBold,
//     color: Colors.black,
//     marginRight: wp(2),
//   },
//   stepText: {
//     fontSize: Fontsize.s,
//     fontFamily: Fonts.poppinsRegular,
//     color: Colors.mediumGrey,
//   },
// });

// export default SurveyProgressBar;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';

const SurveyProgressBar = props => {
  const current = props?.current ?? 0;
  const total = props?.total;
  const color = props?.color ?? '#2F6FED';

  const isPercentageMode = total === undefined || total === null;

  const progress = isPercentageMode
    ? current / 100
    : total > 0
    ? current / total
    : 0;

  return (
    <View style={styles.section}>
      <View style={styles.topRow}>
        {/* <Text style={styles.surveyName} numberOfLines={1}>
          {props?.title}
        </Text> */}
        <View style={styles.leftRow}>
          <View style={[styles.dot, { backgroundColor: color }]} />

          <Text style={styles.surveyName} numberOfLines={1}>
            {props?.title}
          </Text>
        </View>

        <Text
          style={[
            styles.stepText,
            isPercentageMode && {
              color: color,
              fontFamily: Fonts.poppinsSemiBold,
            },
          ]}
        >
          {isPercentageMode ? `${current}%` : `${current} of ${total}`}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: hp(1.5),
  },

  // topRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   marginBottom: hp(1),
  // },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(0.8),
  },

  // surveyName: {
  //   flex: 1,
  //   fontSize: Fontsize.xs2,
  //   fontFamily: Fonts.poppinsSemiBold,
  //   color: Colors.black,
  //   marginRight: wp(2),
  // },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // 👈 IMPORTANT
    minWidth: 0, // 👈 IMPORTANT FIX
  },

  surveyName: {
    flexShrink: 1, // 👈 IMPORTANT (THIS FIXES OVERFLOW)
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    // marginRight: wp(6),
  },
  stepText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    flexShrink: 0,
    marginLeft: 8,
  },
  // leftRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default SurveyProgressBar;
