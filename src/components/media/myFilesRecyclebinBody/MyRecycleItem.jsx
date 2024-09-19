import React, { Fragment, useState } from "react";
import folder from "../../../asset/image/folder.png";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { deleteFolderUrl, editMediaFolderUrl, editMediaUrl } from "../../api/Api";
import { ReactSession } from "react-client-session";
import Swal from "sweetalert2";
import axios from "axios";
import { errorNotify, successNotify } from "../../Toast/Toast";
import { ToastContainer } from "react-toastify";
import MainLoader from "../../Loader/MainLoader";
const MyRecycleItem = ({ data, onClick }) => {
  ReactSession.setStoreType("localStorage");
  const localUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const localData = ReactSession.get("data");
  const [loaderShow, setLoaderShow] = useState("none");

  const location = useLocation();
  var URL = data;
  var arr = URL.split("/");
  var folderName = "";
  let folderposition = 2;
  if (location.state) {
    folderposition = location.state.position;
  }
  folderName = arr[folderposition];

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(data.created_at);
  var date = today.toLocaleDateString("en-US", options);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const handleRemoveBin = (preValue) => {
    var data = new FormData();
    data.append("previous_name", URL);
    data.append("new_name", URL.replace("recycle_bin/", ""));
    var config = {
      method: "post",
      url: `${editMediaFolderUrl}/${localUuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      setLoaderShow("block");
      if (result.isConfirmed) {
        axios(config)
          .then(function (response) {
            setLoaderShow("none");
            successNotify("Folder moved to file", 2000);
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
      <div className="my_item">
        <div className="item_icon" onClick={onClick}>
          <img src={folder} alt="" />
        </div>
        <div className="Folder_list_activity">
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
                      handleRemoveBin(folderName.split("-").join(" "));
                    }}
                  >
                    {" "}
                    Move To Files
                  </MenuItem>
                  {/* <MenuItem onClick={(e) => {
                        popupState.close();
                        handleDeleteFolder(folderName.split("-").join(" "));
                      }}
                      > Delete permanently</MenuItem> */}
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
        <div className="item_name">{folderName.split("-").join(" ")}</div>
        <div className="my_item_bootom">
          <div className="uploaded_date">
            {/* {date} */}
            {/* <span>({formatBytes(data.size)})</span>{" "} */}
            <span> </span>
          </div>
        </div>
        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default MyRecycleItem;
