import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

const Dashboard: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.body}>
            <h1>Dashboard</h1>
        </Grid>
    );
}

export default Dashboard;

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
}));