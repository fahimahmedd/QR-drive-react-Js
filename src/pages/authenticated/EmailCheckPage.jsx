import React from 'react'
import EmailCheckBody from '../../components/authenticationBody/EmailCheckBody'
import {ReactSession} from 'react-client-session'
const EmailCheckPage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <EmailCheckBody/>
      </> 
    )
  }

}
export default EmailCheckPage