import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Images } from '../Assets';
import SurveyOption from './SurveyOption';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { Fontsize } from '../Constants/Fontsize';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';

const SurveyQuestionCard = props => {
  const option1 = props?.options?.[0];
  const option2 = props?.options?.[1];
  const option3 = props?.options?.[2];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.qBadge}>
          <Text style={styles.qBadgeText}>{props?.qLabel}</Text>
        </View>
        <Text style={styles.requiredText}>{Strings.required}</Text>
      </View>

      <Text style={styles.questionText}>{props?.question}</Text>

      {option1 ? (
        <SurveyOption
          label={option1}
          icon={Images.HighImage}
          selected={props?.selected === option1}
          onPress={() => props?.onSelect?.(option1)}
        />
      ) : null}

      {option2 ? (
        <SurveyOption
          label={option2}
          icon={Images.FairImage}
          selected={props?.selected === option2}
          onPress={() => props?.onSelect?.(option2)}
        />
      ) : null}

      {option3 ? (
        <SurveyOption
          label={option3}
          icon={Images.LowImage}
          selected={props?.selected === option3}
          onPress={() => props?.onSelect?.(option3)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(2),
    elevation: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  qBadge: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(5),
    marginRight: wp(2),
  },
  qBadgeText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.teal,
  },
  requiredText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
  questionText: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginBottom: hp(1.5),
    lineHeight: hp(2.8),
  },
});

export default SurveyQuestionCard;
