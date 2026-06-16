import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { isValidLogin } from '../../Constants/Regex';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useNavigation } from '@react-navigation/native';
import { useRole } from '../../Context/RoleContext';
import Api from '../../Services/Api_services';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const { role } = useRole();
  const [form, setForm] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ emailError: '' });

  const handleSendVerificationCode = async () => {
    if (isLoading) {
      return;
    } else if (!role) {
      setError({ emailError: 'Please select your role first' });
    } else if (!form.email.trim()) {
      setError({ emailError: 'Please enter email or employee ID' });
    } else if (!isValidLogin(form.email.trim())) {
      setError({ emailError: 'Please enter a valid email or employee ID' });
    } else {
      setError({ emailError: '' });
      setIsLoading(true);

      const formData = new FormData();
      formData.append('type', role);
      formData.append('login', form.email.trim());

      try {
        const res = await Api.sendOtp(formData);
        console.log('Send OTP Response:', JSON.stringify(res?.data, null, 2));

        if (res?.data?.status == 'success') {
          navigation.navigate('Verification', {
            login: form.email.trim(),
            type: role,
          });
        } else {
          setError({
            emailError: res?.data?.message,
          });
        }
      } catch (err) {
        console.log(
          'Send OTP API Error:',
          JSON.stringify(err?.response?.data, null, 2),
        );
        setError({ emailError: 'Error occurred while sending code' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={[MyStyling.container2]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.content}>
        <MainHeaderComponent title={Strings.forgotPasswordHeader} />

        <Text style={styles.heading} numberOfLines={1}>{Strings.cannotLogin}</Text>
        <Text style={styles.description} numberOfLines={2}>{Strings.forgotPasswordDesc}</Text>

        <Customtextinput
          label={Strings.emailLabel}
          placeholder={Strings.emailPlaceholder}
          icon={Images.Email}
          iconBg={Colors.lightBlue}
          value={form.email}
          onChangeText={text => {
            setForm({ ...form, email: text });
            setError({ ...error, emailError: '' });
          }}
          keyboardType="default"
          error={error.emailError}
        />

        <Btn
          title={Strings.sendVerificationCode}
          onPress={handleSendVerificationCode}
          loading={isLoading}
          style={styles.sendBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.white,
  },
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
  sendBtn: {
    marginTop: hp(0.5),
  },
});

export default ForgotPassword;
