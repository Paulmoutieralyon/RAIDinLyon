import { createStore, applyMiddleware } from 'redux'
import allReducers from '../Reducers/allReducers'
import thunk from 'redux-thunk'

export const store = createStore(allReducers,applyMiddleware(thunk))

export default store
