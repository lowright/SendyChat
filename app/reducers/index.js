import { combineReducers } from 'redux'
import { userData } from './userData'
import { userDialog } from './userDialog'
import { userDirectMess } from './userDirectMess'


const rootReducers = combineReducers({
    userData,
    userDialog,
    userDirectMess,
})

export default rootReducers

 