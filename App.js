import React from 'react';
//Navigations
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//Screens
import AccountScreen from './src/screens/AccountScreen';
import IsleDetailScreen from './src/screens/IsleDetailScreen';
import IsleListScreen from './src/screens/IsleListScreen';
import LoginScreen from './src/screens/LoginScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import TruckListScreen from './src/screens/TruckListScreen';
import DriverListScreen from './src/screens/DriverListScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
// Colors
import {colors} from './src/constants/color';
import { FontAwesome } from '@expo/vector-icons';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ProcessProvider } from './src/context/ProcessContext';

import { setNavigator } from './src/navigationRef';



const switchNavigator = createSwitchNavigator({
  // Questo screen serve solamente per effettuare un controllo relativo alla presenza del token , 
  // senza di questo l'app avrebbe mostrato per qualche istante anche la schermata di login all'utente  pur essendo gia loggato
  ResolveAuth: ResolveAuthScreen,

  loginFlow: createStackNavigator({
    Login: LoginScreen
  }),
  //Flusso di navigazione che si attiva autenticandosi come ADMIN
  mainFlow: createBottomTabNavigator({
    taskListFlow: createStackNavigator({
      TaskList: TaskListScreen,
      TaskDetail: TaskDetailScreen,
      CreateTask: CreateTaskScreen,
    }),
    isleListFlow: createStackNavigator({
      IsleList: IsleListScreen,
      IsleDetail: IsleDetailScreen,
    }),
    accountFlow: createStackNavigator({
      Account: AccountScreen,
      TruckList : TruckListScreen,
      DriverList: DriverListScreen,
    })
  },{
    tabBarOptions:{
      inactiveTintColor: 'grey',
      activeTintColor: 'white',
      style:{
        backgroundColor: colors.primary,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        overflow: "hidden"
      }
    }
  }),
  //Flusso di navigazione che si attiva autenticandosi come DRIVER
  mainFlowDriver: createBottomTabNavigator({
    isleListFlow: createStackNavigator({
      IsleList: IsleListScreen,
      IsleDetail: IsleDetailScreen,
    }),
    Account: AccountScreen,
  })
  //Da aggiungere un altro flow secondo me ( mainFlow Admin) che mostrerà schermate in piu all 'admin
});

const App = createAppContainer(switchNavigator);

export default () => {

  return (
    <AuthProvider>
      <ProcessProvider>
        <App ref={(navigator) => { setNavigator(navigator) }} />
      </ProcessProvider>
    </AuthProvider>
  );
};