import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

class PrivatChat extends React.Component {


    state = {
        messages: [],
    }
    
      componentDidMount() {
        const navigationProps = this.props.navigation.state.params;
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
        alert(navigationProps.id)
      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
      render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        )
      }

}

export default PrivatChat

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'transparent',
        borderBottomWidth : 0.4,
        paddingBottom : 0,
        borderBottomColor : '#000',
        paddingTop : 0,
    },
})