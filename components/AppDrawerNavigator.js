import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen'
import CustomSideBarMenu from './SideBarMenu';
import SettingScreen from '../screens/Settings';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Settings: {
    screen: SettingScreen
  },

},
  {
    contentComponent: CustomSideBarMenu
  },
  {
    initialRouteName: 'Home'
  })
