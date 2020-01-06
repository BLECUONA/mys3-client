import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import commonStyles from "../res/CommonStyles";
import Copyright from '../components/CopyRight';
import dictionary from '../res/dictionary.json';

const specificStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1
  },
  container: {
    minHeight: "100vh",
  },
  body: {
    justifyContent: "center",
    verticalAlign: "center"
  },
}));

interface Props {
  setIsConnectedInParent: any;
  nickname: string;
  email: string;
  password: string;
  error: boolean;
  toDashboard: boolean;
  isFetching: boolean;
  _handleNicknameChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _handleEmailChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _handlePasswordChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _fetchApiS3: (() => void);
  RedirectToNewAccount: (() => void);
}

const SignIn: React.FC<Props> = (props) => {
  const commonClasses = commonStyles();
  const classes = specificStyles();

  // RENDERS
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {props.isFetching ?
        <div className={classes.content}>
          <Grid container justify="center" direction="column" alignItems="center" className={classes.container}>
            <CircularProgress className={classes.body} />
          </Grid>
        </div>
        : <>
          <div className={commonClasses.paper}>
            <Avatar className={commonClasses.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {dictionary.signInText}
            </Typography>
            <form className={commonClasses.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="nickName"
                    variant="outlined"
                    required
                    fullWidth
                    id="nickName"
                    label="Nickname"
                    autoFocus
                    value={props.nickname}
                    onChange={props._handleNicknameChange}
                    error={props.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={props.email}
                    onChange={props._handleEmailChange}
                    error={props.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={props.password}
                    onChange={props._handlePasswordChange}
                    error={props.error}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={commonClasses.submit}
                onClick={props._fetchApiS3}
              >
                {dictionary.signInText}
              </Button>
              <Grid container>
                <Grid item>
                  {props.RedirectToNewAccount}
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </>
      }
    </Container>
  )
}

export default SignIn;