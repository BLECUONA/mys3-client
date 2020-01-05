import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import commonStyles from "../utils/CommonStyles";
import Copyright from '../components/CopyRight';

interface Props {
  setIsConnectedInParent: any;
  nickname: string;
  email: string;
  password: string;
  error: boolean;
  toDashboard: boolean;
  _handleNicknameChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _handleEmailChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _handlePasswordChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  _fetchApiS3: (() => void);
  RedirectToExistingAccount: (() => void);
}

const SignUpView: React.FC<Props> = (props) => {
  const classes = commonStyles();
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
            className={classes.submit}
            onClick={props._fetchApiS3}
          >
            Sign up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {props.RedirectToExistingAccount}
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

export default SignUpView;