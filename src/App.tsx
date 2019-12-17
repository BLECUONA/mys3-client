import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink
} from "react-router-dom";
import { Routes } from "./utils/Routes";
import * as Screens from "./screens";
import { AppBar, Toolbar, Typography, Button, Tab, IconButton, ButtonGroup, createMuiTheme, ThemeProvider } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const LinkComponent = (props: any) => <RouterLink {...props} />;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>

        {/* <AppBar position="static" color="default" elevation={0} className={classes.appBar}> */}
        <AppBar position="static" elevation={0} >
          {/* <Toolbar className={classes.toolbar}> */}
          <Toolbar >
            <IconButton color="inherit" noWrap className={classes.leftToolbar} component={LinkComponent} to={Routes.Home}>
              {/* <Button color="inherit" noWrap component={LinkComponent} to={"/"}> */}
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.centerTitleToolbar}>
              My S3
          </Typography>
            <ButtonGroup color="inherit">
              <Button component={LinkComponent} to={Routes.SignIn}>
                {/* <Button color="inherit" variant="outlined" className={classes.rightToolbar} component={LinkComponent} to={"/sign-in"}> */}
                Sign in
            </Button>
              <Button component={LinkComponent} to={Routes.SignUp}>
                {/* <Button color="inherit" variant="outlined" className={classes.rightToolbar} component={LinkComponent} to={"/sign-up"}> */}
                Sign up
            </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>

        {/* Routes */}
        <Route exact path={Routes.Home}>
          <Screens.Home />
        </Route>
        <Route exact path={Routes.SignIn}>
          <Screens.SignIn />
        </Route>
        <Route exact path={Routes.SignUp}>
          <Screens.SignUp />
        </Route>

      </Router>
    </ThemeProvider>
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