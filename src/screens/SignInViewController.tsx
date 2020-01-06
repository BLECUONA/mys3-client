import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Routes } from "../res/Routes"
import { User, Response } from "../res/@types/apiMyS3";
import { Items } from '../res/localStorageItems';
import SignInView from './SignInView';
import { Link } from '@material-ui/core';
import {SignIn as FetchSignIn} from '../services/apiMys3Services';

interface Props {
  setIsConnectedInParent: any,
}

const LinkComponent = (props: any) => <RouterLink {...props} />;

const SignIn: React.FC<Props> = (props) => {

  // HOOKS FOR INPUTS
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
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
  const _fetchApiS3 = async () => {
    setIsFetching(true);
    let userToRegister: User = { nickname, password, email };
    await FetchSignIn(userToRegister, fetchRes, fetchErr);
    setIsFetching(false)
  } 

  const fetchRes = (response: Response) => {
    const { nickname, uuid } = response.data.user;
    localStorage.setItem(Items.token, response.meta.token);
    localStorage.setItem(Items.nickname, nickname);
    localStorage.setItem(Items.uuid, uuid as unknown as string);
    props.setIsConnectedInParent(true);
    setError(false);
    setToDashboard(true);
  }

  const fetchErr = (err: Error) => {
    console.log(`ERR : ${err}`);
    setError(true);
  }

  const RedirectToNewAccount = () => {
    return (
      <Link variant="body2" component={LinkComponent} to={Routes.SignUp}>
        {"Don't have an account? Sign Up"}
      </Link>
    )
  }

  return (
    <>
      {toDashboard ?
        <Redirect to={Routes.Dashboard} />
        : <SignInView
          nickname={nickname}
          email={email}
          password={password}
          isFetching={isFetching}
          error={error}
          toDashboard={toDashboard}
          _handleNicknameChange={_handleNicknameChange}
          _handleEmailChange={_handleEmailChange}
          _handlePasswordChange={_handlePasswordChange}
          _fetchApiS3={_fetchApiS3}
          setIsConnectedInParent={props.setIsConnectedInParent}
          RedirectToNewAccount={RedirectToNewAccount}
        />
      }
    </>
  );
}

export default SignIn;