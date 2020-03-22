import React, {Component} from 'react'
import {Text, View, Button, StyleSheet, FlatList, ActivityIndicator  } from 'react-native'
import {Header, List, ListItem } from 'react-native-elements'
//Import Components
import ChatList from '../../components/ChatList'

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Чаты ',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }


  render() {
    return (
      <View>
        <Text>adad</Text>
      </View>
    );
  }
}

export default HomeScreen


const styles = StyleSheet.create({
    container : {
      alignItems : 'center',
      height : '100%'
    },
    header:{
      backgroundColor: 'transparent',
      borderBottomWidth : 0.4,
      paddingBottom : 0,
      borderBottomColor : '#000',
      paddingTop : 0,
    },
    listChatWrapper : {
      width : '100%',
      alignItems : 'center',
      flex : 1,
      paddingTop : 25
    },
    searchChanel : {
      borderColor : '#000',
      borderWidth : 1,
      borderRadius : 30,
      padding : 0,
      paddingLeft : 5,
      paddingRight : 5,
      width : '70%',
      textAlign : 'center',
      marginBottom :25
    }
})