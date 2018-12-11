import { combineReducers } from 'redux'
import reducerEnigmePage from './Utilisateur/EnigmePage/reducerEnigmePage'
import reducerHomePage from './Utilisateur/HomePage/reducerHomePage'
import pointManagement from './Utilisateur/HomePage/pointManagement'
import reducerMapPage from './Utilisateur/MapPage/reducerMapPage'
import titleManagement from './Utilisateur/MapPage/titleManagement'



const allReducers = combineReducers({
    reducerEnigmePage: reducerEnigmePage,
    reducerHomePage: reducerHomePage,
    pointManagement: pointManagement,
    reducerMapPage: reducerMapPage,
    titleManagement: titleManagement,
})

export default allReducers