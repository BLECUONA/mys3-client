import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Routes } from "../utils/Routes"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import commonStyles from "../utils/CommonStyles";
import { apiMys3Domain, apiMys3Pages } from "../utils/ApiUrls";
import { User, Response } from "../utils/@types/apiMyS3";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LinkComponent = (props: any) => <RouterLink {...props} />;

const SignUp: React.FC = () => {
  const classes = commonStyles();

  // HOOKS FOR INPUTS
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [toDashboard, setToDashboard] = useState<boolean>(false);

  const _handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }

  const _handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const _handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  // API CALL
  const _fetchApiS3 = () => {
    console.log("Fetchin API ...");
    let userToRegister: User = { nickname, password, email };

    const options: RequestInit = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        nickname: userToRegister.nickname,
        email: userToRegister.email,
        password: userToRegister.password
      })
    };

    fetch(
      `${apiMys3Domain}${apiMys3Pages.SignUp}`,
      options
    )
      .then(async res => {
        const jsonRes: Response = await res.json();

        if (res.status == 201) {
          const { nickname, password, uuid } = jsonRes.data.user;
          localStorage.setItem("token", jsonRes.meta.token);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("password", password);
          localStorage.setItem("uuid", uuid as unknown as string);
          setError(false);
          setToDashboard(true);
      }
        else {
          console.log(`ERR : ${jsonRes.error}`);
          setError(true);
        }
      })
      .catch(err => {
        console.log(`ERR : ${err}`);
        setError(true);
      })
  }

  const _renderFormSignUp = () => {
    console.log("ENV: ", process.env.ENV)
    console.log("ENV2: ", process.env.NODE_ENV)
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
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
                  value={nickname}
                  onChange={_handleNicknameChange}
                  error={error}
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
                  value={email}
                  onChange={_handleEmailChange}
                  error={error}
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
                  value={password}
                  onChange={_handlePasswordChange}
                  error={error}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={_fetchApiS3}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" component={LinkComponent} to={Routes.SignIn}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
  }

  return (
    <>
      {toDashboard ? <Redirect to={Routes.Dashboard} /> : _renderFormSignUp()}
    </>
  );
}

export default SignUp;