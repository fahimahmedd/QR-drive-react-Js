import React from "react";
import PassCodeBody from "../../components/authenticationBody/PassCodeBody";
import { ReactSession } from "react-client-session";
import LostAndFoundBody from "../../components/authenticationBody/LostAndFoundBody";

const FoundLostPage = () => {
  ReactSession.setStoreType("localStorage");
  
    if (ReactSession.get("PassCode")) {
      window.location.href = "/otp";
    } else {
      return (
        <>
          <LostAndFoundBody />
        </>
      );
    }
  
};
export default FoundLostPage;
