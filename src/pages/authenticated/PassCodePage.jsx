import React from "react";
import PassCodeBody from "../../components/authenticationBody/PassCodeBody";
import { ReactSession } from "react-client-session";

const PassCodePage = () => {
  ReactSession.setStoreType("localStorage");
  
    if (ReactSession.get("PassCode")) {
      window.location.href = "/otp";
    } else {
      return (
        <>
          <PassCodeBody />
        </>
      );
    }
  
};
export default PassCodePage;
