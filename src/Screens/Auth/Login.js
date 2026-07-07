import React, { useCallback, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../Assets';
import Btn from '../../Components/Btn';
import Customtextinput from '../../Components/Customtextinput';
import ScreenScrollView from '../../Components/ScreenScrollView';
import { hp, wp } from '../../Assets/Responsive';
import { Colors } from '../../Constants/Colors';
import { Fontsize } from '../../Constants/Fontsize';
import { Fonts } from '../../Constants/Fonts';
import { isValidLogin } from '../../Constants/Regex';
import { Strings } from '../../Constants/Strings';
import { MyStyling } from '../../Constants/Styling';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { useRole } from '../../Context/RoleContext';
import { USER_DATA } from '../../Redux/Slices/AuthSlice';
import Api, { setAuthToken } from '../../Services/Api_services';
import { normalizeAuthUser } from '../../Constants/roleConfig';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { role } = useRole();

  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });

  useFocusEffect(
    useCallback(() => {
      if (!role) {
        navigation.getParent()?.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Role' }],
        });
      } else {
        setError({ emailError: '', passwordError: '' });
      }
    }, [role, navigation]),
  );

  const handleLogin = async () => {
    if (isLoading) {
      return;
    } else if (!role) {
      setError({
        emailError: 'Please select your role first',
        passwordError: '',
      });
    } else if (!form.email.trim()) {
      setError({
        emailError: 'Please enter email or employee ID',
        passwordError: '',
      });
    } else if (!isValidLogin(form.email.trim())) {
      setError({
        emailError: 'Please enter a valid email or employee ID',
        passwordError: '',
      });
    } else if (!form.password) {
      setError({
        emailError: '',
        passwordError: 'Please enter password',
      });
    } else {
      setError({ emailError: '', passwordError: '' });
      setIsLoading(true);

      const formData = new FormData();
      formData.append('type', role);
      formData.append('login', form.email.trim());
      formData.append('password', form.password);

      try {
        const res = await Api.login(formData);
        console.log('Login success:', JSON.stringify(res?.data, null, 2));

        if (res?.status == 200) {
          console.log('Login Response:', JSON.stringify(res?.data, null, 2));
          Toast.show(res?.data?.message, Toast.LONG);
          setAuthToken(res?.data?.data?.token);
          dispatch(USER_DATA(normalizeAuthUser(res?.data?.data)));
          console.log('userData', normalizeAuthUser(res?.data?.data));

          navigation.navigate('Drawer', {
            screen: 'BottomNavigation',
            params: { screen: 'Home' },
          });
        } else {
          Toast.show(res?.data?.message, Toast.LONG);
          setError({
            emailError: res?.data?.message,
            passwordError: '',
          });
        }
      } catch (error) {
        console.log('Login API Error:', error?.response?.data || error);
        Toast.show(error?.response?.data?.message, Toast.LONG);
        setError({
          emailError: error?.response?.data?.message,
          passwordError: '',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenScrollView
      style={MyStyling.container1}
      contentContainerStyle={styles.content}
      backgroundColor={Colors.mint}>
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
          value={form.email}
          onChangeText={text => {
            setForm({ ...form, email: text });
            setError({ ...error, emailError: '' });
          }}
          keyboardType="default"
          error={error.emailError}
        />

        <Customtextinput
          label={Strings.passwordLabel}
          placeholder={Strings.passwordPlaceholder}
          icon={Images.Password}
          iconBg={Colors.lightGreen}
          value={form.password}
          onChangeText={text => {
            setForm({ ...form, password: text });
            setError({ ...error, passwordError: '' });
          }}
          secureTextEntry
          showToggle
          error={error.passwordError}
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
        onPress={handleLogin}
        loading={isLoading}
      />
    </ScreenScrollView>
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
