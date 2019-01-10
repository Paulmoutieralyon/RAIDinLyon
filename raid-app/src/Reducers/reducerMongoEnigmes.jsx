const initialState = {
    enigme: [],
    display: null,
/*     check: 0, */
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
/*         case "ENIGME_VALIDATION":
            return {
                ...state,
                check: state.check + 1
            }, */
        case "ENIGME_VALIDATION":
        let obj = [...state.enigme]
        //obj[action.payload] = {...obj[action.payload]}
        obj[action.payload].check = true
            return {
                ...state,
                enigme: obj
            }
        default:
            return state
    }
}

export default reducerMongoEnigmes