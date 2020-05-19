

const initialState = {
    isLoading : false,
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
                data: [action.payload, ...state.data],
            };
        
        default:
            return state;
    }
}