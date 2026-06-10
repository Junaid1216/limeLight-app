import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { wp } from '../../Assets/Responsive';
import RegionComparison from '../../Screens/ASM/RegionComparison';
import SalesStaffPerformance from '../../Screens/ASM/SalesStaffPerformance';
import ASMBottomTabs from './ASMBottomTabs';
import ASMDrawerContent from './ASMDrawerContent';

const DRAWER_BOTTOM_ROUTE = 'BottomNavigation';

const drawerNavigatorScreenOptions = {
  headerShown: false,
  drawerStyle: {
    width: wp(75),
  },
  swipeEnabled: false,
};

const DrawerNav = createDrawerNavigator();

const ASMDrawerNavigator = () => (
  <DrawerNav.Navigator
    drawerContent={props => <ASMDrawerContent {...props} />}
    initialRouteName={DRAWER_BOTTOM_ROUTE}
    screenOptions={drawerNavigatorScreenOptions}
  >
    <DrawerNav.Screen
      name={DRAWER_BOTTOM_ROUTE}
      component={ASMBottomTabs}
      options={{ headerShown: false }}
    />
    <DrawerNav.Screen
      name="RegionComparison"
      component={RegionComparison}
      options={{ headerShown: false }}
    />
    <DrawerNav.Screen
      name="SalesStaffPerformance"
      component={SalesStaffPerformance}
      options={{ headerShown: false }}
    />
  </DrawerNav.Navigator>
);

export default ASMDrawerNavigator;
