export const enigmesFetch = () => {
    
    return dispatch => {
        return fetch("/api/enigmes")
            .then(laPetiteReponse => {
                return laPetiteReponse.json()
            })
            .then(data => {
                dispatch({
                    type: 'SET_ENIGMES',
                    payload: data,
                })
            })
    }
}