import { createStore} from 'redux'
import allReducers from '../Reducers/allReducers'

export const store = createStore(allReducers)

export default store