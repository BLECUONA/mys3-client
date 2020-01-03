import React, { useState, useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { Items } from '../utils/localStorageItems';
import DropZoneArea from '../components/DropZoneArea';

const Dashboard: React.FC = () => {
    const classes = useStyles();

    const [nickname, setNickname] = useState<string | null>("");

    useEffect(() => {
        setNickname(localStorage.getItem(Items.nickname));
      })
    
    return (
        <Grid container className={classes.body}>
            <h1>{`Welcome to your dashboard ${nickname?.toUpperCase()}`}</h1>
            <DropZoneArea ButtonTextHover="Add files"/>
        </Grid>
    );
}

export default Dashboard;

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
}));