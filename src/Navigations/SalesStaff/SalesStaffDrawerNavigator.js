import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { wp } from '../../Assets/Responsive';
import SalesStaffBottomTabs from './SalesStaffBottomTabs';
import SalesStaffDrawerContent from './SalesStaffDrawerContent';

const DRAWER_BOTTOM_ROUTE = 'BottomNavigation';

const drawerNavigatorScreenOptions = {
  headerShown: false,
  drawerStyle: {
    width: wp(75),
  },
  swipeEnabled: false,
};

const DrawerNav = createDrawerNavigator();

const SalesStaffDrawerNavigator = () => (
  <DrawerNav.Navigator
    drawerContent={props => <SalesStaffDrawerContent {...props} />}
    initialRouteName={DRAWER_BOTTOM_ROUTE}
    screenOptions={drawerNavigatorScreenOptions}
  >
    <DrawerNav.Screen
      name={DRAWER_BOTTOM_ROUTE}
      component={SalesStaffBottomTabs}
      options={{ headerShown: false }}
    />
  </DrawerNav.Navigator>
);

export default SalesStaffDrawerNavigator;
