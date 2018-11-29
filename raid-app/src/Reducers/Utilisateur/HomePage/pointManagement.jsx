
const pointManagement = (state = { points: 0 }, action) => {
    let pts;
    switch (action.type) {
        case 'ADD_POINTS':
            pts = state.points
            pts = state.points += 5;
            return { ...state, points: pts };

        case 'REMOVE_POINTS':
            pts = state.points
            pts = state.points -= 5;
            return { ...state, points: pts };

        default:
            return state
    };

}

export default pointManagement;