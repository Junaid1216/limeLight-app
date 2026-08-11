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

  const getOptionLabel = option =>
    typeof option === 'string' ? option : option?.label ?? '';

  const isOptionSelected = option => {
    if (!option || props?.selected == null) {
      return false;
    }

    if (typeof option === 'string') {
      return props.selected === option;
    }

    return (
      props.selected?.optionId === option?.id ||
      props.selected?.label === option?.label
    );
  };

  const renderOption = option => {
    if (!option) {
      return null;
    }

    const label = getOptionLabel(option);
    const normalized = label.toLowerCase();
    const icon = normalized.includes('high')
      ? Images.HighImage
      : normalized.includes('fair')
        ? Images.FairImage
        : normalized.includes('low')
          ? Images.LowImage
          : undefined;

    return (
      <SurveyOption
        key={String(option?.id ?? label)}
        label={label}
        icon={icon}
        selected={isOptionSelected(option)}
        onPress={() => props?.onSelect?.(option)}
      />
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.qBadge}>
          <Text style={styles.qBadgeText}>{props?.qLabel}</Text>
        </View>
        <Text style={styles.requiredText}>{Strings.required}</Text>
      </View>

      <Text style={styles.questionText}>{props?.question}</Text>

      {renderOption(option1)}
      {renderOption(option2)}
      {renderOption(option3)}
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
