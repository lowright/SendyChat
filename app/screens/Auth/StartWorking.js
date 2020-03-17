import React, {Component} from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class StartWorkingScreen extends React.Component {
    static navigationOptions = {
      title: 'Start Working',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Start Working" onPress={() => this._registrAsync()} />
        </View>
      );
    }
    _registrAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('User');
    };
  
}

export default StartWorkingScreen


const styles = StyleSheet.create({
    container : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
    }
})