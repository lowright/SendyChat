import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import Screen
import HomeScreen from '../screens/Chats/HomeScreen'
import SingInScreen from '../screens/Auth/SingIn'
import ConfirmCode from '../screens/Auth/ConfirmCode'
import RegistrationScreen from '../screens/Auth/Registration'
import StartWorkingScreen from '../screens/Auth/StartWorking'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'

const UserStack = createStackNavigator({ Home: HomeScreen});
const CofirmStack = createStackNavigator({ 
  SingIn: {
    screen : SingInScreen,
    navigationOptions: { 
      headerShown: false
     },
  },
  ConfirmCode: ConfirmCode
});
const Registration = createStackNavigator({Registration : RegistrationScreen, StartWorking: StartWorkingScreen})

export const Navigation = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    User: UserStack,
    Auth: CofirmStack,
    Regist : Registration
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Navigation