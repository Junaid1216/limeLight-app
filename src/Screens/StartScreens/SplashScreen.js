import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SplashView from '../../Components/SplashView';
import { setAuthToken } from '../../Services/Api_services';

const SplashScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state?.AUTH?.userData);
  const role = useSelector(state => state?.ROLE?.userData);
  const token = userData?.token;

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }

    const timer = setTimeout(() => {
      if (token && role) {
        navigation.replace('Drawer');
        return;
      }

      if (role) {
        navigation.replace('AuthNavigation');
        return;
      }

      navigation.replace('Role');
    }, token && role ? 1200 : 4500);

    return () => clearTimeout(timer);
  }, [navigation, role, token]);

  return <SplashView />;
};

export default SplashScreen;
