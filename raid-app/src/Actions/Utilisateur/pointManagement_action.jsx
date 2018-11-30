const addPoint = (points, title) => ({
    type: 'ADD_POINTS',
    points, title
    
});

const removePoint = (points, title) => ({
    type: 'REMOVE_POINTS',
    points, title
});

export {addPoint, removePoint};