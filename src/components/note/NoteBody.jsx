import { Box, Grid, Menu, MenuItem } from "@mui/material";
import React from "react";
import NoteBtn from "./NoteBtn";
import NoteItem from "./NoteItem";
import { useEffect } from "react";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import { createNoteUrl, getJournalsUrl } from "../api/Api";
import axios from "axios";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { successNotify } from "../Toast/Toast";
import Swal from "sweetalert2";
import MainLoader from "../Loader/MainLoader";
const NoteBody = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const id = ReactSession.get("id");
  const [note, setNote] = useState([]);
  const [loaderShow, setLoaderShow] = useState("none");

  const getAllNotes = () => {
    var config = {
      method: "get",
      url: `${createNoteUrl}?vault_id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setNote(response.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const handleDetails = (data) => {
    navigate("/note-edit", {
      state: {
        data: data,
      },
    });
  };

  const handleDelete = (uuid) => {
    setLoaderShow("block");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${createNoteUrl}/${uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.request(config).then((response) => {
          setLoaderShow("none");
          getAllNotes();
          successNotify("Success", 3000);
        });
      }
    });
  };

  return (
    <>
      <div className="note_container">
        <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={4} xs={6}>
            <NoteBtn />
          </Grid>
          {note &&
            note
              .slice(0)
              .reverse()
              .map((data, key) => {
                const detailsFilter = data.details
                  .replace(/<[^>]*>?/gm, "")
                  .slice(0, 80);
                const details = detailsFilter.replace(/\&nbsp;/g, "");
                return (
                  <Grid item lg={3} md={4} sm={4} xs={6} key={data.id}>
                    <div className="note_item">
                      <div className="note_title">{data.title}</div>
                      <div className="list_activity journal_list_activity">
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <div className="icoon">
                                <MoreVertIcon {...bindTrigger(popupState)} />
                              </div>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  className="droper_menu_item"
                                  onClick={(e) => {
                                    popupState.close();
                                    handleDetails(data);
                                  }}
                                >
                                  {" "}
                                  Edit/Details{" "}
                                </MenuItem>
                                <MenuItem
                                  onClick={(e) => {
                                    popupState.close();
                                    handleDelete(data.uuid);
                                  }}
                                >
                                  {" "}
                                  Delete{" "}
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      </div>
                      <p>
                        {details.length > 60 ? (
                          <>
                            <span>
                              {" "}
                              {details.slice(0, 100)}
                              {"..."}{" "}
                            </span>
                          </>
                        ) : (
                          <>
                            <span> {details} </span>
                          </>
                        )}
                      </p>
                    </div>
                  </Grid>
                );
              })}
        </Grid>
        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
        <ToastContainer />
      </div>
    </>
  );
};

export default NoteBody;
