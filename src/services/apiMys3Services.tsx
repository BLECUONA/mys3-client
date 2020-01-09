import { User, Response } from '../res/@types/apiMyS3';
import { apiMys3Domain, apiMys3Pages } from '../res/ApiUrls';

export const SignIn = async (userToRegister: User, cbRes: ((res: Response) => void), cbErr: ((err: Error) => void)) => {
  console.log('Fetching API to sign in ...');

  const options: RequestInit = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      nickname: userToRegister.nickname,
      email: userToRegister.email,
      password: userToRegister.password
    })
  };

  await fetch(
    `${apiMys3Domain}${apiMys3Pages.SignIn}`,
    options
  )
    .then(async res => {
      const jsonRes: Response = await res.json();

      if (res.status === 200) {
        cbRes(jsonRes);
      }
      else {
        throw jsonRes.error;
      }
    })
    .catch(err => {
      cbErr(err);
    });
};

export const SignUp = async (userToRegister: User, cbRes: ((response: Response) => void), cbErr: (err: Error) => void) => {
  console.log('Fetchin API to sign up...');
  const options: RequestInit = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      nickname: userToRegister.nickname,
      email: userToRegister.email,
      password: userToRegister.password
    })
  };

  await fetch(
    `${apiMys3Domain}${apiMys3Pages.SignUp}`,
    options
  )
    .then(async res => {
      const jsonRes: Response = await res.json();

      if (res.status === 201) {
        cbRes(jsonRes);
      }
      else {
        throw jsonRes.error;
      }
    })
    .catch(err => {
      cbErr(err);
    });
};

export const DeleteAccount = async (userUuid: string, token: string, cbRes: ((response: Response) => void), cbErr: (err: Error) => void) => {
  console.log('Fetchin API to delete account...');
  const options: RequestInit = {
    method: 'DELETE',
    headers: { 
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };

  await fetch(
    `${apiMys3Domain}${apiMys3Pages.Delete}${userUuid}`,
    options
  )
    .then(async res => {
      const jsonRes: Response = await res.json();

      if (res.status === 200) {
        cbRes(jsonRes);
      }
      else {
        throw jsonRes.error;
      }
    })
    .catch(err => {
      cbErr(err);
    });
};
