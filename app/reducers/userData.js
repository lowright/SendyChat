const initialState = {
  isLoading : false,
}
export function userData(state = initialState, action) {
  switch (action.type) {
    case 'USER_DATA_SUCCESS':
      return { ...state, isLoading : true, data: action.payload }
   
    default:
      return state;
  }
}