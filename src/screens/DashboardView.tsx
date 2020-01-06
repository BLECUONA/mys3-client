import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import dictionary from '../res/dictionary.json';
import Table from '../components/EnhancedTable';

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: "center"
    },
    table: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    }
}));

interface Props {
    nickname: string | null;
}

const Dashboard: React.FC<Props> = (props) => {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.body}>
            <h1>{`${dictionary.dashboardPageTitle} ${props.nickname?.toUpperCase()}`}</h1>
            <Grid container className={classes.table}>
                <Table />
            </Grid>
        </Grid>
    );
}

export default Dashboard;
