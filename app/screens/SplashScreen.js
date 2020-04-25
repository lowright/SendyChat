import React, {Component } from 'react'
import {View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
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
        if (h > 3 && h < 7) return("Доброй ночи");
        if (h > 6 && h < 12) return("Доброе утро");
        if (h > 11 && h < 17) return("Добрый день");
        if (h > 16 && h < 24) return("Добрый вечер");
        if (h > 23 || h < 4 ) return("Доброй ночи");
    }

    render () {

        return (
            <View style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require('../assaets/images/logo.png')}
                />
                <ActivityIndicator
                    size="large" 
                    color="#00AEEF"
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