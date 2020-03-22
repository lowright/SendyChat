import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class CallScreen extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Text>Call Screen</Text>
            </View>
        )
    }

}

export default CallScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
})