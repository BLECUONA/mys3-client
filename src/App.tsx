import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink
} from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";
import { AppBar, Toolbar, Typography, Button, Tab, IconButton, ButtonGroup } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const LinkComponent = (props: any) => <RouterLink {...props} />;

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>

      {/* <AppBar position="static" color="default" elevation={0} className={classes.appBar}> */}
      <AppBar position="static" elevation={0} >
        {/* <Toolbar className={classes.toolbar}> */}
        <Toolbar >
          <IconButton color="inherit" noWrap className={classes.leftToolbar} component={LinkComponent} to={"/"}>
            {/* <Button color="inherit" noWrap component={LinkComponent} to={"/"}> */}
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.centerTitleToolbar}>
            My S3
          </Typography>
          <ButtonGroup color="inherit">
            <Button component={LinkComponent} to={"/sign-in"}>
            {/* <Button color="inherit" variant="outlined" className={classes.rightToolbar} component={LinkComponent} to={"/sign-in"}> */}
              Sign in
            </Button>
            <Button component={LinkComponent} to={"/sign-up"}>
            {/* <Button color="inherit" variant="outlined" className={classes.rightToolbar} component={LinkComponent} to={"/sign-up"}> */}
              Sign up
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/sign-in">
        <SignIn />
      </Route>

    </Router>
  )
}

export default App;

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'nowrap',
  },
  leftToolbar: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
  centerTitleToolbar: {
    flex: 1,
  },
  rightToolbar: {
    margin: theme.spacing(1, 1.5),
  },
}));