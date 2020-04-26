import React from 'react';
import MainScreen from './app/MainScreen'
import { Provider } from 'react-redux'
import store from './app/store'

export const App = () => <Provider store={ store }><MainScreen/></Provider>

export default App
