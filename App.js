import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

import SplashScreen from './app/screens/SplashScreen'
import Navigation from './app/route/routerChat'
import Test from './app/screens/Chats/CreateNewChat'
import { LoaderScreen } from 'react-native-ui-lib';


class App extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { isLoading: true }
  }
  
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  render(){
    if (this.state.isLoading) {
      return <LoaderScreen />;
    } else {
      return <Navigation/>
    }
  }

}

export default App
