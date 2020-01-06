import React, { useState, useEffect, useContext } from "react";
import { Items } from "../res/localStorageItems";
import MainView from './MainView';
import { DeleteAccount } from '../services/apiMys3Services';
import { Response } from "../res/@types/apiMyS3";
import SimpleDialog from "../components/SimpleDialog";
import dictionary from '../res/dictionary.json';

const MainViewController: React.FC = () => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const updateIsConnectedFromChild = (value: boolean) => {
    setIsConnected(value);
  }

  useEffect(() => {
    setIsConnected(localStorage.getItem(Items.token) != null);
  })

  const logOut = () => {
    localStorage.clear();
    setIsConnected(false)
  }

  const deleteAccount = () => {
    DeleteAccount(
      localStorage.getItem(Items.uuid) as string,
      localStorage.getItem(Items.token) as string,
      fetchRes,
      fetchErr);
  }

  const fetchRes = (response: Response) => {
    console.log(`User with uuid ${localStorage.getItem(Items.uuid)} successfully deleted`)
    logOut();
  }

  const fetchErr = (err: Error) => {
    setIsError(true);
    console.log(`ERR : ${err}`);
  }

  return (
    <>
      {isError &&
        <SimpleDialog
          textTitle={dictionary.deleteAccountPopUpErrorTitle}
          textMessage={dictionary.deleteAccountPopUpErrorMessage}
          actionClose={() => setIsError(false)}
        />
      }
      <MainView
        isConnected={isConnected}
        logOut={logOut}
        deleteAccount={deleteAccount}
        updateIsConnectedFromChild={updateIsConnectedFromChild}
      />
    </>
  )
}

export default MainViewController;