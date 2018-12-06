const goodTitle = (title) => ({
    type: 'GOOD_TITLE',
    title
    
});

const badTitle = (title) => ({
    type: 'BAD_TITLE',
    title
});

const actualTitle = (title) => ({
    type: 'ACTUAL_TITLE',
    title
});

export {goodTitle, badTitle, actualTitle};