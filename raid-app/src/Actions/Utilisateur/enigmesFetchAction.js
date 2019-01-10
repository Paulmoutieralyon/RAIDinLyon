export const enigmesFetch = () => {
    
    return dispatch => {
        return fetch("http://localhost:5000/api/enigmes")
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