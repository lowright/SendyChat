import React, {Component} from 'react'
import {Image, View, ScrollView, StyleSheet, ActivityIndicator, TextInput, SafeAreaView , TouchableOpacity, Text } from 'react-native'
import {Header} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';


class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Профиль ',
  };

  constructor(props){
    super(props)

    this.state = {
      isLoading : false,
      error : '',
      userName : '',
      userLastName : '',
      userToken : '',
      nickname : '',
      aboutUser : '',
      userAvatar : '',
      
    }

    
  }


  getDateuser = async () => {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    const settings = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };
    try {
      const res = await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/user`, settings);
      const data = await res.json()
      this.setState({
        isLoading: false,
        userName : data.firstname,
        userLastName : data.lastname,
        userPhone : data.phone,
        nickname : data.nickname,
        aboutUser : data.aboutme,
        userAvatar : data.avatar
      })
    } catch (error) {
      alert(error)
    }
  }

  componentDidMount (){
    this.getDateuser()
  }


  patchUserInfo = async () => {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    const settings = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body : JSON.stringify({
        nickname : this.state.nickname,
        firstname : this.state.userName
      })
    };
    try {
      await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/update_user`, settings);
    } 
    catch (error) { alert(error) }
  }
  

  render() {
    const { isLoading, userName, userLastName, userPhone, nickname, aboutUser } = this.state;
    if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator  color={'#000'} />
        </View>
      )
    }

    return(
      <SafeAreaView  style={styles.container}>
        <Header
          centerComponent={{ text: 'Профиль', style: { color: '#000', fontSize : 20 } }}
          rightComponent={{ icon: 'settings', color: '#000' }}
          containerStyle={styles.header}
        />
        <ScrollView>
        <View style={styles.userInfoCont}>
          <View style={styles.userImage}>
            <Image
              source={{ uri: 'https://s3-ap-northeast-1.amazonaws.com/peatix-files/user/5562732/240administrator-male.png' }}
              style={{width : "100%", height : 100}}
            />
          </View>
          <View style={styles.userSett}>
            <TextInput 
              style={styles.userInfo}
              onChangeText={userName => this.setState({userName})}
              value={userName}
              placeholder={'Имя'}
            />
            <TextInput 
              style={styles.userInfo}
              onChangeText={userLastName => this.setState({userLastName})}
              value={userLastName}
              placeholder={'Фамилия'}
            />
          </View>
        </View>
        <View style={styles.userContactInfo}>
          <TextInput 
            style={styles.userInfo}
            value={userPhone}
            placeholder={'Номер телефона'}
            onChangeText={phone => this.setState({userPhone : phone})}
          />
          <TextInput 
            style={styles.userInfo}
            value={nickname}
            placeholder={'Никнейм'}
            onChangeText={nickname => this.setState({nickname})}
          />
          <TextInput 
            style={styles.userInfo}
            placeholder={'О себе'}
            value={aboutUser}
            onChangeText={aboutUser => this.setState({aboutUser})}
          />
        </View>
        <TouchableOpacity
         style={styles.profileButton}
          onPress={() => this.patchUserInfo()}
        >
         <Text style={{fontSize : 14, textAlign : 'center'}}> Сохранить </Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.profileButton}
         onPress={() => this.deleteUser()}
        >
         <Text style={{fontSize : 14, textAlign : 'center'}}> Удалить аккаунт </Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.profileButton}
         onPress={() => this._signOutAsync()}
        >
         <Text style={{fontSize : 14, textAlign : 'center'}}> Выйти </Text>
       </TouchableOpacity>
        </ScrollView>
      </SafeAreaView >
    )

  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  deleteUser = async () => {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    const settings = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    };
    try {
      await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/deleteuser`, settings);
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth')
    } 
    catch (error) { alert(error) }
  }
}

export default ProfileScreen


const styles = StyleSheet.create({
    container : {
      alignItems : 'center',
      height : '100%'
    }, 
    preloader : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    userInfoCont : {
      width : '100%',
      flexDirection : 'row',
      borderBottomWidth : 0.4,
      paddingBottom : 3,
      borderBottomColor : '#000',
      paddingTop : 20,
      paddingBottom : 20
    },
    userImage : {
      width : '35%'
    },
    userSett : {
      width : '65%'
    },
    userInfo: {
      borderBottomColor : '#000',
      borderBottomWidth : 0.4,
      paddingBottom : 8
    },
    header:{
      backgroundColor: 'transparent',
      borderBottomWidth : 0.4,
      paddingBottom : 3,
      borderBottomColor : '#000',
      paddingTop : 0
    },
    userContactInfo: {
      width : '100%',
      paddingVertical : 20,
      paddingLeft : 20
    },
    profileButton:{
      width : '100%',
      borderBottomWidth : 0.4,
      paddingBottom : 3,
      borderBottomColor : '#000',
      borderTopColor : '#000',
      borderTopWidth : 0.4,
      paddingTop : 10,
      paddingBottom : 10,
      marginBottom : 19
    }
})