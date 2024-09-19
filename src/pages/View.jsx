import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftSideBar from "../components/leftSideBar/LeftSideBar";
import { ReactSession } from "react-client-session";
import ViewBody from "../components/viewBody/ViewBody";

const SettingPage = () => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();

  if (ReactSession.get("token")) {
    return (
      <>
        <LeftSideBar />
        <div className="setting_page_body_content">
          <ViewBody />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default SettingPage;
