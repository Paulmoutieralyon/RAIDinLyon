import { combineReducers } from 'redux'
import reducerEnigmePage from './Utilisateur/EnigmePage/reducerEnigmePage'
import reducerHomePage from './Utilisateur/HomePage/reducerHomePage'
import pointManagement from './Utilisateur/HomePage/pointManagement'
import reducerMapPage from './Utilisateur/MapPage/reducerMapPage'
import titleManagement from './Utilisateur/MapPage/titleManagement'

import reducerMongoAdministrateur from './reducerMongoAdministrateur'
import reducerMongoEnigmes from './reducerMongoEnigmes'
import reducerMongoEquipe from './reducerMongoEquipe'
import reducerMongoMap from './reducerMongoMap'
import reducerMongoSession from './reducerMongoSession'



const allReducers = combineReducers({
    reducerEnigmePage: reducerEnigmePage,
    reducerHomePage: reducerHomePage,
    pointManagement: pointManagement,
    reducerMapPage: reducerMapPage,
    titleManagement: titleManagement,

    reducerMongoAdministrateur: reducerMongoAdministrateur,
    reducerMongoEnigmes: reducerMongoEnigmes,
    reducerMongoEquipe: reducerMongoEquipe,
    reducerMongoMap: reducerMongoMap,
    reducerMongoSession: reducerMongoSession
})

export default allReducers