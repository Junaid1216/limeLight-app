import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../Assets';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import { surveyReportSummary } from '../Constants/DummyData';
import { Fonts } from '../Constants/Fonts';
import { Strings } from '../Constants/Strings';
import { Fontsize } from '../Constants/Fontsize';

const TotalResponsesCard = ({
  branchId,
  surveyId,
  responses = surveyReportSummary.responses,
  total = surveyReportSummary.total,
  rate = surveyReportSummary.rate,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() =>
        navigation.navigate('SurveyResponse', {
          branchId,
          surveyId,
        })
      }
    >
      <View style={styles.leftContent}>
        <Text style={styles.label}>{Strings.totalResponses}</Text>

        <View style={styles.countRow}>
          <Text style={styles.count}>{responses}</Text>
          <Text style={styles.total}>
            {Strings.totalCountSeparator}
            {total}
          </Text>
        </View>

        <Text style={styles.rate}>
          {Strings.responseRatePrefix}
          {rate}
          {Strings.responseRateSuffix}
        </Text>
      </View>

      <View style={styles.iconContainer}>
        <Image
          source={Images.TotalResponse}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
};

export default TotalResponsesCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: wp(1.8),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.teal,
    marginTop: hp(1.5),
  },
  cardPressed: {
    opacity: 0.9,
  },
  leftContent: {
    flex: 1,
  },
  label: {
    color: '#E8F8F5',
    fontSize: Fontsize.xmm,
    fontFamily: Fonts.poppinsMedium,
    marginBottom: hp(0.6),
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  count: {
    color: Colors.white,
    fontSize: Fontsize.mm1,
    fontFamily: Fonts.poppinsSemiBold,
    lineHeight: wp(9),
  },
  total: {
    color: '#D8F3EE',
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsRegular,
    marginTop: hp(1.2),
  },
  rate: {
    color: '#E8F8F5',
    fontSize: Fontsize.xmm,
    fontFamily: Fonts.poppinsRegular,
    marginTop: hp(0.8),
  },
  iconContainer: {
    width: wp(13.4),
    height: wp(13.4),
    borderRadius: wp(4),
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(3),
  },
  icon: {
    width: wp(6.8),
    height: wp(6.8),
    tintColor:Colors.white,
  },
});
