import React from "react";
import JournalEditroBody from "../components/journalEditorBody/JournalEditroBody";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import { ReactSession } from "react-client-session";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
const JournalEditorPage = () => {
  ReactSession.setStoreType("localStorage");

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <LeftSideBar />
        <div className="journal_page_body_content">
          <JournalEditroBody />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default JournalEditorPage;
