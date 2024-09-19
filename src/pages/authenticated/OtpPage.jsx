import React, { useEffect, useState } from 'react'
import OTP from '../../components/authenticationBody/OTP'
import {ReactSession} from 'react-client-session'
import { addNomineeUrl } from '../../components/api/Api';
import axios from 'axios';
const OtpPage = () =>{
  ReactSession.setStoreType("localStorage");
  const [nominee, setNominees] = useState(null)

  // get all  nominee information
  const getAllNominee = ()=>{
      let config = {
        method: 'get',
        url: `${addNomineeUrl}?vault_id=${ReactSession.get("id")}`,
        headers: { 
          'Authorization': `Bearer ${ReactSession.get("token")}`, 
        }
      };

      axios.request(config)
      .then((response) => {
        if(response?.data){
          setNominees(response.data)
        }
      })
      .catch((error) => {
      });

  }

  useEffect(()=>{
    if(ReactSession.get("id")){
      getAllNominee()
    }
  },[nominee])

  if(ReactSession.get('token')&& nominee!==null && nominee.length>0){
    window.location.href = '/home'
  }else if(ReactSession.get('token') &&nominee!==null && nominee.length===0){
    window.location.href = '/setting-nominee-add'
  }else{
    return (
      <> 
        <OTP/>
      </> 
    )
  }

 
}
export default OtpPage