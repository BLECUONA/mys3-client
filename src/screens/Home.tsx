import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.body}>
            <h1>HOME</h1>
        </Grid>
    );
}

export default Home;

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
}));