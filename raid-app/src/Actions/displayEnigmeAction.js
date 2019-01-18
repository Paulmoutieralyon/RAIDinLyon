const displayEnigmeAction = (index) => {
    return dispatch => {
        dispatch({
            type: 'DISPLAY_ENIGME',
            payload: index,
        })
    }
}

const enigmeValidation = (index) => {
    return dispatch => {
        dispatch({
            type: 'ENIGME_VALIDATION',
            payload: index,
        })
    }
}

export { displayEnigmeAction, enigmeValidation }