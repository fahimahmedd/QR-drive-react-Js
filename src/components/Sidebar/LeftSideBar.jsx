import React, { Fragment, useEffect, useState } from "react";
import Logo from "../../asset/image/logo.png";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import { ReactSession } from "react-client-session";

const LeftSideBar = () => {
  ReactSession.setStoreType("localStorage");
  const handleLogOut = () => {
    ReactSession.remove("data");
    ReactSession.remove("token");
    ReactSession.remove("uuid");
    ReactSession.remove("user_id");
    ReactSession.remove("id");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/author-microsite";
  };
  const navigate = useNavigate();
  const [activeHomeClsName, setActiveHomeClsName] = useState("sideBtn_list");
  const [activeFilesClsName, setActiveFilesClsName] = useState("sideBtn_list");
  const [activeNoteClsName, setActiveNoteClsName] = useState("sideBtn_list");
  const [activeJournalClsName, setActiveJournalClsName] = useState("sideBtn_list");
  const [activeRecycleClsName, setActiveRecycleClsName] = useState("sideBtn_list");
  const [activeSettingClsName, setActiveSettingClsName] = useState("sideBtn_list");
  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();

  useEffect(() => {
    if (segName === "home") {
      setActiveHomeClsName("sideBtn_list active");
    }
    if (segName === "files" || segName === "files-type" || segName === "name") {
      setActiveFilesClsName("sideBtn_list active");
    }
    if (segName === "note" || segName === "note-edit") {
      setActiveNoteClsName("sideBtn_list active");
    }
    if (
      segName === "journal" ||
      segName === "journal-preview" ||
      segName === "journal-edit"
    ) {
      setActiveJournalClsName("sideBtn_list active");
    }
    if (segName === "files-recycle") {
      setActiveRecycleClsName("sideBtn_list active");
    }
    if (segName === "setting") {
      setActiveSettingClsName("sideBtn_list active");
    }
  }, []);


   

  return (
    <Fragment>
      <div className="leftSideBar">
        <div className="leftSideBar_contant">
          <Link to="/home">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </Link>

          <div className="sideBtn_list_content">
            <ul className="sidebar_tabs">
              <li className={activeHomeClsName}>
                {" "}
                <Link to="/home">
                  {" "}
                  <HomeIcon /> Home
                </Link>{" "}
              </li>
              <li className={activeFilesClsName}>
                {" "}
                <Link to="/files">
                  {" "}
                  <FolderIcon /> My Files
                </Link>
              </li>
              <li className={activeNoteClsName}>
                {" "}
                <Link to="/note">
                  {" "}
                  <NoteAltIcon /> My Notes
                </Link>
              </li>
              <li className={activeJournalClsName}>
                {" "}
                <Link to="/journal">
                  {" "}
                  <LibraryBooksIcon /> My Journal{" "}
                </Link>
              </li>
              <li className={activeRecycleClsName}>
                {" "}
                <Link to="/files-recycle">
                  {" "}
                  <DeleteIcon /> Recycle Bin{" "}
                </Link>
              </li>
              <Divider className="sideBtn_list" />
              <li className={activeSettingClsName}>
                {" "}
                <Link to="/setting">
                  {" "}
                  <SettingsIcon /> Settings{" "}
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/author-microsite">
            <Button
              className="sign_out_btn"
              variant="contained"
              onClick={handleLogOut}
            >
              {" "}
              <LogoutIcon /> Log Out
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default LeftSideBar;
