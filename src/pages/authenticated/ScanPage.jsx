import React, { useEffect } from "react";
import ScanBody from "../../components/authenticationBody/ScanBody";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { vaultDetailsUrl } from "../../components/api/Api";
import { errorNotify } from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  ReactSession.setStoreType("localStorage");
  const getUuid = ReactSession.get("uuid");
  const navigate = useNavigate();


 if (!ReactSession.get("token") && ReactSession.get("PassCode")) {
    window.location.href = "/otp";
    //navigate("/otp");
  } else if (
    !ReactSession.get("token") &&
    ReactSession.get("user_id") &&
    !ReactSession.get("user_id") &&
    !ReactSession.get("activation_code")
  ) {
    window.location.href = "/activation-code";
    // navigate("/activation-code");
  } else if (
    !ReactSession.get("token") &&
    ReactSession.get("activation_code") &&
    !ReactSession.get("details_set")
  ) {
    window.location.href = "/set-vault-details";
    // navigate("/set-vault-details");
  } else if (!ReactSession.get("token") && ReactSession.get("details_set")) {
    window.location.href = "/otp";
    //navigate("/otp");
  } else if (
    !ReactSession.get("token") &&
    ReactSession.get("uuid") &&
    ReactSession.get("user_id")
  ) {
    window.location.href = "/pass-code";
    // window.location.href = "/user-vault";
  } else if (
    !ReactSession.get("token") &&
    ReactSession.get("uuid") &&
    !ReactSession.get("user_id") &&
    !ReactSession.get("email")
  ) {
    window.location.href = "/email-check";
    //navigate("/email-check");
  } else if (
    !ReactSession.get("token") &&
    ReactSession.get("uuid") &&
    ReactSession.get("email")
  ) {
    window.location.href = "/register";
    // navigate("/register");
  } else {
    return (
      <>
        <ScanBody />
      </>
    );
  }
};
export default ScanPage;
