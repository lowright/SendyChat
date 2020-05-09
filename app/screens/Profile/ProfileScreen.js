import React, {Component} from 'react'
import {Image, View, Scr, StyleSheet, ActivityIndicator, TextInput, SafeAreaView , TouchableOpacity, Text } from 'react-native'
import {Header} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../../components/Icon'
import {connect} from 'react-redux'
import dataUserFetch from '../../actions/userDataAction'


class ProfileScreen extends Component {

  static navigationOptions = {
    title: 'Профиль ',
  }

  state = {
    token : '',
  }

  setToken = async () => {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    this.setState({token})
  }

  async componentDidMount (){ 
      try {
          await this.setToken()
          await this.props.fetchData("https://nameless-forest-37690.herokuapp.com/api/v1/user", {
              method: 'GET',
              headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.state.token
              }, 
          })
      }
      catch (err) {
          console.log(err)
      }
  }

  render() {
    
    const { isLoading } = this.props.user
    if (isLoading === false) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator  color={'#000'} />
        </View>
      )
    }
    const { firstname, lastname, aboutme, phone, nickname } = this.props.user.data

    return(
      <SafeAreaView  style={styles.container}>
        <Header
          centerComponent={{ text: 'Профиль', style: { color: '#000', fontSize : 18 } }}
          rightComponent={<Icon src={require('../../assaets/images/settings.png')} />}
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
              value={firstname}
              placeholder={'Имя'}
            />
            <TextInput 
              style={styles.userInfo}
              onChangeText={userLastName => this.setState({userLastName})}
              value={lastname}
              placeholder={'Фамилия'}
            />
          </View>
        </View>
        
        <View style={styles.userContactInfo}>
          <TextInput 
            style={styles.userInfo}
            value={phone}
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
            value={aboutme}
            onChangeText={aboutUser => this.setState({aboutUser})}
          />
        </View>
        <TouchableOpacity
         style={styles.profileButton}
          onPress={() => this.patchUserInfo()}
        >
         <Text style={{fontSize : 14, textAlign : 'center'}}>user</Text>
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


}


const mapStateToProps = state => {
  return {
    user : state.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData : (url, config) => dispatch(dataUserFetch(url, config))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ProfileScreen)


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
      backgroundColor: '#ECF3F5',
      borderBottomWidth : 0.4,
      paddingBottom : 0,
      borderBottomColor : '#000',
      paddingTop : 0,
      height : 60
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