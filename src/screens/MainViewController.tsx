import React, { useState, useEffect, useContext } from "react";
import { Items } from "../res/localStorageItems";
import MainView from './MainView';

const MainViewController: React.FC = () => {

  const [isConnected, setIsConnected] = useState<boolean>(false);

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
    // TODO call api
    logOut();
  }

  return (
    <MainView
      isConnected={isConnected}
      logOut={logOut}
      deleteAccount={deleteAccount}
      updateIsConnectedFromChild={updateIsConnectedFromChild}
    />
  )
}

export default MainViewController;