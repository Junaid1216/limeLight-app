import React, { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { employeeIdRegex } from '../../Constants/Regex';
import { ROLES, getProfileInfo, mapProfileData, normalizeAuthUser } from '../../Constants/roleConfig';
import { MyStyling } from '../../Constants/Styling';
import { useRole } from '../../Context/RoleContext';
import Api, { getAuthToken } from '../../Services/Api_services';

const getFormFromUserData = (userData, role) => {
  const normalized = normalizeAuthUser(userData);
  const profile = normalized
    ? mapProfileData(normalized, role)
    : getProfileInfo(role);

  return {
    code:
      normalized?.employee_id ??
      normalized?.code ??
      normalized?.login ??
      '',
    name: profile?.name ?? '',
    branch: profile?.branchValue ?? '',
    feedback: '',
  };
};

const FeedBack = () => {
  const { role } = useRole();
  const isAsm = role === ROLES.ASM;
  const locationLabel = isAsm ? Strings.region : Strings.branchLabel;

  const userData = useSelector(state => state?.AUTH?.userData);

  const [form, setForm] = useState(() => getFormFromUserData(userData, role));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    codeError: '',
    nameError: '',
    branchError: '',
    feedbackError: '',
  });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const applyFormFromUserData = (data, source) => {
        const nextForm = getFormFromUserData(data, role);
        console.log(`Feedback prefill (${source}):`, JSON.stringify(nextForm, null, 2));
        setForm(prev => ({
          ...nextForm,
          feedback: prev.feedback,
        }));
      };

      const loadProfileIfNeeded = async () => {
        if (userData) {
          console.log(
            'Feedback Redux userData:',
            JSON.stringify(normalizeAuthUser(userData), null, 2),
          );
          applyFormFromUserData(userData, 'redux');
          return;
        }

        try {
          const res = await Api.getProfile();
          if (!isActive) {
            return;
          }

          console.log(
            'Feedback getProfile Response:',
            JSON.stringify(res?.data, null, 2),
          );

          if (res?.status == 200) {
            applyFormFromUserData(res?.data?.data || {}, 'api');
          } else {
            applyFormFromUserData(null, 'fallback');
          }
        } catch (err) {
          if (!isActive) {
            return;
          }
          console.log('Get Profile API Error:', err?.response?.data || err);
          applyFormFromUserData(null, 'fallback');
        }
      };

      loadProfileIfNeeded();

      setError({
        codeError: '',
        nameError: '',
        branchError: '',
        feedbackError: '',
      });

      return () => {
        isActive = false;
      };
    }, [userData, role]),
  );

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    } else if (!form.code.trim()) {
      setError({
        codeError: 'Please enter code',
        nameError: '',
        branchError: '',
        feedbackError: '',
      });
    } else if (!employeeIdRegex.test(form.code.trim())) {
      setError({
        codeError: 'Please enter a valid code',
        nameError: '',
        branchError: '',
        feedbackError: '',
      });
    } else if (!/[A-Za-z]/.test(form.code.trim())) {
      setError({
        codeError: 'Code must contain at least one letter',
        nameError: '',
        branchError: '',
        feedbackError: '',
      });
    } else if (!form.name.trim()) {
      setError({
        codeError: '',
        nameError: 'Please enter name',
        branchError: '',
        feedbackError: '',
      });
    } else if (!form.branch.trim()) {
      setError({
        codeError: '',
        nameError: '',
        branchError: isAsm ? 'Please enter region' : 'Please enter branch',
        feedbackError: '',
      });
    } else if (!form.feedback.trim()) {
      setError({
        codeError: '',
        nameError: '',
        branchError: '',
        feedbackError: 'Please enter feedback',
      });
    } else if (!getAuthToken()) {
      setError({
        codeError: '',
        nameError: '',
        branchError: '',
        feedbackError: 'Please login again',
      });
    } else {
      setError({
        codeError: '',
        nameError: '',
        branchError: '',
        feedbackError: '',
      });
      setIsLoading(true);

      const formData = new FormData();
      formData.append('code', form.code.trim());
      formData.append('name', form.name.trim());
      formData.append(isAsm ? 'region_name' : 'branch_name', form.branch.trim());
      formData.append('feedback', form.feedback.trim());

      const feedbackLabel = isAsm ? 'ASM Feedback' : 'Staff Feedback';
      const feedbackEndpoint = isAsm ? 'asm-feedback' : 'staff-feedback';

      try {
        console.log(`${feedbackLabel} Request:`, feedbackEndpoint);
        const res = isAsm
          ? await Api.asmFeedback(formData)
          : await Api.staffFeedback(formData);
        console.log(
          `${feedbackLabel} Response:`,
          JSON.stringify(res?.data, null, 2),
        );

        if (res?.status == 200) {
          console.log(
            `${feedbackLabel} Success:`,
            JSON.stringify(res?.data, null, 2),
          );
          Toast.show(res?.data?.message, Toast.LONG);
          setForm(prev => ({ ...prev, feedback: '' }));
        } else {
          Toast.show(res?.data?.message, Toast.LONG);
          setError({
            codeError: '',
            nameError: '',
            branchError: '',
            feedbackError: res?.data?.message,
          });
        }
      } catch (error) {
        console.log(`${feedbackLabel} API Error:`, {
          status: error?.response?.status,
          url: feedbackEndpoint,
          data: error?.response?.data || error,
        });
        Toast.show(error?.response?.data?.message, Toast.LONG);
        setError({
          codeError: '',
          nameError: '',
          branchError: '',
          feedbackError: error?.response?.data?.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MainHeaderComponent
          title={Strings.feedbackHeader}
          notificationCount={5}
        />

        <Text style={styles.heading} numberOfLines={1}>
          {Strings.shareYourFeedback}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {Strings.feedbackSubtitle}
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Customtextinput
              feedbackStyle
              icon={Images.Hash}
              label={Strings.codeLabel}
              value={form.code}
              onChangeText={text => {
                setForm({ ...form, code: text });
                setError({ ...error, codeError: '' });
              }}
              error={error.codeError}
              wrapperStyle={styles.halfInput}
            />
            <Customtextinput
              feedbackStyle
              label={Strings.nameLabel}
              icon={Images.Person}
              value={form.name}
              onChangeText={text => {
                setForm({ ...form, name: text });
                setError({ ...error, nameError: '' });
              }}
              error={error.nameError}
              wrapperStyle={styles.halfInput}
            />
          </View>

          <Customtextinput
            feedbackStyle
            label={locationLabel}
            icon={Images.Branch}
            value={form.branch}
            onChangeText={text => {
              setForm({ ...form, branch: text });
              setError({ ...error, branchError: '' });
            }}
            error={error.branchError}
            iconTint={Colors.branchGreen}
            wrapperStyle={styles.inputSideSpace}
          />

          <Customtextinput
            feedbackStyle
            label={Strings.yourFeedbackLabel}
            labelRight={Strings.required}
            multiline
            value={form.feedback}
            onChangeText={text => {
              setForm({ ...form, feedback: text });
              setError({ ...error, feedbackError: '' });
            }}
            error={error.feedbackError}
            wrapperStyle={[styles.inputSideSpace, styles.lastInput]}
          />

          <View style={[styles.noteRow, styles.inputSideSpace]}>
            <Image
              source={Images.Info}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.noteText} numberOfLines={2}>
              {Strings.feedbackNote}
            </Text>
          </View>
        </View>

        <Btn
          title={Strings.submitFeedback}
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
  },
  heading: {
    fontSize: Fontsize.l,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: Fontsize.xs1,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    marginBottom: hp(2),
  },
  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    elevation: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  halfInput: {
    width: wp(33),
  },
  inputSideSpace: {
    paddingHorizontal: wp(2),
  },
  lastInput: {
    marginBottom: hp(1),
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp(0.5),
  },
  infoIcon: {
    width: wp(4),
    height: wp(4),
    marginRight: wp(2),
    marginTop: hp(0.2),
  },
  noteText: {
    flex: 1,
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    lineHeight: hp(2.2),
  },
  submitBtn: {
    marginTop: hp(2.5),
  },
});

export default FeedBack;
