import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import SettingBody from "../components/SettingBody/SettingBody";
import { ReactSession } from "react-client-session";
import axios from "axios";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
import NomineeAddBody from "../components/SettingBody/NomineeAddBody";
import { Box } from "@mui/material";
import NomineeUpdateBody from "../components/SettingBody/NomineeUpdateBody";

const SettingsNomineeUpdatePage = () => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();
  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <LeftSideBar />
        <Box className="setting_page_body_content" sx={{mt:2}}>
          <NomineeUpdateBody />
        </Box>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default SettingsNomineeUpdatePage;
