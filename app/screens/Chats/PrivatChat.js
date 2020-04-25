import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {Header, Avatar} from 'react-native-elements'
import Icon from '../../components/Icon'

class PrivatChat extends React.Component {


  state = {
      messages: [],
  }
  
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
  
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  
  render() {
    return (
      <>
        <Header
          leftComponent={<Icon src={require('../../assaets/images/back.png')}  />}
          centerComponent={{ text: 'Privat Chat', style: { color: '#000', fontSize : 18 } }}
          rightComponent={<Avatar rounded title="АН" />}
          containerStyle={styles.header}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{_id: 1}}
        />
      </>
    )
  }

}

export default PrivatChat

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