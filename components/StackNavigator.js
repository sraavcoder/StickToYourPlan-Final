import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import MyTask from '../screens/MyTasks';
import TaskDetails from '../screens/TaskDetails';

export const AppStackNavigator = createStackNavigator({
    MyTask: {
        screen: MyTask,
        navigationOptions: { headerShown: false }
    },
    TaskDetails: {
        screen: TaskDetails,
        navigationOptions: { headerShown: false }
    },
},
    {
        initialRouteName: "MyTask"
    }
)