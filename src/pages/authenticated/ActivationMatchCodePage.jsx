import React from 'react'
import { useLocation } from 'react-router-dom';
import MatchActivationCode from '../../components/authenticationBody/MatchActivationCode';
import {ReactSession} from 'react-client-session'

const ActivationMatchCodePage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <MatchActivationCode/>
      </> 
    )
  }
 
}
export default ActivationMatchCodePage