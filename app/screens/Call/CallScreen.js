import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

class CallScreen extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Text>{this.props.user.data.nickname}</Text>
            </View>
        )
    }

}


const mapStateToProps = state => {
    return {
      user : state.userData
    }
}
  
export default connect( mapStateToProps,  )(CallScreen)
  
  

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
})