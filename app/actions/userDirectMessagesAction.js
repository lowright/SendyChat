import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function userPrivatDirectMessagesSuccess(mess) {
    return {
        type : 'USER_DIRECT_MESSAGES_SUCCESS',
        payload : mess,
    }
}


export function userPrivatDirectMessagesUpdate(mess) {
    return {
        type : 'NEW_MESSAGES',
        payload : mess,
    }
}



export function messagesFetch(url = '', config = {}) {
    return ( dispatch ) => {
        fetch(url, config)
            .then(res => {
                if(res.status !== 200) {
                    alert(res.statusText)
                }
                return res
            })
            .then( res => res.json() )
            .then( mess => dispatch( userPrivatDirectMessagesSuccess(mess) ) )
            .catch( error => console.log( 'Eroooooooe' + error ) )
    }
}


export default async function mewMessages() {

    return async ( dispatch ) => {
        const res = await AsyncStorage.getItem('userToken');
        const token = res.slice(1,-1)
        this.pusher = new Pusher('2dd9afb004598ae19b67', {
        activityTimeout: 60000,
        cluster: 'mt1',
        forceTLS: true,
        authEndpoint: "https://nameless-forest-37690.herokuapp.com/broadcasting/auth",
        auth:{
            headers:{
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            }
        }
        })
        this.messagesChanel = this.pusher.subscribe('private-messages.' + this.props.user.data.id)
        this.messagesChanel.bind("App\\Events\\MessageSent", data => {
            dispatch(userPrivatDirectMessagesUpdate(data))
        })
    }

}