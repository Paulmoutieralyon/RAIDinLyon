const initialState = {
    nom: null,
    enonce: null,
    url_image: null,
    couleurs: { couleurs: [null, null] },
    etat: null,
    h_debut: null
}

export function reducerMongoSession(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_SESSION":
        return {
            ...state,
            currentPosition:action.payload
        }
        default:
            return state
    }
}

export default reducerMongoSession