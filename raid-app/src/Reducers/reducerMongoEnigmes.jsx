const initialState = {
    enigme: null,
    display: null
}

export function reducerMongoEnigmes(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_ENIGMES":
            return {
                ...state,
                enigme: action.payload
            }
        case "DISPLAY_ENIGME":
            return {
                ...state,
                display: action.payload
            }
        default:
            return state
    }
}

export default reducerMongoEnigmes