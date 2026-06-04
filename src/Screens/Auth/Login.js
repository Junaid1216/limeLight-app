import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[MyStyling.container1, styles.content]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.mint} />

      <Text style={styles.welcomeText} numberOfLines={1}>
        {Strings.welcomeBack}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {Strings.loginSubtitle}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {Strings.login}
        </Text>

        <Customtextinput
          label={Strings.emailLabel}
          placeholder={Strings.emailPlaceholder}
          icon={Images.Email}
          iconBg={Colors.lightBlue}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Customtextinput
          label={Strings.passwordLabel}
          placeholder={Strings.passwordPlaceholder}
          icon={Images.Password}
          iconBg={Colors.lightGreen}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showToggle
        />

        <Pressable
          style={styles.forgotWrap}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText} numberOfLines={1}>
            {Strings.forgotPassword}
          </Text>
        </Pressable>
      </View>

      <Btn
        title={Strings.login}
        onPress={() =>
          navigation.navigate('Drawer', {
            screen: 'BottomNavigation',
            params: { screen: 'Home' },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(8),
    paddingBottom: hp(6),
  },
  welcomeText: {
    fontSize: Fontsize.ml,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginTop: wp(10),
  },
  subtitle: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsRegular,
    color: Colors.grey,
    marginBottom: hp(3),
    lineHeight: hp(2),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: wp(8),
    paddingHorizontal: wp(5),
    paddingTop: hp(2.5),
    paddingBottom: hp(2.2),
    elevation: wp(0.2),
    borderColor: Colors.dividerBlue,
    borderWidth: wp(0.3),
  },
  cardTitle: {
    fontSize: Fontsize.m,
    fontFamily: Fonts.poppinsSemiBold,
    color: Colors.black,
    marginBottom: hp(2),
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: hp(0.5),
  },
  forgotText: {
    fontSize: Fontsize.s,
    fontFamily: Fonts.poppinsBold,
    color: Colors.blue,
    maxWidth: wp(28),
  },
});

export default Login;
