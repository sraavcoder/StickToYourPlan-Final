import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import Step1 from './screens/Step1';
import Step2 from './screens/Step2';
import MyTasks from './screens/MyTasks';
import TaskDetails from './screens/TaskDetails';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

// import { AppTabNavigator } from './components/TabNavigator';


export default function App() {
  return (
    <AppContainer />
  );
}


const switchNavigator = createSwitchNavigator({

  WelcomeScreen: { screen: WelcomeScreen },
  HomeScreen: { screen: HomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  Step1: { screen: Step1 },
  Step2: { screen: Step2 },
  TaskDetails: { screen: TaskDetails },
  MyTasks: { screen: MyTasks },

})

const AppContainer = createAppContainer(switchNavigator);
