import React from 'react'
import {ReactSession} from 'react-client-session'
import NewUserPurchaseTypeBody from '../../components/newUserRegistrationBody/NewUserPurchaseTypeBody';
const NewUserPurchaseTypePage = () =>{
  ReactSession.setStoreType("localStorage");

  if(ReactSession.get('token')){
    window.location.href = '/home'
  }else{
    return (
      <> 
        <NewUserPurchaseTypeBody/>
      </> 
    )
  }

  
}
export default NewUserPurchaseTypePage