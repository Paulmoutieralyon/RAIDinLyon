const initialState = {
    score: null,
    nom: null,
    email: null,
    token: null,
    participants: null,
    telephone: null,
    h_fin: null
}

export function reducerMongoEquipe(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_EQUIPE":
        return {
            ...state,
            currentPosition:action.payload
        }
        default:
            return state
    }
}

export default reducerMongoEquipe