import { createStore, applyMiddleware } from 'redux'
import allReducers from '../Reducers/allReducers'
import thunk from 'redux-thunk'

const store = createStore(allReducers,applyMiddleware(thunk))

export default store
