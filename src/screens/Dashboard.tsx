import React, { useState, useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { Items } from '../utils/localStorageItems';
import Table from '../components/EnhancedTable';
import CSS from 'csstype';

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
    table: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    }
}));

const Dashboard: React.FC = () => {
    const classes = useStyles();

    const [nickname, setNickname] = useState<string | null>("");

    useEffect(() => {
        setNickname(localStorage.getItem(Items.nickname));
    })

    return (
        <Grid container className={classes.body}>
            <h1>{`Welcome to your dashboard ${nickname ?.toUpperCase()}`}</h1>
            <Grid container className={classes.table}>
                <Table />
            </Grid>
        </Grid>
    );
}

export default Dashboard;