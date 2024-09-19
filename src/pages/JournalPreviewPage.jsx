import React, { useRef } from "react";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import { ReactSession } from "react-client-session";
import JournalPreviewBody from "../components/journalPreviewBody/JournalPreviewBody";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/material";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";

const JournalPreviewPage = () => {
  const componentRef = useRef();
  ReactSession.setStoreType("localStorage");

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <LeftSideBar />

        <div className="journal_page_body_content">
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" className="print_btn">
                Print this out!
              </Button>
            )}
            content={() => componentRef.current}
          />
          <JournalPreviewBody ref={componentRef} />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default JournalPreviewPage;
