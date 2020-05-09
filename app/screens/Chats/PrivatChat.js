import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {Header, Avatar, ThemeConsumer} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../../components/Icon';
import messagesFetch from '../../actions/userDirectMessagesAction'
import {connect} from 'react-redux'

class PrivatChat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [], //Obj
      userID : '', //String
      token : '', //String
      chanel : null, //NULL
      participentID : '' //String
    }

  }
  

  async getDirectMessages() {
    try {
      await this.props.fetchData(`https://nameless-forest-37690.herokuapp.com/api/v1/get_direct_messages/user/${this.state.participentID}`, {
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

  }
  
  
  render() {
    
    return (
      <>
        <Header
          leftComponent={<Icon src={require('../../assaets/images/back.png')}  />}
          centerComponent={{ text: 'Privat Chat', style: { color: '#000', fontSize : 18 } }}
          rightComponent={<Avatar rounded title={this.state.id} />}
          containerStyle={styles.header}
        />
        <GiftedChat
          messages={this.props.directMess.data}
          user={{_id: this.props.user.data.id}}
        />
      </>
    )
  }

}


const mapStateToProps = state => {
  console.log('Set Props From Store >>>>>>>>')
  console.log(JSON.stringify(state))
  return {
    directMess : state.userDirectMess,
    user : state.userData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData : (url, config) => dispatch(messagesFetch(url, config))
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