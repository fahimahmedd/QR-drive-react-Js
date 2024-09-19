import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { Container } from "@mui/system";
const MobileBottomTab = () => {
  ReactSession.setStoreType("localStorage");
  const handleLogOut = () => {
    ReactSession.remove("data");
    ReactSession.remove("token");
    ReactSession.remove("uuid");
    window.location.reload();
  };
  const [activeHomeClsName, setActiveHomeClsName] = useState("tab_icon");
  const [activeFilesClsName, setActiveFilesClsName] = useState("tab_icon");
  const [activeJournalClsName, setActiveJournalClsName] = useState("tab_icon");
  const [activeRecycleClsName, setActiveRecycleClsName] = useState("tab_icon");
  const [activeSettingClsName, setActiveSettingClsName] = useState("tab_icon");
  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();

  useEffect(() => {
    if (segName === "home") {
      setActiveHomeClsName("tab_icon active");
    }
    if (segName === "files" || segName === "files-type" || segName === "name") {
      setActiveFilesClsName("tab_icon active");
    }
    if (
      segName === "journal" ||
      segName === "journal-preview" ||
      segName === "journal-edit"
    ) {
      setActiveJournalClsName("tab_icon active");
    }
    if (segName === "files-recycle") {
      setActiveRecycleClsName("tab_icon active");
    }
    if (segName === "note" || segName === "note-edit") {
      setActiveSettingClsName("tab_icon active");
    }
  }, []);

  return (
    <>
      <div className="mobile_bottom_tab">
        <Container>
          <ul className="bottom_tab">
            <li className={activeJournalClsName}>
              <Link to="/journal">
                <LibraryBooksIcon />
              </Link>
            </li>
            {/* <li className={activeSettingClsName}>
              <Link to="/note">
                <NoteAltIcon />
              </Link>
            </li> */}

            <li className={activeSettingClsName}>
              <Link to="/note">
                <NoteAltIcon />
              </Link>
            </li>

            <li className={activeHomeClsName}>
              <Link to="/home">
                <HomeIcon />
              </Link>
            </li>
            <li className={activeFilesClsName}>
              <Link to="/files">
                <FolderIcon />
              </Link>
            </li>
            <li className={activeRecycleClsName}>
              <Link to="/files-recycle">
                <DeleteIcon />
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
};

export default MobileBottomTab;
