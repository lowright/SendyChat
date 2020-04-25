import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  
} from 'react-native';

import SplashScreen from './app/screens/SplashScreen'
import Navigation from './app/route/routerChat'
import R from './app/screens/Profile/ProfileScreen'


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
        3000
      )
    );
  }

  render(){
    if (this.state.isLoading) {
      return <SplashScreen />;
    } else {
      return <Navigation/>
    }
    
  }

}

export default App
