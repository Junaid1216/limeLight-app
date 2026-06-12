import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Btn from '../../Components/Btn';
import MainHeaderComponent from '../../Components/MainHeaderComponent';
import OtpInput from '../../Components/OtpInput';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { otpRegex } from '../../Constants/Regex';
import { Strings } from '../../Constants/Strings';

const RESEND_TIMER_SECONDS = 50;

const Verification = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ otp: ['', '', '', '', '', ''] });
  const [error, setError] = useState({ otpError: '' });
  const [resendTimer, setResendTimer] = useState(0);

  const isResendDisabled = resendTimer > 0;
  const resendText =
    resendTimer > 0
      ? Strings.resend + '(' + resendTimer + ')'
      : Strings.resend;

  useEffect(() => {
    if (!isResendDisabled) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isResendDisabled]);

  const handleResend = () => {
    if (isResendDisabled) {
      return;
    }
    setResendTimer(RESEND_TIMER_SECONDS);
  };

  const handleContinue = () => {
    const otpValue = form.otp.join('');

    if (!otpValue) {
      setError({ otpError: 'Please enter OTP' });
      return;
    } else if (!otpRegex.test(otpValue)) {
      setError({ otpError: 'OTP must be 6 digits' });
      return;
    } else {
      setError({ otpError: '' });
      navigation.navigate('ResetPassword');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <MainHeaderComponent title={Strings.verificationHeader} />

      <Text style={styles.heading} numberOfLines={1}>
        {Strings.enterOtp}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {Strings.otpSentTo}
      </Text>

      <OtpInput
        value={form.otp}
        onChange={otp => {
          setForm({ ...form, otp });
          setError({ ...error, otpError: '' });
        }}
        error={error.otpError}
      />

      <View style={styles.resendRow}>
        <Text style={styles.resendText} numberOfLines={2}>
          {Strings.didntReceiveCode}
          <Text
            style={[styles.resendLink, isResendDisabled && styles.resendLinkDisabled]}
            onPress={handleResend}
            disabled={isResendDisabled}
            numberOfLines={1}>
            {resendText}
          </Text>
        </Text>
      </View>

      <Btn
        title={Strings.continue}
        onPress={handleContinue}
        style={styles.continueBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  heading: {
    fontSize: Fontsize.l,
    fontFamily: Fonts.poppinsMedium,
    color: Colors.black,
  },
  subtitle: {
    fontSize: Fontsize.xs2,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.black,
    marginBottom: hp(1.7),
  },
  resendRow: {
    alignItems: 'flex-end',
    marginBottom: hp(1),
  },
  resendText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.mediumGrey,
  },
  resendLink: {
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.teal,
  },
  resendLinkDisabled: {
    opacity: 0.5,
  },
  continueBtn: {
    marginTop: hp(0.5),
  },
});

export default Verification;
