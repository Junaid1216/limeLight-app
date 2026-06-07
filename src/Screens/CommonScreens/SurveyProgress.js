import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import SurveyProgressBar from '../../Components/SurveyProgressBar';
import SurveyQuestionCard from '../../Components/SurveyQuestionCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';

const TOTAL_QUESTIONS = 2;

const surveyOptions = [
  Strings.optionHigh,
  Strings.optionFair,
  Strings.optionLow,
];

const SurveyProgress = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});

  let answeredCount = 0;
  if (answers.q1) {
    answeredCount++;
  }
  if (answers.q2) {
    answeredCount++;
  }

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <MainHeaderComponent
          title={Strings.surveyHeader}
          notificationCount={5}
        />

        <SurveyProgressBar
          title={Strings.priceSatisfactionSurvey}
          current={answeredCount}
          total={TOTAL_QUESTIONS}
        />

        <SurveyQuestionCard
          qLabel={Strings.q1}
          question={Strings.surveyQuestion1}
          options={surveyOptions}
          selected={answers.q1}
          onSelect={option => setAnswers({ ...answers, q1: option })}
        />

        <SurveyQuestionCard
          qLabel={Strings.q2}
          question={Strings.surveyQuestion2}
          options={surveyOptions}
          selected={answers.q2}
          onSelect={option => setAnswers({ ...answers, q2: option })}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Btn
          title={Strings.submitSurvey}
          icon={Images.SubmitArrow}
          onPress={() =>
            navigation.navigate('BottomNavigation', {
              screen: 'BottomNavigation',
              params: {
                screen: 'Survey',
                params: { screen: 'SurveyReport' },
              },
            })
          }
          style={styles.submitBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(2),
  },
  footer: {
    paddingHorizontal: wp(6),
    paddingBottom: hp(3),
    paddingTop: hp(1),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
  },
  submitBtn: {
    marginTop: 0,
  },
});

export default SurveyProgress;
