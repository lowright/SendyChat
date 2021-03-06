import React, {Component, PureComponent} from 'react'
import {FlatList, Text, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {Header, Avatar, ThemeConsumer} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../../components/Icon';
import Pusher from 'pusher-js/react-native';
import messagesFetch from '../../actions/userDirectMessagesAction'
import {connect} from 'react-redux'
import { gotNewMessage, sendNewMessage } from '../../reducers/userDirectMess';
import { Button } from 'react-native-paper';

class PrivatChat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mess: [], //Obj
      sendMess : '',
      token : '',
      participentID : ''
    }

    Pusher.logToConsole = true;

  }


  async getDirectMessages() {
    const { navigation }  = this.props;
    const navigationProps = navigation.state.params;
    try {
      await this.props.fetchData(`https://intense-plateau-05807.herokuapp.com/api/v1/get_direct_messages/user/${this.state.participentID}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token
        },
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async ConnectedSocet(){
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    this.pusher = new Pusher('b1c2d3f16dd5c2f46482', {
      activityTimeout: 6000,
      cluster: 'mt1',
      forceTLS: true,
      authEndpoint: "https://intense-plateau-05807.herokuapp.com/broadcasting/auth",
      auth:{
        headers:{
          'Authorization': 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
        }
      }
    })
    this.setState({pusher : this.pusher})
    this.messagesChanel = this.pusher.subscribe('private-messages.' + this.props.user.data.id)
    this.messagesChanel.bind("App\\Events\\MessageSent", data => {
      console.log('SOCET >>>>' + data)
      this.props.newMessages(data)
    })
  }
  
  
  async componentDidMount() {

    const { navigation }  = this.props;
    const navigationProps = navigation.state.params;
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice( 1, -1 )
    this.setState({
      token,
      participentID : navigationProps.id
    })



    console.log('<<<<<< getDirectMessages() >>>>>')
    await this.getDirectMessages()
    await this.ConnectedSocet()

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps == nextProps) {
      return true
    }
    console.log(nextProps.directMess)
    console.log(nextState)
    return false
  }

  async componentWillUnmount() {
    this.state.pusher.unsubscribe('private-messages.' + this.props.user.data._id)
  }

  send(messages) {
    fetch('https://intense-plateau-05807.herokuapp.com/api/v1/send_direct_message', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "text": messages[0]['text'],
        "to_id": this.props.receiver
      })
      
    })
    .then(
      this.props.sendNewMess(messages)
    )
      
    .catch( error => console.log( 'Eroooooooe' + error ) )
  }

  render() {
    const { navigation }  = this.props;
    const navigationProps = navigation.state.params;
    const {directMess} = this.props

    
    return (
      <>

        <Header
          leftComponent={
            <TouchableOpacity
              onPress={ () => this.props.navigation.goBack() }
            >
                <Icon 
                  src={require('../../assaets/images/back.png')}  
                />
            </TouchableOpacity>
            
            
          }
          centerComponent={{ text: `${navigationProps.nickname}`, style: { color: '#000', fontSize : 18 } }}
          rightComponent={
            <TouchableOpacity
            >
              <Icon 
                src={require('../../assaets/images/calls.png')}  
              />
            </TouchableOpacity>
          }
          containerStyle={styles.header}
        />

        

        <View style={{flex : 1, height : '100%'}}>
          <GiftedChat
            messages={directMess}
            user={{_id: `${this.props.user.data._id}`}}
            placeholder='Type your message here...'
            inverted={true}
            scrollToBottom={true}
            onSend={messages => this.send(messages)}
            
          />
        </View>

      </>
    )
  }

}



const mapStateToProps = ( state, {navigation} ) => {
  console.log('Set Props From Store >>>>>>>>')
  console.log(JSON.stringify(state.userDirectMess.data))
  return {
    directMess : state.userDirectMess.data,
    user : state.userData,
    receiver: navigation.getParam('id')
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData : (url, config) => dispatch(messagesFetch(url, config)),
    newMessages : mess => dispatch(gotNewMessage(mess)),
    sendNewMess : mess => dispatch(sendNewMessage(mess))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(PrivatChat)

const styles = StyleSheet.create({
    header:{
      backgroundColor: '#ECF3F5',
      borderBottomWidth : 0.4,
      paddingBottom : 0,
      borderBottomColor : '#000',
      paddingTop : 0,
      height : 60
    },
})