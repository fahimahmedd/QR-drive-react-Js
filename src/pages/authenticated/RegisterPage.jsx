import React from 'react'
import RegisterBody from '../../components/authenticationBody/RegisterBody'
import {ReactSession} from 'react-client-session'
const RegisterPage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <RegisterBody/>
      </> 
    )
  }

  
}
export default RegisterPage