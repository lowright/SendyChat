import { GiftedChat } from 'react-native-gifted-chat'

const initialState = {
    isLoading : false,
    data : [
        {
            _id: 2,
            text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
            createdAt: new Date(),
            quickReplies: {
              type: 'checkbox', // or 'radio',
              values: [
                {
                  title: 'Yes',
                  value: 'yes',
                },
                {
                  title: 'Yes, let me show you with a picture!',
                  value: 'yes_picture',
                },
                {
                  title: 'Nope. What?',
                  value: 'no',
                },
              ],
            },
            user: {
              _id: 2,
              name: 'React Native',
            },
        },
        {
            _id: 11,
            text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
            createdAt: new Date(),
            quickReplies: {
              type: 'radio', // or 'checkbox',
              keepIt: true,
              values: [
                {
                  title: '😋 Yes',
                  value: 'yes',
                },
                {
                  title: '📷 Yes, let me show you with a picture!',
                  value: 'yes_picture',
                },
                {
                  title: '😞 Nope. What?',
                  value: 'no',
                },
              ],
            },
            user: {
              _id: 2,
              name: 'React Native',
            },
        },
        {
            _id: 21,
            text: 'My message',
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: 'https://facebook.github.io/react/img/logo_og.png',
            // You can also add a video prop:
            video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            // Any additional custom parameters are passed through
          }
    ]
}


export const gotNewMessage = mess => ({ type: 'NEW_MESSAGES', payload : mess });
export const sendNewMessage = mess => ({ type: 'SEND_NEW_MESSAGES', payload : mess })

 
export function userDirectMess(state = initialState, action) {
    switch (action.type) {
        case 'USER_DIRECT_MESSAGES_SUCCESS':
            return { 
                ...state, 
                isLoading : true, 
                data: state.data.concat(action.payload)
            }

        case 'NEW_MESSAGES':
            return {
                ...state,
                data: state.data.concat(action.payload),
            };

        case 'SEND_NEW_MESSAGES':
            return {
                ...state,
                data: state.data.concat(action.payload),
            };
  
        default:
            return state;
    }
}