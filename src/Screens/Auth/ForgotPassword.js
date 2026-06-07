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
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Btn
          title={Strings.sendVerificationCode}
          onPress={() => navigation.navigate('Verification')}
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
