import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Redirect
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, ButtonGroup, CssBaseline } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import MenuAccount from "./components/MenuAccount";
import { Routes } from "./utils/Routes";
import * as Screens from "./screens";

const LinkComponent = (props: any) => <RouterLink {...props} />;

interface Props {
  isConnected: boolean;
  logOut: Function;
  deleteAccount: Function;
  updateIsConnectedFromChild: Function;
}

const MainView: React.FC<Props> = (props) => {
  const classes = useStyles();

  // RENDERS
  const _renderAppBar = () => {
    return (
      <AppBar position="static" elevation={0} >
        <Toolbar >
          <IconButton color="inherit" noWrap className={classes.leftToolbar} component={LinkComponent} to={Routes.Home}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.centerTitleToolbar}>
            My S3
      </Typography>
          {!props.isConnected &&
            <ButtonGroup color="inherit">
              <Button component={LinkComponent} to={Routes.SignIn}>
                Sing in
              </Button>
              <Button component={LinkComponent} to={Routes.SignUp}>
                Sign up
              </Button>
            </ButtonGroup>
          }
          {props.isConnected &&
            <MenuAccount logOut={props.logOut} deleteAccount={props.deleteAccount} />
          }
        </Toolbar>
      </AppBar>
    )
  }

  const _renderRoutes = () => {
    return (
      <>
        <Route exact path={Routes.Home}>
          {props.isConnected ? <Redirect to={Routes.Dashboard} /> : <Screens.Home />}
        </Route>
        <Route exact path={Routes.SignIn}>
          <Screens.SignIn setIsConnectedInParent={props.updateIsConnectedFromChild} />
        </Route>
        <Route exact path={Routes.SignUp}>
          <Screens.SignUp setIsConnectedInParent={props.updateIsConnectedFromChild} />
        </Route>
        <Route exact path={Routes.Dashboard}>
          {props.isConnected ? <Screens.Dashboard /> : <Redirect to={Routes.Home} />}
        </Route>
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      <Router>
        {_renderAppBar()}
        {_renderRoutes()}
      </Router>
    </>
  )
}

export default MainView;

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