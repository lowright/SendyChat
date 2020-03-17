import React, {Component} from 'react'
import {Image, TextInput, StyleSheet, TouchableOpacity, Text, Button} from 'react-native'
import {View} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

class RegistrationScreen extends Component {
  state = {
      nickname: '',
      name: '',
      lastname: '',
      firstname : ' ',
      lastname : '',
      userToken : ''
  }
  
  sendUserInfo = async () => {
      const navigationProps = this.props.navigation.state.params

      const { nickname, firstname , lastname} = this.state
      const settings = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone : navigationProps.phone,
          nickname,
          firstname, 
          lastname,
        })
      };
      try {
        const data = await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/register`, settings);
        const json = await data.json()
        
        if(JSON.stringify(json.access_token)){
          await AsyncStorage.setItem('userToken', JSON.stringify(json.access_token));
          await this.props.navigation.navigate('User');
        } else{
          alert('Error')
        }
      } 
      catch (error) { alert(error) }

   };


    // Get user input
    onChangeText(key, value) {
      this.setState({
        [key]: value
      })
    }

    
  render() {
      const { photo} = this.state;
      return (

          <View style={styles.wrapper}>
             <Image
                  style={{
                  paddingVertical: 30,
                  width: 150,
                  height: 150,
                  borderRadius: 75
                  }}
                  resizeMode='cover'
                  source={{uri: 'https://img.icons8.com/clouds/2x/user.png'}}/>

              <TextInput
                  style={styles.input}
                  onChangeText={firstname => this.onChangeText('firstname', firstname)}
                  value={this.state.firstname}
                  placeholder={'Имя (обязательно)'}/>
              <TextInput
                  style={styles.input}
                  onChangeText={lastname => this.onChangeText('lastname', lastname)}
                  value={this.state.lastname}
                  placeholder={'Фамилия (необязательно)'}/>
              <TextInput
                  style={styles.input}
                  onChangeText={nickname => this.onChangeText('nickname', nickname)}
                  value={this.state.nickname}
                  placeholder={'Никнейм (обязательно)'}/>
              <TouchableOpacity onPress={() => this.sendUserInfo()} style={styles.welcome}>
                  <Text style={styles.welcomeTitle}>
                      Готово
                  </Text>
              </TouchableOpacity>
          </View>
      )

  }

}


export default RegistrationScreen

const styles = StyleSheet.create({
  wrapper: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      paddingVertical : '10%'
  },
  input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '100%',
      marginBottom: 15
  },
  welcome: {
      alignItems: 'center',
      backgroundColor: '#00AEEF',
      padding: 14,
      width : '75%',
      marginBottom: 10,
      borderRadius: 32,
      marginHorizontal: 20,
      marginTop: 10
  },
  welcomeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff"
  }
})