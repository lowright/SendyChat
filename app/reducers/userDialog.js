const initialState = {
    isLoading : false,
}

export function userDialog(state = initialState, action) {
    switch (action.type) {
        case 'USER_DIALOGS_SUCCESS':
            return { ...state, isLoading : true, data: action.payload }
        
        default:
            return state;
    }
}