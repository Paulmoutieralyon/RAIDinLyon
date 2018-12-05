const addPoint = (points) => ({
    type: 'ADD_POINTS',
    points
});

const removePoint = (points) => ({
    type: 'REMOVE_POINTS',
    points
});

export { addPoint, removePoint };
