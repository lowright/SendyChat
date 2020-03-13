import React, {Component} from 'react'
import {Image, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {View} from 'native-base'

class Registration extends Component {
    state = {
        nickname: '',
        name: '',
        lastname: ''
    }
    render() {

        return (

            <View style={styles.wrapper}>
                <Image
                    style={{
                    paddingVertical: 30,
                    width: 150,
                    height: 150,
                    borderRadius: 75
                }}
                    resizeMode='cover'
                    source={{
                    uri: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png'
                }}/>

                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={this.state.name}
                    placeholder={'Имя (обязательно)'}/>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={this.state.name}
                    placeholder={'Фамилия (необязательно)'}/>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeText(text)}
                    value={this.state.name}
                    placeholder={'Никнейм (обязательно)'}/>
                <TouchableOpacity onPress={() => alert('Modal')} style={styles.welcome}>
                    <Text style={styles.welcomeTitle}>
                        Готово
                    </Text>
                </TouchableOpacity>
            </View>
        )

    }

}

export default Registration

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        paddingVertical : '10%'
    },
    input: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 15
    },
    welcome: {
        alignItems: 'center',
        backgroundColor: '#00AEEF',
        padding: 14,
        width : '75%',
        marginBottom: 10,
        borderRadius: 32,
        marginHorizontal: 20,
        marginTop: 10
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    }
})