import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const Survey = () => {
  const navigation = useNavigation();

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.content}>
        <MainHeaderComponent
          title={Strings.surveyHeader}
          notificationCount={5}
        />

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.iconWrap}>
              <Image
                source={Images.Note}
                style={styles.noteIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeText}>{Strings.active}</Text>
            </View>
          </View>

          <Text style={styles.surveyTitle} numberOfLines={2}>
            {Strings.priceSatisfactionSurvey}
          </Text>

          <View style={styles.questionsRow}>
            <Image
              source={Images.Question}
              style={styles.questionIcon}
              resizeMode="contain"
            />
            <Text style={styles.questionsText}>
              {Strings.surveyQuestionsCount}
            </Text>
          </View>

          <Btn
            title={Strings.openSurvey}
            onPress={() =>
              navigation.navigate('SurveyProgress', {
                surveyId: 'price-satisfaction',
              })
            }
            style={styles.openSurveyBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
    elevation: wp(0.5),
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  iconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2.5),
    backgroundColor: Colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteIcon: {
    width: wp(5),
    height: wp(5),
  },
  activeBadge: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(5),
  },
  activeText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.teal,
    letterSpacing: 0.5,
  },
  surveyTitle: {
    fontSize: Fontsize.l,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
    marginBottom: hp(1),
  },
  questionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionIcon: {
    width: wp(5),
    height: wp(5),
  },
  questionsText: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    marginLeft: wp(1.5),
  },
  openSurveyBtn: {
    marginTop: hp(2),
  },
});

export default Survey;
