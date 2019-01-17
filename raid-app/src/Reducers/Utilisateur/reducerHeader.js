const initialState = {
    isSliderOpen: false
}

export function reducerHeader(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        case "SLIDE_HEADER":
            return {
                ...state,
                isSliderOpen: !state.isSliderOpen
            }
        default:
            return state
    }
}

export default reducerHeader