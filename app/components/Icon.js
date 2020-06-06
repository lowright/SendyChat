import React, {Component} from 'react'
import {Image, TouchableOpacity} from 'react-native'

export const CreateChatIcon = ({src}) => {
    return (
        <Image
            source={`${src}`}
            style={{width : 22, height : 22}}
        />
    )

}

export default CreateChatIcon