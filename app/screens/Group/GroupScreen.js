import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class GroupScreen extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Text>Group Screen</Text>
            </View>
        )
    }

}

export default GroupScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
})