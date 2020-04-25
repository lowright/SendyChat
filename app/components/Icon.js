import React, {Component} from 'react'
import {Image, TouchableOpacity} from 'react-native'

export const CreateChatIcon = ({src, press}) => {

    return (
        <TouchableOpacity onPress={press} >
            <Image
                source={src}
                style={{width : 18, height : 18}}
            />
        </TouchableOpacity>
    )

}

export default CreateChatIcon