import { Box, Button, Grid, Menu, MenuItem, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextEditor from "../textEditor/TextEditor";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";

import { createRoot } from "react-dom/client";
import FileUpload from "react-mui-fileuploader";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { createJournalUrl } from "../api/Api";
import { ToastContainer } from "react-toastify";
import MainLoader from "../Loader/MainLoader";
import { errorNotify, successNotify } from "../Toast/Toast";
import { useLocation } from "react-router-dom";
const JournalAdendamEditorRight = () => {
  const location = useLocation();

  ReactSession.setStoreType("localStorage");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const [loaderShow, setLoaderShow] = useState("none");
  const [openEvidence, setOpenEvidence] = useState(false);
  const [inputList, setInputList] = useState([{}]);
  const [journalTitle, setJournalTitle] = useState();
  const [editorValue, setEditorValue] = useState();
  const handleEditorChange = (content) => {
    setEditorValue(content);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenEvidence = () => {
    setOpenEvidence(true);
  };
  const handleCloseEvidence = () => {
    setOpenEvidence(false);
  };

  // Witness Modal Part
  const [openWitness, setOpenWitness] = useState(false);
  const handleClickOpenWitness = () => {
    setOpenWitness(true);
  };
  const handleCloseWitness = () => {
    setOpenWitness(false);
  };

  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleFilesChange = (files) => {
    // Update chosen files
    setFilesToUpload([...files]);
  };

  const uploadFiles = () => {
    // Create a form and post it to server
    let formData = new FormData();
    filesToUpload.forEach((file) => formData.append("files", file));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {}]);
  };

  const handleCreateJounal = () => {
    setLoaderShow("block");
    var data = new FormData();
    data.append("title", journalTitle);
    data.append("details", editorValue);
    data.append("parent_id", location.state.id);
    data.append("vault_id", ReactSession.get("id"));

    for (let i = 0; i < filesToUpload.length; i++) {
      data.append("media", filesToUpload[i]);
    }
    // for (let i = 0; i <inputList.length; i++) {
    //   data.append('witness[]', inputList[i].witness);
    // }

    var config = {
      method: "post",
      url: createJournalUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoaderShow("none");
        successNotify("Journal Created successfully", 2000);
        setTimeout((e) => {
          window.location.href = "/journal";
        }, 2000);
      })
      .catch(function (error) {
        setLoaderShow("none");
        errorNotify("Something went wrong!. Please try again", 5000);
      });
  };

  return (
    <Fragment>
      <div className="journal_editor_right_body">
        <div className="journal_item_details">
          <div className="page_title">
            <h2> Add Addendam To Your Journal </h2>
            <div className="list_activity">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <div className="icoon">
                      <MoreVertIcon {...bindTrigger(popupState)} />
                    </div>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={(e) => {
                          popupState.close();
                          handleCreateJounal();
                        }}
                      >
                        Save Adendam
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          </div>
          <div className="journal_title_field">
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              onChange={(e) => setJournalTitle(e.target.value)}
            />
          </div>
          <div className="journal_others_info">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleClickOpenWitness}>
                  {" "}
                  <AddIcon /> Add Evidence{" "}
                </Button>

                {/* <Button variant="contained"  onClick={handleClickOpenEvidence} className='margin_l'> <AddIcon/>  Add Witness  </Button> */}
              </Grid>
            </Grid>
          </div>
          <div className="journal_text_editor">
            <SunEditor
              id="details"
              name="details"
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
        </div>
      </div>

      {/* Journal Evidance Modal */}
      <Dialog
        fullScreen={fullScreen}
        open={openEvidence}
        onClose={handleCloseEvidence}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Search by mail address"}
        </DialogTitle>
        <DialogContent>
          <div className="Journal_modal_body">
            {/* <div className="header_serachBar">
                      <input type="text" className="form_control"  placeholder=' Search'/>
                      <i><EmailIcon/></i>
                 </div> */}
            {inputList.map((x, i) => {
              return (
                <div className="box" key={i}>
                  <input
                    name="witness"
                    placeholder="Enter Witness Email"
                    value={x.witness}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputList.length - 1 === i && (
                      <button onClick={handleAddClick}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseEvidence}>
            ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* Witness Modal Dilougue */}
      <Dialog
        fullScreen={fullScreen}
        open={openWitness}
        onClose={handleCloseWitness}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add Evidence"}</DialogTitle>
        <DialogContent>
          <div className="Journal_modal_body">
            <FileUpload
              multiFile={false}
              onFilesChange={handleFilesChange}
              onContextReady={(context) => {}}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseWitness}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: `${loaderShow}` }}>
        <MainLoader />
      </Box>
      <ToastContainer />
    </Fragment>
  );
};

export default JournalAdendamEditorRight;
