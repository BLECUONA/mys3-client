import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import dictionary from '../res/dictionary.json';

interface Props {
    nickname: string | null;
}
const Dashboard: React.FC<Props> = (props) => {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.body}>
            <h1>{`${dictionary.dashboardPageTitle} ${props.nickname?.toUpperCase()}`}</h1>
        </Grid>
    );
}

export default Dashboard;

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
}));