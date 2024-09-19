import { Box, Button, TextField, Toolbar } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import SunEditor from "suneditor-react";
import { createJournalUrl, createNoteUrl } from "../api/Api";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { errorNotify, successNotify } from "../Toast/Toast";
import MainLoader from "../Loader/MainLoader";
import { useLocation } from "react-router-dom";
const NoteEditor = () => {
  const location = useLocation();
  ReactSession.setStoreType("localStorage");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const [loaderShow, setLoaderShow] = useState("none");
  const [noteTitle, setNoteTitle] = useState(
    location.state ? location.state.data.title : ""
  );
  const [editorValue, setEditorValue] = useState(
    location.state ? location.state.data.details : ""
  );
  const [openEvidence, setOpenEvidence] = useState(false);
  const handleEditorChange = (content) => {
    setEditorValue(content);
  };
  const handleSaveNote = () => {
    setLoaderShow("block");
    var data = new FormData();
    data.append("title", noteTitle);
    data.append("details", editorValue);
    data.append("vault_id", ReactSession.get("id"));

    var config = "";

    if (location.state) {
      var config = {
        method: "post",
        url: `${createNoteUrl}/${location.state.data.uuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
    } else {
      var config = {
        method: "post",
        url: createNoteUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
    }

    if (editorValue) {
      axios(config)
        .then(function (response) {
          setLoaderShow("none");
          successNotify("Note Created successfully", 2000);
          setTimeout((e) => {
            window.location.href = "/note";
          }, 2000);
        })
        .catch(function (error) {
          setLoaderShow("none");
          errorNotify("Something went wrong!. Please try again", 5000);
        });
    } else {
      errorNotify("Details needed", 5000);
      setLoaderShow("none");
    }
  };

  return (
    <>
      <div className="note_edid_body">
        <div className="journal_save_btn">
          <Button variant="contained" onClick={handleSaveNote}>
            Save
          </Button>
        </div>

        <div className="journal_title_field">
          <TextField
            defaultValue={noteTitle}
            id="standard-basic"
            label="Title"
            variant="standard"
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
        <div className="text_editor">
          <SunEditor
            id="details"
            name="details"
            defaultValue={editorValue}
            showToolbar={true}
            setDefaultStyle="height: 400px"
            onChange={handleEditorChange}
            setOptions={{
              buttonList: [
                [
                  "undo",
                  "redo",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                  "textStyle",
                  "removeFormat",
                  "outdent",
                  "indent",
                  "align",
                  "horizontalRule",
                  "list",
                  "lineHeight",
                  "table",
                  "link",
                  "image",
                  "video",
                  "audio",
                  "imageGallery",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                  "print",
                  "save",
                  "template",
                ],
              ],
            }}
          />
        </div>
        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
        <ToastContainer />
      </div>
    </>
  );
};

export default NoteEditor;
