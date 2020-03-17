import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Navigation from './app/route/routerChat'


class App extends Component {
  
  render(){
    return(<Navigation/>)
  }

}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
