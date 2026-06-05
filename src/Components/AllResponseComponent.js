import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../Constants/Colors';
import { wp } from '../Assets/Responsive';
import { Fonts } from '../Constants/Fonts';
import AllData from '../Components/AllData';
import CompletedComponent from '../Components/CompletedComponent';
import PendingComponent from '../Components/PendingComponent';

const Tab = createMaterialTopTabNavigator();

const AllResponseComponent = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.darkgrey,
        tabBarPressColor: 'transparent',
        tabBarPressOpacity: 1,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen name="All" component={AllData} />
      <Tab.Screen name="Completed" component={CompletedComponent} />
      <Tab.Screen name="Pending" component={PendingComponent} />
    </Tab.Navigator>
  );
};

export default AllResponseComponent;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.platinum,
    borderRadius: 10,
    margin: 10,
    elevation: 0,
    shadowOpacity: 0,
    overflow: 'hidden',
    height: 45,
  },

  tabBarItem: {
    height: 40,
  },

  tabBarIndicator: {
    backgroundColor: Colors.mediumgreen,
    height: 38,
    borderRadius: 10,
    marginLeft: wp(1),
    marginRight: wp(1),
    marginTop: wp(1),
    marginBottom: wp(1),
  },

  tabBarLabel: {
    fontSize: 12,
    textTransform: 'none',
    fontFamily: Fonts.poppinsRegular,
  },
});
