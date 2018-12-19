const initialState = {
    email: null,
    mdp: null,
    nom: null,
    prenom: null
}

export function reducerMongoAdministrateur(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_ADMINISTRATEUR":
            return {
                ...state,
                currentPosition: action.payload
            }
        default:
            return state
    }
}

export default reducerMongoAdministrateur