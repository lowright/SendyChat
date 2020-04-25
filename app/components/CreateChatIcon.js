import React, {Component} from 'react'
import {Image, TouchableOpacity} from 'react-native'

export const CreateChatIcon = ({openCreateSettModal}) => {

    return (
        <TouchableOpacity onPress={openCreateSettModal}>
            <Image
                source={require('../assaets/images/createChat.png')}
                style={{width : 18, height : 18}}
            />
        </TouchableOpacity>
    )

}

export default CreateChatIcon