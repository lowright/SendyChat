import * as React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      this.props.navigation.navigate(userToken ? 'User' : 'Auth');
    };
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

export default AuthLoadingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  