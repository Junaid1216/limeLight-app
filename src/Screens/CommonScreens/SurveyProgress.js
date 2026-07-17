import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import SurveyProgressBar from '../../Components/SurveyProgressBar';
import SurveyQuestionCard from '../../Components/SurveyQuestionCard';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { getTrainingApiRole } from '../../Constants/roleConfig';
import { useRole } from '../../Context/RoleContext';
import Api from '../../Services/Api_services';
import { showApiMessageToast } from '../../Utils/apiHelpers';

const mapSurveyQuestions = data => {
  const list = Array.isArray(data)
    ? data
    : data?.questions ?? data?.survey_questions ?? [];

  const title = Array.isArray(data)
    ? Strings.priceSatisfactionSurvey
    : data?.title ?? data?.survey_title ?? Strings.priceSatisfactionSurvey;

  const questions = list.map((item, index) => ({
    id: String(item?.id ?? item?.question_id ?? index + 1),
    question: item?.question ?? item?.question_text ?? '',
    options: item?.options ??
      item?.answer_options ?? [
        Strings.optionHigh,
        Strings.optionFair,
        Strings.optionLow,
      ],
  }));

  return { title, questions };
};

const SurveyProgress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = useRole();
  const [answers, setAnswers] = useState({});
  const [surveyTitle, setSurveyTitle] = useState(Strings.priceSatisfactionSurvey);
  const [questions, setQuestions] = useState([]);

  const fetchSurveyQuestions = useCallback(async () => {
    if (!role) {
      return;
    }

    const apiRole = getTrainingApiRole(role);
    setAnswers({});

    try {
      const res = await Api.getSurveyQuestions(apiRole);
      const resJson = res?.data ?? {};

      console.log(
        'Survey Questions Backend Response:',
        JSON.stringify(resJson, null, 2),
      );

      if (res?.status == 200) {
        console.log(
          'Survey Questions Response:',
          JSON.stringify(resJson, null, 2),
        );

        const { title, questions: mappedQuestions } = mapSurveyQuestions(
          resJson?.data,
        );

        setSurveyTitle(title);
        setQuestions(mappedQuestions);
      } else {
        console.log(
          'Survey Questions Error Response:',
          JSON.stringify(resJson, null, 2),
        );
        showApiMessageToast(res);
        setQuestions([]);
      }
    } catch (error) {
      console.log(
        'Survey Questions API Error:',
        JSON.stringify(error?.response?.data ?? error?.message ?? error, null, 2),
      );
      setQuestions([]);
    }
  }, [role]);

  useFocusEffect(
    useCallback(() => {
      const routeQuestions = route.params?.questions;
      const routeTitle = route.params?.surveyTitle;

      if (routeQuestions?.length) {
        setSurveyTitle(routeTitle ?? Strings.priceSatisfactionSurvey);
        setQuestions(routeQuestions);
        setAnswers({});
        return;
      }

      fetchSurveyQuestions();
    }, [fetchSurveyQuestions, route.params?.questions, route.params?.surveyTitle]),
  );

  const answeredCount = questions.filter(item => answers[item.id]).length;

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
          title={surveyTitle}
          current={answeredCount}
          total={questions.length}
        />

        {questions.map((item, index) => (
          <SurveyQuestionCard
            key={item.id}
            qLabel={`Q${index + 1}`}
            question={item.question}
            options={item.options}
            selected={answers[item.id]}
            onSelect={option =>
              setAnswers(prev => ({ ...prev, [item.id]: option }))
            }
          />
        ))}
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
