import React from 'react'
import {View} from 'react-native'
import { CreateChatIcon } from '../components/Icon'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//Import Screen
import HomeScreen from '../screens/Chats/HomeScreen'
import SingInScreen from '../screens/Auth/SingIn'
import ConfirmCode from '../screens/Auth/ConfirmCode'
import RegistrationScreen from '../screens/Auth/Registration'
import StartWorkingScreen from '../screens/Auth/StartWorking'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import CallingScreeen from '../screens/Call/CallScreen'
import GroupScreen from '../screens/Group/GroupScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import PrivatChat from '../screens/Chats/PrivatChat'
import CreateNewChat from '../screens/Chats/CreateNewChat'

const ChatStack = createStackNavigator({
  Chat : {
    screen : HomeScreen, 
    navigationOptions: { 
      headerShown: false
    },
  },
  PrivatChat : {
    screen : PrivatChat,
    navigationOptions: { 
      headerShown: false
    },
  },
  CreateNewChat : {
    screen : CreateNewChat,
    navigationOptions: { 
      headerShown: false
    },
  }
})

ChatStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true
  const {routes} = navigation.state;
  for(let i = 0; i < routes.length; i += 1) {
    if(
      routes[i].routeName === 'PrivatChat'
    ){
      tabBarVisible = false
    }
  }
  return  {
    tabBarVisible,
    headerShown : null
  }
}

const UserTabs = createBottomTabNavigator(
  { 
    Group : {
      screen : GroupScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <View>
            <CreateChatIcon src={require('../assaets/images/contact1.png')}/>
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
    Call : {
      screen : CallingScreeen,
      navigationOptions: {
        tabBarIcon: () => (
          <View>
            <CreateChatIcon src={require('../assaets/images/calls1.png')}/>
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
    Home: {
      screen : ChatStack,
      navigationOptions: {
        tabBarIcon: () => (
          <View>
            <CreateChatIcon src={require('../assaets/images/chat1.png')}/>
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#000',
        barStyle: { backgroundColor: '#d13560' },
      }
    },
    Profile : {
      screen : ProfileScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <View>
            <CreateChatIcon src={require('../assaets/images/profile1.png')}/>
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
      }
    }
  },
  {
    initialRouteName: 'Profile',
    activeColor: '#000',
    inactiveColor: '#000',
    tabBarOptions: {
      activeTintColor: '#fff',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: '#00AEEF',
      },
      labelStyle: {
        fontSize: 13,
    },

    }
    
  }
);


const CofirmStack = createStackNavigator({ 
  SingIn: {
    screen : SingInScreen,
    navigationOptions: { 
      headerShown: false
    },
  },
  ConfirmCode: ConfirmCode
});


const Registration = createStackNavigator({
  Registration : RegistrationScreen, 
  StartWorking: StartWorkingScreen
})

export const Navigation = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    User: UserTabs,
    Auth: CofirmStack,
    Regist : Registration,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Navigation