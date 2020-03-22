import React, {Component} from 'react'
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class StartWorkingScreen extends Component {
    static navigationOptions = {
        title: 'Start Working'
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Добро пожаловать</Text>
                <Text style={styles.subTitle}>`Чтобы написать сообщение или позвонить нажмите кнопку “Начать”`</Text>
                <TouchableOpacity
                    onPress={() => this._registrAsync()}
                    style={styles.startWorking}>
                    <Text style={styles.text}>
                        Начать
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    _registrAsync = async() => {
        this
          .props
          .navigation
          .navigate('User');
    };

}

export default StartWorkingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingHorizontal: 15
    },
    startWorking: {
        alignItems: 'center',
        backgroundColor: '#00AEEF',
        padding: 14,
        borderRadius: 32,
        marginHorizontal: 20,
        marginTop: 40,
        width : '70%'
    },
    title: {
        textAlign: 'center',
        fontSize: 22
    },
    subTitle: {
        textAlign: 'center',
        marginBottom: 30
    }, 
    text : {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff"
    }
})