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
import { emailRegex } from '../../Constants/Regex';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: '' });
  const [error, setError] = useState({ emailError: '' });

  const handleSendVerificationCode = () => {
    if (!form.email) {
      setError({ emailError: 'Please enter email' });
      return;
    } else if (!emailRegex.test(form.email)) {
      setError({ emailError: 'Please enter a valid email' });
      return;
    } else {
      setError({ emailError: '' });
      navigation.navigate('Verification');
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
          keyboardType="email-address"
          error={error.emailError}
        />

        <Btn
          title={Strings.sendVerificationCode}
          onPress={handleSendVerificationCode}
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
