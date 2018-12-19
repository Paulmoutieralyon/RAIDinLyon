const initialState = {
    position: null,
    zoom: null
}

export function reducerMongoMap(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SET_MAP":
        return {
            ...state,
            currentPosition:action.payload
        }
        default:
            return state
    }
}

export default reducerMongoMap