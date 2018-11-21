const initialState = {
    zoom: 13,

    lat1: 45.736903,
    lng1: 4.815057,
    lat2: 45.746606,
    lng2: 4.826917,
    lat3: 45.769736,
    lng3: 4.831356,
    lat4: 45.728340,
    lng4: 4.830661,
    lat5: 45.761911,
    lng5: 4.840434,
    lat6: 45.784142,
    lng6: 4.860323,

    eg1: '"Le survivant"',
    eg2: '"Une vitre disparait"',
    eg3: '"Les lettres de nulle part"',
    eg4: '"Le gardien des clés"',
    eg5: '"Le chemin de traverse"',
    eg6: '"Rendez vous sur la voie 9 3/4"'
}

export function reducerMapPage(state = initialState, action) {
    /* console.log(action) */
    switch (action.type) {
        default:
            return state
    }
}

export default reducerMapPage