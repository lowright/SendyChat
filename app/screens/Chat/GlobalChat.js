import React, {Component} from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { View } from 'native-base'

class GlobalChat extends Component {

    render () {

        return (

            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => alert('Modal')} style={styles.startWork}>
                <Text style={styles.btnTitle}>
                        Вы авторризованы
                    </Text>
                </TouchableOpacity>
            </View>
            
        )

    }

}

export default GlobalChat

const styles = StyleSheet.create({
    wrapper : {
        alignItems : 'center',
        height : '100%',
        justifyContent : 'center',
        marginHorizontal : 20,
        paddingVertical : '15%'
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