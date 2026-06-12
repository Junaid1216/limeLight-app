import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import {
  digitRegex,
  lowercase,
  specialCharRegex,
  uppercase,
} from '../../Constants/Regex';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState({
    newPasswordError: '',
    confirmPasswordError: '',
  });

  const handleContinue = () => {
    if (!form.newPassword) {
      setError({
        newPasswordError: 'Please enter new password',
        confirmPasswordError: '',
      });
    } else if (form.newPassword.length < 8) {
      setError({
        newPasswordError: 'Password must be at least 8 characters',
        confirmPasswordError: '',
      });
    } else if (!lowercase.test(form.newPassword)) {
      setError({
        newPasswordError: 'Password must contain at least one lowercase letter',
        confirmPasswordError: '',
      });
    } else if (!uppercase.test(form.newPassword)) {
      setError({
        newPasswordError: 'Password must contain at least one uppercase letter',
        confirmPasswordError: '',
      });
    } else if (!digitRegex.test(form.newPassword)) {
      setError({
        newPasswordError: 'Password must contain at least one number',
        confirmPasswordError: '',
      });
    } else if (!specialCharRegex.test(form.newPassword)) {
      setError({
        newPasswordError: 'Password must contain at least one special character',
        confirmPasswordError: '',
      });
    } else if (!form.confirmPassword) {
      setError({
        newPasswordError: '',
        confirmPasswordError: 'Please enter confirm password',
      });
    } else if (form.newPassword !== form.confirmPassword) {
      setError({
        newPasswordError: '',
        confirmPasswordError: 'Passwords do not match',
      });
    } else {
      setError({ newPasswordError: '', confirmPasswordError: '' });
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  };

  return (
    <View style={MyStyling.container2}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.content}>
        <MainHeaderComponent title={Strings.createPasswordHeader} />

        <Text style={styles.heading} numberOfLines={1}>
          {Strings.setNewPassword}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {Strings.passwordRulesDesc}
        </Text>

        <Customtextinput
          placeholder={Strings.newPasswordPlaceholder}
          icon={Images.Password}
          iconBg={Colors.lightGreen}
          value={form.newPassword}
          onChangeText={text => {
            setForm({ ...form, newPassword: text });
            setError({ ...error, newPasswordError: '' });
          }}
          secureTextEntry
          showToggle
          error={error.newPasswordError}
          wrapperStyle={styles.inputGap}
        />

        <Customtextinput
          placeholder={Strings.confirmPasswordPlaceholder}
          icon={Images.Password}
          iconBg={Colors.lightGreen}
          value={form.confirmPassword}
          onChangeText={text => {
            setForm({ ...form, confirmPassword: text });
            setError({ ...error, confirmPasswordError: '' });
          }}
          secureTextEntry
          showToggle
          error={error.confirmPasswordError}
        />

        <Btn
          title={Strings.continue}
          onPress={handleContinue}
          style={styles.continueBtn}
        />
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
  heading: {
    fontSize: Fontsize.l,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
  description: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
    lineHeight: hp(2.5),
    marginBottom: hp(1.5),
  },
  inputGap: {
    marginBottom: hp(2),
  },
  continueBtn: {
    marginTop: hp(0.5),
  },
});

export default ResetPassword;
