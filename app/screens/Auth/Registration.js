import React, {Component} from 'react'
import {Image, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView  } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class RegistrationScreen extends Component {
  

  constructor(props){
    super(props) 

    this.state = {
      nickname: '',
      name: '',
      lastname: '',
      firstname : '',
      lastname : '',
      userToken : '',
      
    }
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
        const data = await fetch(`https://secret-peak-55840.herokuapp.com/api/v1/register`, settings);
        const json = await data.json()
        
        if(JSON.stringify(json.access_token)){
          await AsyncStorage.setItem('userToken', JSON.stringify(json.access_token));
          await this.props.navigation.navigate('StartWorking');
      } else{
          alert('Упс... Что-то пошло не так')
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
      return (

          <SafeAreaView  style={styles.wrapper}>
            <Image
              source={{uri : 'https://img.icons8.com/clouds/2x/user.png'}}
              style={{width : 140, height : 140}}
            />  
           
                <ScrollView  style={styles.scroll}>
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
                </ScrollView>
              
              
          </SafeAreaView >
      )

  }

}


export default RegistrationScreen

const styles = StyleSheet.create({
  wrapper: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 30,
      paddingVertical : '10%',
      flex : 1
  },
  input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '100%',
      marginBottom: 25
  },
  welcome: {
      alignItems: 'center',
      backgroundColor: '#00AEEF',
      padding: 14,
      borderRadius: 32,
      marginHorizontal: 20,
      marginTop : 40
  },
  welcomeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff"
  },
  scroll: {
    width : '100%'
  }
})