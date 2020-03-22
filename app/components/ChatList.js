import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

class ChatList extends Component {

    constructor(props){
        super(props)

        this.state = {
            chatUserName : '',
            recentlyMessage : '',
            image : '',
            date : ''
        }
    }

    
    render () {
        const {userName, resentleMessage, date, userAvatar, logInChat, id} = this.props

        return (

            <TouchableOpacity 
                onPress={() => logInChat()}
                style={styles.chatListWrapper}
            >

                <View style={styles.leftChatImageUser}>
                    <Image
                        source={{uri : 'https://gate.undelete.news/uploads/top_blogers_ua/62150296_437530950381984_3128830710517544657_n.jpg'}}
                        style={{width : 60, height : 60, borderRadius : 50, }}
                    />
                </View>

                <View style={styles.rightChatInfo}>
                    <View style={styles.messInfo}>
                        <Text style={styles.chatUserName}>{userName}</Text>
                        <Text style={styles.chatResentlyMess}>{resentleMessage}</Text>
                    </View>
                    <View style={styles.dateMess}>
                        <Text style={styles.chatDate}>{date}</Text>
                    </View>
                </View>

            </TouchableOpacity>

            

        )

    }

}

export default ChatList

const styles = StyleSheet.create({
    chatListWrapper : {
        width : '100%',
        flexDirection : 'row',
        paddingHorizontal : 10,
        marginBottom : 14
    },
    rightChatInfo : {
        width : '75%',
        flexDirection : 'row',
        borderBottomColor : '#000',
        borderBottomWidth : 0.3
    },
    leftChatImageUser : {
        width : '25%'
    }, 
    messInfo : {
        width : '80%',
        justifyContent : 'space-between',
        paddingBottom : 10,
    },
    dateMess : {
        width : '20%',
        alignItems : 'flex-end'
    },
    chatUserName : {
        fontSize : 17,
        fontWeight : 'bold'
    },
    chatResentlyMess : {
        fontSize : 14
    }
})