const pointManagement = (state = { points: 0, title: 'Sur les traces de Nicolas Flamel', mainTitle:'Sur les traces de Nicoals Flamel' }, action) => {
    let pts;
    let ttl;
    let mttl
    switch (action.type) {
        case 'ADD_POINTS':
            pts = state.points
            ttl = state.title
            mttl = state.mainTitle
            if (pts >= 0) {
                pts = state.points += 5;
                ttl = 'Bravo rendez vous à la prochaine énigme';
               /*  setTimeout((function () {
                    return { ...state, title: ttl };
                })(), 1000); */
                return { ...state, points: pts, mainTitle: mttl };
            } else return { ...state, points: pts, title: ttl }

        case 'REMOVE_POINTS':
            pts = state.points
            ttl = state.title
            if (pts > 0) {
                pts = state.points -= 5;
                ttl = 'Retentez votre chance à la prochaine énigme';
                return { ...state, points: pts };
            } else if (pts === 0) {
                ttl = 'Retentez votre chance à la prochaine énigme';
                return { ...state, title: ttl };
            }
            else return { ...state, points: pts, title: ttl }

        default:
            return state
    };

}

export default pointManagement;