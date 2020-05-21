import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    isLoading : false,
    data : []
}


export const gotNewMessage = mess => ({ type: 'NEW_MESSAGES', payload : mess });

export const sendNewMessage = (mess, url, token) => {
    console.log('SEND MESSAGES >>>>>>>' + JSON.stringify(mess))
 
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
        },
        body: {
            "text": mess[0]['text'],
            "to_id": mess[0]['user']['_id']
        }
    })
    .then(res => {
        if(res.status !== 200) {
            alert(res.statusText)
        }
        return res
    })
    .then( 
        ({ type: 'NEW_MESSAGES', payload : mess })
    )
    .catch( error => console.log( 'Eroooooooe' + error ) )
}

 
export function userDirectMess(state = initialState, action) {
    switch (action.type) {
        case 'USER_DIRECT_MESSAGES_SUCCESS':
            return { 
                ...state, 
                isLoading : true, 
                data: action.payload
            }

        case 'NEW_MESSAGES':
            return {
                ...state,
                data: state.data.concat(action.payload),
            };

        case 'SEND_NEW_MESSAGES':
            return {
                ...state,
                data: GiftedChat.append(state.data.concat(action.payload)),
            };
  
        default:
            return state;
    }
}