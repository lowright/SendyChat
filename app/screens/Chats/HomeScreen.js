import React, {Component} from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


class HomeScreen extends React.Component {

    static navigationOptions = {
      title: 'Chat ',
    };
  
    constructor(props){
      super(props)

      this.state = {
        nickname : '',
        firstname : '',
        lastname : '',

      }
    }

    componentDidMount(){
      // const settings = {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     phone : navigationProps.phone,
      //     code : value
      //   })
      // };
      // try {
      //   const data = await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/checksmscode`, settings);
      //   const json = await data.json()
      //   if((JSON.stringify(json.message) === "Register")){
      //     await this.props.navigation.navigate('Regist')
      //   } else{
      //     await AsyncStorage.setItem('userToken', JSON.stringify(json.access_token));
      //     await navigation.navigate('User');
      //   }
      // } 
      // catch (error) { alert(error) }
    }

    render() {
      return (
        <View style={styles.container}>
          <Button title="Welcome To Chat UserId 34)" onPress={this._signOutAsync} />
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

export default HomeScreen


const styles = StyleSheet.create({
    container : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
    }
})