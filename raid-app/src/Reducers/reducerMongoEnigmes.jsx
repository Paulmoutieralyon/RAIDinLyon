const initialState = {
    enigme: {}
}

export function reducerMongoEnigmes(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_ENIGMES":
            return {
                ...state,
                enigme: action.payload
            }
        default:
            return state
    }
}

export default reducerMongoEnigmes