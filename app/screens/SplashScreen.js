import React, {Component } from 'react'
import {View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends Component  {

    
    state = {
        userName : '',
        date : ''
    }

    async componentDidMount() {
        const userName = await AsyncStorage.getItem('name')
        this.setState({userName})
    }
    
    getDate = () => {
        const h = new Date().getHours();
        if (h > 3 && h < 7) return("доброй ночи");
        if (h > 6 && h < 12) return("доброе утро");
        if (h > 11 && h < 17) return("Ддбрый день");
        if (h > 16 && h < 24) return("добрый вечер");
        if (h > 23 || h < 4 ) return("доброй ночи");
    }

    render () {

        return (
            <View style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require('../assaets/images/logo.png')}
                />
                <Text>{this.state.userName} {this.getDate()}!</Text>

            </View>
        )

    }

}

export default SplashScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    logo : {
        width : 200,
        height : 200
    }
})