import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ConfirmCode from './../../screens/Auth/ConfirmCode'
import Registration from './../../screens/Auth/Registration';
import StartWork from './../../screens/Auth/StartWork';
import Authentication from './../../screens/Auth/Authentication';

const Route = createStackNavigator({
    Authentication: {
      screen: Authentication,
      
    },
    Registration: {
        screen: Registration,
    },
    ConfirmCode: {
        screen: ConfirmCode,
    },
    StartWork: {
        screen: StartWork,
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AuthNavigator = createAppContainer(Route)

export default AuthNavigator