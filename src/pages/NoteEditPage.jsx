import React from "react";
import Header from "../components/header/Header";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import NoteEditor from "../components/note/NoteEditor";

const NoteEditPage = () => {
  return (
    <>
      <MobileHeader />
      <MobileBottomTab />
      <Header />
      <LeftSideBar />
      <div className="note_page_body_content">
        <div className="editor_container">
          <NoteEditor />
        </div>
      </div>
    </>
  );
};
export default NoteEditPage;
