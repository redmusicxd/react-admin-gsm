const themeReducer = (
    previousState = 'light',
    {type, payload}
) => {
    if (type === "CHANGE_THEME") {
        localStorage.setItem('currentTheme',payload);
        return payload;
    }
    return previousState;
};

export default themeReducer;