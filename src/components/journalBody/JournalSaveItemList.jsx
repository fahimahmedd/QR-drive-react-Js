import { Box, Button, Grid, Menu, MenuItem } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteJournalUrl, getJournalsUrl } from "../api/Api";
import { ReactSession } from "react-client-session";
import parser from "html-react-parser";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MainLoader from "../Loader/MainLoader";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { errorNotify, successNotify } from "../Toast/Toast";
import { imageTitleDetailsVerticle } from "../../effects/imageTitleDetailsVerticle";

const JournalSaveItemList = () => {
  ReactSession.setStoreType("localStorage");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const id = ReactSession.get("id");
  const [journals, setJournals] = useState([]);
  const [loaderShow, setLoaderShow] = useState("none");
  const [showPreBox, setShowPreBox] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    setShowPreBox("block");
    var config = {
      method: "get",
      url: `${getJournalsUrl}?vault_id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setJournals(response.data);
        setShowPreBox("none");
      })
      .catch(function (error) {});
  }, []);

  const handleAddAdendam = (id) => {
    navigate("/journal-adendam-edit", {
      state: {
        id: id,
      },
    });
  };
  const handleDetails = (data) => {
    navigate("/journal-preview", {
      state: {
        data: data,
      },
    });
  };
  const handleDelete = (JournalId) => {
    var config = {
      method: "post",
      url: `${deleteJournalUrl}/${JournalId}/${id}`,
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
      setLoaderShow("block");
      if (result.isConfirmed) {
        axios(config)
          .then(function (response) {
            setLoaderShow("none");
            successNotify("Journal Deleted successfully", 2000);
            setTimeout((e) => {
              window.location.reload();
            }, 2000);
          })
          .catch(function (error) {
            setLoaderShow("none");
            errorNotify("Something went wrong!. Please try again", 5000);
          });
      } else {
        setLoaderShow("none");
      }
    });
  };
  return (
    <Fragment>
      <div className="journal_save_container">
        <div className="Journal_Save_Item_List">
          <div className="page_title">
            <h2> Journal </h2>
            <Link to="/journal-edit">
              <Button variant="contained" className="journal_add_btn">
                {" "}
                <AddIcon /> Add New Journal{" "}
              </Button>
            </Link>
          </div>

          <Box sx={{ display: showPreBox }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4} lg={3}>
                {imageTitleDetailsVerticle()}
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                {imageTitleDetailsVerticle()}
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                {imageTitleDetailsVerticle()}
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                {imageTitleDetailsVerticle()}
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2}>
            {journals.length > 0 &&
              journals.map((data, key) => {
                var options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                var today = new Date(data.created_at);
                var date = today.toLocaleDateString("en-US", options);

                const detailsFilter = data.details
                  .replace(/<[^>]*>?/gm, "")
                  .slice(0, 250);
                const details = detailsFilter.replace(/\&nbsp;/g, "");
                return (
                  <Grid item xs={6} md={4} lg={3} key={key}>
                    <div className="Journal_Save_Item">
                      <div className="Journal_Save_Item_top">
                        <div className="journal_Title">
                          {data.title.length > 16 ? (
                            <>
                              <span>
                                {" "}
                                {data.title.slice(0, 16)}
                                {"..."}{" "}
                              </span>
                            </>
                          ) : (
                            <>
                              <span> {data.title} </span>
                            </>
                          )}
                        </div>
                        <div className="list_activity journal_list_activity">
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-menu"
                          >
                            {(popupState) => (
                              <React.Fragment>
                                <div className="icoon">
                                  <MoreVertIcon {...bindTrigger(popupState)} />
                                </div>
                                <Menu {...bindMenu(popupState)}>
                                  <MenuItem
                                    onClick={(e) => {
                                      popupState.close();
                                      handleAddAdendam(data.id);
                                    }}
                                    className="droper_menu_item"
                                  >
                                    Add Adendam
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(e) => {
                                      popupState.close();
                                      handleDetails(data);
                                    }}
                                    className="droper_menu_item"
                                  >
                                    {" "}
                                    Details{" "}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={(e) => {
                                      popupState.close();
                                      handleDelete(data.id);
                                    }}
                                    className="droper_menu_item"
                                  >
                                    {" "}
                                    Delete{" "}
                                  </MenuItem>
                                </Menu>
                              </React.Fragment>
                            )}
                          </PopupState>
                        </div>
                      </div>

                      <div className="journal_creat_date">{date}</div>
                      <div className="journal_text">
                        <p>
                          {details.length > 85 ? (
                            <>
                              <span>
                                {" "}
                                {details.slice(0, 85)}
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
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default JournalSaveItemList;
