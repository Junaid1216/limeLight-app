import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import ChangePassword from '../Screens/CommonScreens/ChangePassword';
import SurveyProgress from '../Screens/CommonScreens/SurveyProgress';
import Announcement from '../Screens/CommonScreens/Announcement';
import AnnouncementDetail from '../Screens/CommonScreens/AnnouncementDetail';
import Profile from '../Screens/CommonScreens/Profile';

const APP_STACK = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <APP_STACK.Navigator
      initialRouteName="BottomNavigation"
      screenOptions={{ headerShown: false }}>
      <APP_STACK.Screen name="BottomNavigation" component={DrawerNavigator} />
      <APP_STACK.Screen name="ChangePassword" component={ChangePassword} />
      <APP_STACK.Screen name="SurveyProgress" component={SurveyProgress} />
      <APP_STACK.Screen name="Announcement" component={Announcement} />
      <APP_STACK.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetail}
      />
      <APP_STACK.Screen name="Profile" component={Profile} />
    </APP_STACK.Navigator>
  );
};

export default AppNavigator;
