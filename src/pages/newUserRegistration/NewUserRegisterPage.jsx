import React from 'react'
import RegisterBody from '../../components/authenticationBody/RegisterBody'
import {ReactSession} from 'react-client-session'
import NewUserRegisterBody from '../../components/newUserRegistrationBody/NewUserRegisterBody';
const NewUserRegisterPage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <NewUserRegisterBody/>
      </> 
    )
  }

  
}
export default NewUserRegisterPage