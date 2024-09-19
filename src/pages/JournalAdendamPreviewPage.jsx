import React from "react";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import { ReactSession } from "react-client-session";
import JournalAdendamPreviewBody from "../components/journalPreviewBody/JournalAdendamPreviewBody";

const JournalAdendamPreviewPage = () => {
  ReactSession.setStoreType("localStorage");

  if (ReactSession.get("token")) {
    return (
      <>
        <LeftSideBar />
        <div className="journal_page_body_content">
          <JournalAdendamPreviewBody />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default JournalAdendamPreviewPage;
