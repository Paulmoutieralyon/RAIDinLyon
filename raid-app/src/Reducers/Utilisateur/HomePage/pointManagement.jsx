const pointManagement = (state = { points: 0, /* title: 'Sur les traces de Nicolas Flamel'  */ }, action) => {
    let pts;
    switch (action.type) {
        case 'ADD_POINTS':
            pts = state.points
            if (pts >= 0) {
                pts = state.points += 5;

                return { ...state, points: pts };
            } else return { ...state, points: pts }

        case 'REMOVE_POINTS':
            pts = state.points
            if (pts > 0) {
                pts = state.points -= 5;
                return { ...state, points: pts };
            } else if (pts === 0) {
                return { ...state };
            }
            else return { ...state, points: pts }

        default:
            return state
    }

}

export default pointManagement;