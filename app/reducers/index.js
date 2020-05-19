import { combineReducers } from 'redux'
import { userData } from './userData'
import { userDialog } from './userDialog'
import { userDirectMess } from './userDirectMess'
import { messages } from './messages'

const rootReducers = combineReducers({
    userData,
    userDialog,
    userDirectMess,
    messages
})

export default rootReducers

 