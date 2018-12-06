const titleManagement = (state = { title: 'Sur les traces de Nicolas Flamel' }, action) => {
    let ttl;

    switch (action.type) {
        case 'GOOD_TITLE':
            ttl = state.title
            ttl = 'Bravo rendez vous à la prochaine énigme';

            return { title: ttl }

        case 'BAD_TITLE':
            ttl = state.title
            ttl = 'Retentez votre chance à la prochaine énigme';

            return { title: ttl };

        case 'ACTUAL_TITLE':
            ttl = state.title
            ttl = 'Sur les traces de Nicoalas Flamel';

            return { title: ttl };

        default:
            return state
    }


}

export default titleManagement;