const initialState = {
    isLoading : false,
    _id : null,
    text : '',
    createdAt : null,
        user : {
            _id : null,
            name : null,
        }
}
 

export function userDirectMess(state = initialState, action) {
    switch (action.type) {
        case 'USER_DIRECT_MESSAGES_SUCCESS':
            return { ...state, isLoading : true, data: action.payload }

        case 'INCOMING_MESSAGE':
            return {
                ...state,
                data: [action.payload, ...state.data],
            };
        
        default:
            return state;
    }
}