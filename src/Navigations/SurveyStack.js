import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Survey from '../Screens/CommonScreens/Survey';
import SurveyReport from '../Screens/CommonScreens/SurveyReport';

const STACK = createNativeStackNavigator();

const SurveyStack = () => {
  return (
    <STACK.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SurveyMain"
    >
      <STACK.Screen name="SurveyMain" component={Survey} />
      <STACK.Screen name="SurveyReport" component={SurveyReport} />
    </STACK.Navigator>
  );
};

export default SurveyStack;
