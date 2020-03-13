import React, {Component} from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { View } from 'native-base'

class StartWork extends Component {

    render () {

        return (

            <View style={styles.wrapper}>
                <View style={styles.titleWrapp}>
                <Text style={styles.title}>Добро пожаловать</Text>
                <Text style={styles.title}>Чтобы написать сообщение или позвонить нажмите кнопку “Начать”.</Text>
                </View>
                <TouchableOpacity onPress={() => alert('Modal')} style={styles.startWork}>
                <Text style={styles.btnTitle}>
                        Готово
                    </Text>
                </TouchableOpacity>
            </View>
            
        )

    }

}

export default StartWork

const styles = StyleSheet.create({
    wrapper : {
        alignItems : 'center',
        height : '100%',
        justifyContent : 'space-between',
        marginHorizontal : 20,
        paddingVertical : '15%'
    },
    title:{
        textAlign : 'center',
        alignItems : 'center',
        fontSize : 22
    },
    titleWrapp:{
        marginTop : 80,
    },
    startWork : {
        alignItems: 'center',
        backgroundColor: '#00AEEF',
        padding: 14,
        width : '75%',
        marginBottom: 10,
        borderRadius: 32,
        marginHorizontal: 20,
        marginTop: 10, 
        justifyContent : 'flex-end',
    },
    btnTitle : {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    }
})