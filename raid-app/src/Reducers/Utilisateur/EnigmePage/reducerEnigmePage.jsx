
const reducerEnigmePage = (state = { count: 0}, action) => {
    let countGoodResp
    switch (action.type) {
        case 'ADD':
        countGoodResp = state.count
        countGoodResp = state.count += 1
            return { ...state, count: countGoodResp }
        default:
            return state;
    }
};

export default reducerEnigmePage;
