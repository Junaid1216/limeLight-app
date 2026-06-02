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

const ResetPassword = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          value={newPassword}
          onChangeText={setNewPassword}
          wrapperStyle={styles.inputGap}
        />

        <Customtextinput
          placeholder={Strings.confirmPasswordPlaceholder}
          icon={Images.Password}
          iconBg={Colors.lightGreen}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Btn
          title={Strings.continue}
          onPress={() => {}}
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
