import React, { Component } from "react"
import {Text, Image, View, StyleSheet} from 'react-native'

class Preloader extends Component {

    render () {

        return (

            <View style={styles.wrapper}>
                <Image
                    source={{uri : 'https://img.icons8.com/bubbles/2x/telegram-app.png'}}
                    style={{width : 200, height : 200}}
                />
                <Text style={styles.titleWelcome}>Гость Добрый день</Text>
            </View>

        )

    }

}

export default Preloader

const styles = StyleSheet.create({
    wrapper : {
        alignItems : 'center',
        justifyContent : 'space-between',
        height : '45%',
        marginTop : '30%'
    },
    titleWelcome : {
        fontSize : 30,
        color : '#000',
    }
})