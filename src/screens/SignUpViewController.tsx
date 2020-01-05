import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Routes } from "../utils/Routes"
import Link from '@material-ui/core/Link';
import { apiMys3Domain, apiMys3Pages } from "../utils/ApiUrls";
import { User, Response } from "../utils/@types/apiMyS3";
import { Items } from '../utils/localStorageItems';
import SignUpView from './SignUpView'

const LinkComponent = (props: any) => <RouterLink {...props} />;

interface Props {
  setIsConnectedInParent: any,
}

const SignUp: React.FC<Props> = (props) => {

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
          const { nickname, uuid } = jsonRes.data.user;
          localStorage.setItem(Items.token, jsonRes.meta.token);
          localStorage.setItem(Items.nickname, nickname);
          localStorage.setItem(Items.uuid, uuid as unknown as string);
          setError(false);
          props.setIsConnectedInParent(true);
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

  const RedirectToExistingAccount = () => {
    return (
      <Link variant="body2" component={LinkComponent} to={Routes.SignIn}>
        Already have an account? Sign in
      </Link>
    )
  }

  return (
    <>
      {toDashboard ?
        <Redirect to={Routes.Dashboard} />
        : <SignUpView
          nickname={nickname}
          email={email}
          password={password}
          error={error}
          toDashboard={toDashboard}
          _handleNicknameChange={_handleNicknameChange}
          _handleEmailChange={_handleEmailChange}
          _handlePasswordChange={_handlePasswordChange}
          _fetchApiS3={_fetchApiS3}
          setIsConnectedInParent={props.setIsConnectedInParent}
          RedirectToExistingAccount={RedirectToExistingAccount}
        />}
    </>
  );
}

export default SignUp;