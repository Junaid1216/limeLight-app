import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { wp } from '../Assets/Responsive';
import CustomDrawer from './CustomDrawer';
import BottomNavigation from './BottomNavigation';
import StaffComparison from '../Screens/Manager/StaffComparison';

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNav.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="BottomNavigation"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: wp(75),
        },
        swipeEnabled: false,
      }}>
      <DrawerNav.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <DrawerNav.Screen
        name="StaffComparison"
        component={StaffComparison}
        options={{ headerShown: false }}
      />
    </DrawerNav.Navigator>
  );
};

export default Drawer;
