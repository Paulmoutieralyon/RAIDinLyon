export const displayEnigmeAction = (index) => {
    return dispatch => {
        dispatch({
            type: 'DISPLAY_ENIGME',
            payload: index,
        })
    }
}