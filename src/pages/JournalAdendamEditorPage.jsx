import React from "react";

import LeftSideBar from "../components/Sidebar/LeftSideBar";
import { ReactSession } from "react-client-session";
import JournalAdendamEditroBody from "../components/journalAdendamEditorBody/JournalAdendamEditroBody";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
const JournalAdendamEditorPage = () => {
  ReactSession.setStoreType("localStorage");

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <LeftSideBar />
        <div className="journal_page_body_content">
          <JournalAdendamEditroBody />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default JournalAdendamEditorPage;
