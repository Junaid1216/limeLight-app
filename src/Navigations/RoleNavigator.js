import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/BottomTabs/Home';
import BranchManagerHome from '../Screens/Manager/BranchManagerHome';
import { ROLES } from '../Constants/roleConfig';
import { useRole } from '../Context/RoleContext';

const ROLE_STACK = createNativeStackNavigator();

const RoleHomeScreen = () => {
  const { role } = useRole();

  if (role === ROLES.MANAGER) {
    return <BranchManagerHome />;
  }

  return <Home />;
};

const RoleNavigator = () => {
  return (
    <ROLE_STACK.Navigator screenOptions={{ headerShown: false }}>
      <ROLE_STACK.Screen name="RoleHome" component={RoleHomeScreen} />
    </ROLE_STACK.Navigator>
  );
};

export default RoleNavigator;
