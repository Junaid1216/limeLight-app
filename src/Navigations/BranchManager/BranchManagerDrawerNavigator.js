import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { wp } from '../../Assets/Responsive';
import BranchComparison from '../../Screens/Manager/BranchComparison';
import BranchManagerBottomTabs from './BranchManagerBottomTabs';
import BranchManagerDrawerContent from './BranchManagerDrawerContent';

const DRAWER_BOTTOM_ROUTE = 'BottomNavigation';

const drawerNavigatorScreenOptions = {
  headerShown: false,
  drawerStyle: {
    width: wp(75),
  },
  swipeEnabled: false,
};

const DrawerNav = createDrawerNavigator();

const BranchManagerDrawerNavigator = () => (
  <DrawerNav.Navigator
    drawerContent={props => <BranchManagerDrawerContent {...props} />}
    initialRouteName={DRAWER_BOTTOM_ROUTE}
    screenOptions={drawerNavigatorScreenOptions}
  >
    <DrawerNav.Screen
      name={DRAWER_BOTTOM_ROUTE}
      component={BranchManagerBottomTabs}
      options={{ headerShown: false }}
    />
    <DrawerNav.Screen
      name="BranchComparison"
      component={BranchComparison}
      options={{ headerShown: false }}
    />
  </DrawerNav.Navigator>
);

export default BranchManagerDrawerNavigator;
