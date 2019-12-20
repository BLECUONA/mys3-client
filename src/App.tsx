import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Redirect
} from "react-router-dom";
import { Routes } from "./utils/Routes";
import * as Screens from "./screens";
import { AppBar, Toolbar, Typography, Button, Tab, IconButton, ButtonGroup, createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { Items } from "./utils/localStorageItems";
const LinkComponent = (props: any) => <RouterLink {...props} />;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const updateIsConnectedFromChild = (value: boolean) => {
    setIsConnected(value);
  }

  useEffect(() => {
    setIsConnected(localStorage.getItem(Items.token) != null);
  })

  const _logOut = () => {
    localStorage.clear();
    setIsConnected(false)
  }

  // RENDERS
  const _renderAppBar = () => {
    return (
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
          {!isConnected &&
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
          }
          {isConnected &&
            <Button component={LinkComponent}
              to={Routes.Home}
              onClick={_logOut}
            >
              Log out
            </Button>

          }
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>

        {/* RENDERS */}
        {_renderAppBar()}

        {/* ROUTES */}
        <Route exact path={Routes.Home}>
          {isConnected ? <Redirect to={Routes.Dashboard} /> : <Screens.Home />}
        </Route>
        <Route exact path={Routes.SignIn}>
          <Screens.SignIn setIsConnectedInParent={updateIsConnectedFromChild} />
        </Route>
        <Route exact path={Routes.SignUp}>
          <Screens.SignUp setIsConnectedInParent={updateIsConnectedFromChild} />
        </Route>
        <Route exact path={Routes.Dashboard}>
          {isConnected ? <Screens.Dashboard /> : <Redirect to={Routes.Home} />}
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