import React, { Fragment, useState } from "react";
import folder from "../../../asset/image/folder.png";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { errorNotify, successNotify } from "../../Toast/Toast";
import { deleteFolderUrl, editMediaFolderUrl, vaultToVaultCopyFolderUrl } from "../../api/Api";
import MainLoader from "../../Loader/MainLoader";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const MyItem = ({ data, onClick,getAllMedia, allVaultLists }) => {
  ReactSession.setStoreType("localStorage");
  const localUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const localData = ReactSession.get("data");
  const [loaderShow, setLoaderShow] = useState("none");

  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();


  const location = useLocation();
  var URL = data;
  var arr = URL.split("/");
  var folderName = "";
  let folderposition = 1;
  if (location.state) {
    folderposition = location.state.position;
  }
  folderName = arr[folderposition];


  var options = {
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
    data.append("new_name", `recycle_bin/${URL}`);
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      setLoaderShow("block");
      if (result.isConfirmed) {
        axios(config)
          .then(function (response) {
            getAllMedia();
            setLoaderShow("none");
            successNotify("Folder removed to bin", 2000);
            // setTimeout((e) => {
            //   window.location.reload();
            // }, 2000);
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

  const handleRenameFolder = async (preValue) => {
    // var valueName = inputValue.split('.').slice(0, -1).join('.')

    const { value: fileName } = await Swal.fire({
      title: "Rename",
      input: "text",
      inputValue: preValue,
      showCancelButton: true,
    });
    if (fileName) {
      setLoaderShow("block");
      var data = new FormData();
      let previous_name = preValue.split(" ").join("-");
      let new_name = fileName.split(" ").join("-");
      let new_valu = URL.replace(previous_name, new_name);
      data.append("previous_name", URL);
      data.append("new_name", new_valu);

      var config = {
        method: "post",
        url: `${editMediaFolderUrl}/${localUuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          getAllMedia();
          setLoaderShow("none");
          successNotify("Folder successfully Renamed", 2000);
          // setTimeout((e) => {
          //   window.location.reload();
          // }, 2000);
        })
        .catch(function (error) {
          setLoaderShow("none");
          errorNotify("Something went wrong!. Please try again", 5000);
        });
    }
  };
  const handleDeleteFolder = async (preValue) => {
    // var valueName = inputValue.split('.').slice(0, -1).join('.')
    var data = new FormData();

    data.append("collection_name", URL);
    var config = {
      method: "post",
      url: `${deleteFolderUrl}/${localUuid}`,
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      
      setLoaderShow("block");
      if (result.isConfirmed) {
        axios(config)
          .then(function (response) {
            getAllMedia();
            setLoaderShow("none");
            successNotify("Folder successfully Deleted", 2000);
            // setTimeout((e) => {
            //   window.location.reload();
            // }, 2000);
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



  const [openCopyVault, setOpenCopyVault] = React.useState(false);
  const [selectedVault, setSelectedVault] = React.useState('');

  const handleChangeCopyVault = (event) => {
    setSelectedVault(event.target.value);
  };

  const handleClickOpenCopyVault = () => {
    setOpenCopyVault(true);
  };
  const handleCloseCopyVault = () => {
    setOpenCopyVault(false);
  };
  const handleCopyToAnotherVault = async(fileUuid) =>{
    setOpenCopyVault(true)
  }


  const handleCopyFolder = ()=>{
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      setLoaderShow("block");
      if (result.isConfirmed) {
        var data = new FormData();
        data.append("sourceVaultuuid", localUuid);
        data.append("destinationVaultuuid", selectedVault?.uuid);
        data.append("collectionName", URL);
        var config = {
          method: "post",
          url: vaultToVaultCopyFolderUrl,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        axios(config)
          .then(function (response) {
            getAllMedia()
            setLoaderShow("none");
            setOpenCopyVault(false);

            successNotify("Success", 2000);
          
          })
          .catch(function (error) {
            setLoaderShow("none");
            errorNotify("Something went wrong!. Please try again", 5000);
          });
      } else {
        setLoaderShow("none");
      }
    });
  }




  if (data) {
    return (
      <Fragment>
        <div className={segName ==='user-vault'?'my_item_user_vault':'my_item'}>
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
                        handleRenameFolder(folderName.split("-").join(" "));
                      }}
                    >
                      Rename Folder
                    </MenuItem>
                    <MenuItem
                      className="droper_menu_item"
                      onClick={(e) => {
                        popupState.close();
                        handleRemoveBin(folderName.split("-").join(" "));
                      }}
                    >
                      {" "}
                      Remove To Bin
                    </MenuItem>
                    <MenuItem
                      className="droper_menu_item"
                      onClick={(e) => {
                        popupState.close();
                        handleCopyToAnotherVault(folderName.split("-").join(" "));
                      }}
                    >
                      {" "}
                      Copy Folder To Another iVault
                    </MenuItem>
                    <MenuItem
                      className="droper_menu_item"
                      onClick={(e) => {
                        popupState.close();
                        handleDeleteFolder(folderName.split("-").join(" "));
                      }}
                    >
                      {" "}
                      Delete permanently
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          {folderName && (
            <div className="item_name"> {folderName.split("-").join(" ")}</div>
          )}

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


        <BootstrapDialog
          onClose={handleCloseCopyVault}
          aria-labelledby="customized-dialog-title"
          open={openCopyVault}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Select The Destination iVault
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseCopyVault}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedVault}
                label="Age"
                onChange={handleChangeCopyVault}
              >
                {allVaultLists && allVaultLists.length>0 && allVaultLists.map((vault, key)=>{
                  if(localUuid !==vault.uuid){
                    return(
                      <MenuItem key={vault?.uuid} value={vault}>{vault?.name}</MenuItem>
                    )
                  }
                })}
              </Select>
            </FormControl>
          </Box>
          </DialogContent>
          <DialogActions>
            {selectedVault?
            <Button autoFocus onClick={()=>handleCopyFolder()}>
              Submit
            </Button>:
            <Button disabled>
              Submit
          </Button>
            }
            
          </DialogActions>
      </BootstrapDialog>   


      </Fragment>
    );
  }
};

export default MyItem;
