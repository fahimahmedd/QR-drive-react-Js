import React from 'react'
import RegisterBody from '../../components/authenticationBody/RegisterBody'
import {ReactSession} from 'react-client-session'
import NewUserRegisterBody from '../../components/newUserRegistrationBody/NewUserRegisterBody';
import NewUserPurchaseBody from '../../components/newUserRegistrationBody/NewUserPurchaseBody';
const NewUserPurchasePage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <NewUserPurchaseBody/>
      </> 
    )
  }

  
}
export default NewUserPurchasePage