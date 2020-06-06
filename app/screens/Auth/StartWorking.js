import React, {Component} from 'react'
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import dataUserFetch from '../../actions/userDataAction'
class StartWorkingScreen extends Component {
    static navigationOptions = {
        title: 'Start Working'
    };

    constructor(props) {
        super(props)
    
        this.state = {
          token : '',
        }
    }

    setToken = async () => {
        const res = await AsyncStorage.getItem('userToken');
        const token = res.slice(1,-1)
        this.setState({token})
      }
    
    async componentDidMount (){ 
        try {
            console.log('componentDidMount () >>>>' )
            console.log('setToken() >>>>' )
            await this.setToken()
            console.log('fetchData() >>>>' )
            await this.props.fetchData("https://intense-plateau-05807.herokuapp.com/api/v1/user", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
                }, 
            })
            console.log('setState isLoading : true  >>>>' )
        }
        catch (err) {
            console.log(err)
        }
    }

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

const mapStateToProps = state => {
    console.log('Set Props From Store >>>>>>>>')
    console.log(JSON.stringify(state))
    return {
      user : state.userData
    }
}

const mapDispatchToProps = dispatch => {

return {fetchData : (url, config) => dispatch(dataUserFetch(url, config))}
}

export default connect( mapStateToProps, mapDispatchToProps )(StartWorkingScreen)


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