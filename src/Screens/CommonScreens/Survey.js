import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import ScreenLoader from '../../Components/ScreenLoader';
import ScreenScrollView from '../../Components/ScreenScrollView';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';
import { getTrainingApiRole } from '../../Constants/roleConfig';
import { navigateToSurveyProgress } from '../../Navigations/navigationHelpers';
import Api, { isApiSuccess } from '../../Services/Api_services';
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

const Survey = () => {
  const navigation = useNavigation();
  const { role } = useRole();
  const [surveyTitle, setSurveyTitle] = useState(Strings.priceSatisfactionSurvey);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSurveyQuestions = useCallback(async () => {
    if (!role) {
      return;
    }

    const apiRole = getTrainingApiRole(role);
    setIsLoading(true);

    try {
      console.log('Survey Questions Request:', `survey-questions/${apiRole}`, {
        role,
        apiRole,
      });
      const res = await Api.getSurveyQuestions(apiRole);
      console.log(
        'Survey Questions Response:',
        JSON.stringify(res?.data, null, 2),
      );

      if (isApiSuccess(res)) {
        const { title, questions: mappedQuestions } = mapSurveyQuestions(
          res?.data?.data,
        );

        console.log(
          'Survey Questions Success:',
          JSON.stringify(mappedQuestions, null, 2),
        );

        setSurveyTitle(title);
        setQuestions(mappedQuestions);

        if (mappedQuestions.length === 0) {
          console.log(
            'Survey Questions Empty:',
            JSON.stringify(
              {
                apiRole,
                message: res?.data?.message,
                data: res?.data?.data,
              },
              null,
              2,
            ),
          );
        }
      } else {
        showApiMessageToast(res);
        setQuestions([]);
      }
    } catch (error) {
      console.log('Survey Questions API Error:', {
        status: error?.response?.status,
        url: `survey-questions/${apiRole}`,
        data: error?.response?.data || error,
      });
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  useFocusEffect(
    useCallback(() => {
      fetchSurveyQuestions();
    }, [fetchSurveyQuestions]),
  );

  const questionsCountLabel = `${questions.length} Questions`;

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ScreenScrollView contentContainerStyle={styles.content}>
        <MainHeaderComponent
          title={Strings.surveyHeader}
          notificationCount={5}
        />

        {isLoading ? (
          <ScreenLoader />
        ) : questions.length > 0 ? (
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
                <Text style={styles.activeText} numberOfLines={1}>
                  {Strings.active}
                </Text>
              </View>
            </View>

            <Text style={styles.surveyTitle} numberOfLines={2}>
              {surveyTitle}
            </Text>

            <View style={styles.questionsRow}>
              <Image
                source={Images.Question}
                style={styles.questionIcon}
                resizeMode="contain"
              />
              <Text style={styles.questionsText} numberOfLines={1}>
                {questionsCountLabel}
              </Text>
            </View>

            <Btn
              title={Strings.openSurvey}
              onPress={() =>
                navigateToSurveyProgress(navigation, {
                  surveyTitle,
                  questions,
                })
              }
              style={styles.openSurveyBtn}
            />
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No survey questions available right now.
          </Text>
        )}
      </ScreenScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
  },
  loader: {
    marginTop: hp(4),
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
  emptyText: {
    marginTop: hp(4),
    textAlign: 'center',
    fontSize: Fontsize.sm,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
});

export default Survey;
