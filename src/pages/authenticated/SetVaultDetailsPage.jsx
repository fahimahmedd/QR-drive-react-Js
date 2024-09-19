import React from 'react'
import { useLocation } from 'react-router-dom';
import SetVaultDetails from '../../components/authenticationBody/SetVaultDetails'
import {ReactSession} from 'react-client-session';
const SetVaultDetailsPage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <SetVaultDetails/>
      </> 
    )
  }
 
}
export default SetVaultDetailsPage