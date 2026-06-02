import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/StartScreens/SplashScreen';
import Role from '../Screens/StartScreens/Role';
import AuthNavigation from './AuthNavigation';
import AppNavigator from './AppNavigator';

const MAIN_STACK = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MAIN_STACK.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}>
        <MAIN_STACK.Screen name="SplashScreen" component={SplashScreen} />
        <MAIN_STACK.Screen name="Role" component={Role} />
        <MAIN_STACK.Screen name="AuthNavigation" component={AuthNavigation} />
        <MAIN_STACK.Screen name="Drawer" component={AppNavigator} />
      </MAIN_STACK.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
