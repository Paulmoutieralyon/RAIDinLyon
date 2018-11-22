import { combineReducers } from 'redux'
import reducerEnigmePage from './Utilisateur/EnigmePage/reducerEnigmePage'
import reducerHomePage from './Utilisateur/HomePage/reducerHomePage'
import reducerMapPage from './Utilisateur/MapPage/reducerMapPage'


const allReducers = combineReducers({
    reducerEnigmePage: reducerEnigmePage,
    reducerHomePage: reducerHomePage,
    reducerMapPage: reducerMapPage,
})

export default allReducers