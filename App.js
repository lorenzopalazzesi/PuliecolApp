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
import AnnounceListScreen from './src/screens/AnnounceListScreen';
import AnnounceDetailScreen from './src/screens/AnnounceDetailScreen';
// Colors
import { colors } from './src/constants/color';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ProcessProvider } from './src/context/ProcessContext';

import { setNavigator } from './src/navigationRef';
import TaskListDriverScreen from './src/screens/TaskListDriverScreen';
import CreateAnnounceScreen from './src/screens/CreateAnnounceScreen';




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
    }, {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="tasks" size={28} color={tintColor} />
        )
      })
    }),
    announceListFlow: createStackNavigator({
      AnnounceList: AnnounceListScreen,
      CreateAnnounce : CreateAnnounceScreen,
      AnnounceDetail: AnnounceDetailScreen
    }, {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="megaphone" size={28} color= {tintColor} />
        )
      })
    }),
    accountFlow: createStackNavigator({
      Account: AccountScreen,
      isleListFlow: createStackNavigator({
        IsleList: IsleListScreen,
        IsleDetail: IsleDetailScreen,
      }, {
        navigationOptions: {
          headerShown: false
        }
      }),
      TruckList: TruckListScreen,
      DriverList: DriverListScreen,
    }, {
      navigationOptions: () => ({
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="user" size={28} color={tintColor} />
        )
      })
    })
  }, {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: 'lightgrey',
      activeTintColor: 'white',
      style: {
        alignItems: "flex-end",
        backgroundColor: colors.primary,
        overflow: "hidden"
      }
    }
  }),

  //Flusso di navigazione che si attiva autenticandosi come DRIVER
  mainFlowDriver: createBottomTabNavigator({
    taskListFlow: createStackNavigator({
      TaskListDriver: TaskListDriverScreen
    },{
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="tasks" size={28} color={tintColor} />
        )
      })
    }),
    isleListFlow: createStackNavigator({
      IsleList: IsleListScreen,
      IsleDetail: IsleDetailScreen,
    },{
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="road" size={24} color={tintColor} />
        )
      })
    }),
    announceListFlow: createStackNavigator({
      AnnounceList: AnnounceListScreen,
      AnnounceDetail: AnnounceDetailScreen
    }, {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="megaphone" size={28} color= {tintColor} />
        )
      })
    }),
    Account: {
      screen: AccountScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="user" size={28} color= {tintColor} />
        )
      })
    }
  },{
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: 'lightgrey',
      activeTintColor: 'white',
      style: {
        alignItems: "flex-end",
        backgroundColor: colors.primary,
        overflow: "hidden"
      }
    }
  })
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