import { combineReducers } from 'redux'
import contactsNumber from './contactsNumber'

const rootReducers = combineReducers(
    {
        contactsNumber,
    }
)

export default rootReducers