import * as React from 'react';
import { AppBar, Button } from 'react-admin';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Brightness4 from '@material-ui/icons/Brightness4'

// import Logo from './Logo';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});


const CustomAppBar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    return (
        <AppBar {...props} elevation={1}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
            <Button onClick={() => dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'))}>
                <Brightness4/>
            </Button>
        </AppBar>
    );
};
export const changeTheme = (theme) => ({
    type: 'CHANGE_THEME',
    payload: theme,
});
export default CustomAppBar;