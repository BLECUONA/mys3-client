import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Routes } from '../res/Routes';
import Link from '@material-ui/core/Link';
import { User, Response } from '../res/@types/apiMyS3';
import { Items } from '../res/localStorageItems';
import SignUpView from './SignUpView';
import { SignUp as FetchSignUp } from '../services/apiMys3Services';

const LinkComponent = (props: any) => <RouterLink {...props} />;

interface Props {
  setIsConnectedInParent: ((value: boolean) => void);
}

const SignUp: React.FC<Props> = (props) => {

  // HOOKS FOR INPUTS
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [toDashboard, setToDashboard] = useState<boolean>(false);

  const _handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const _handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const _handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // API CALL
  const _fetchApiS3 = async () => {
    setIsFetching(true);
    const userToRegister: User = { nickname, password, email };
    await FetchSignUp(userToRegister, fetchRes, fetchErr);
    setIsFetching(false);
  };

  const fetchRes = (response: Response) => {
    const { nickname, uuid } = response.data.user;
    localStorage.setItem(Items.token, response.meta.token);
    localStorage.setItem(Items.nickname, nickname);
    localStorage.setItem(Items.uuid, uuid as unknown as string);
    setError(false);
    props.setIsConnectedInParent(true);
    setToDashboard(true);
  };

  const fetchErr = (err: Error) => {
    console.log(`ERR : ${err}`);
    setError(true);
  };

  const RedirectToExistingAccount = () => {
    return (
      <Link variant="body2" component={LinkComponent} to={Routes.SignIn}>
        Already have an account? Sign in
      </Link>
    );
  };

  return (
    <>
      {toDashboard ?
        <Redirect to={Routes.Dashboard} />
        : <SignUpView
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
          RedirectToExistingAccount={RedirectToExistingAccount}
        />}
    </>
  );
};

export default SignUp;