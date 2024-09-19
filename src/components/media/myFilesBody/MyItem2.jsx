import React, { Fragment, useState } from "react";
import file from "../../../asset/image/file.png";
import audioType from "../../../asset/image/audioType.png";
import videoType from "../../../asset/image/videoType.png";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactSession } from "react-client-session";
import { deleteMediaUrl, editMediaUrl, sentEmailUrl, vaultToVaultCopyUrl } from "../../api/Api";
import { errorNotify, successNotify } from "../../Toast/Toast";
import axios from "axios";
import MainLoader from "../../Loader/MainLoader";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import docImage from '../../../asset/image/docx.png'
import xlsxImage from '../../../asset/image/xlsx.png'
import audioImage from '../../../asset/image/audio.jpeg'
import pdfImage from '../../../asset/image/pdf.png'
import pptxImage from '../../../asset/image/pptx.png'
import zipImage from '../../../asset/image/zip.jpeg'
import { Image } from "antd";

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



const MyItem2 = ({ getData, getAllMedia, allVaultLists }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  ReactSession.setStoreType("localStorage");
  const localUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const localData = ReactSession.get("data");
  const [loaderShow, setLoaderShow] = useState("none");
  const [details, setDetails] = useState("");
  const [detailsDate, setDetailsDate] = useState("");

  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();

  var URL = getData.collection_name;
  var arr = URL.split("/");
  var folderName = "";
  folderName = arr[1];

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(getData.created_at);
  var date = today.toLocaleDateString("en-US", options);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  const handleSentToMe = (uuid) => {
    setLoaderShow("block");
    var data = new FormData();
    data.append("email", localData.user.email);

    var config = {
      method: "post",
      url: `${sentEmailUrl}/${uuid}/${localUuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoaderShow("none");
        successNotify("File successfully sent to your email", 5000);
      })
      .catch(function (error) {
        setLoaderShow("none");
        errorNotify("Something went wrong!. Please try again", 5000);
      });
  };

  const handleSentToOther = async (uuid) => {
    const { value: email } = await Swal.fire({
      title: "Enter email whom you wnat to sent.",
      input: "email",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      setLoaderShow("block");
      var data = new FormData();
      data.append("email", email);

      var config = {
        method: "post",
        url: `${sentEmailUrl}/${uuid}/${localUuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoaderShow("none");
          successNotify("File successfully sent to this email", 5000);
        })
        .catch(function (error) {
          setLoaderShow("none");
          errorNotify("Something went wrong!. Please try again", 5000);
        });
    }
  };

  const handleRemoveBin = (uuid, collectionName) => {
    var data = new FormData();
    data.append("folder_name", `recycle_bin/${localData.user.username}`);

    var config = {
      method: "post",
      url: `${editMediaUrl}/${uuid}/${localUuid}`,
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
            successNotify("File successfully removed to recycle-bin", 2000);
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
  const handleDelete = (uuid, collectionName) => {
    var config = {
      method: "delete",
      url: `${deleteMediaUrl}/${uuid}/${localUuid}`,
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
            getAllMedia()
            setLoaderShow("none");
            successNotify("File permanently deleted", 2000);
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

  const handleRename = async (uuid, inputValue) => {
    // var valueName = inputValue.split('.').slice(0, -1).join('.')
    const { value: fileName } = await Swal.fire({
      title: "Rename",
      input: "text",
      inputValue: inputValue,
      showCancelButton: true,
    });
    if (fileName) {
      setLoaderShow("block");
      var data = new FormData();
      data.append("file_name", fileName);

      var config = {
        method: "post",
        url: `${editMediaUrl}/${uuid}/${localUuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          getAllMedia()
          setLoaderShow("none");
          successNotify("File successfully Renamed", 2000);
        
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleClickOpen = (details) => {
    setOpen(true);
    setDetails(details);

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var today = new Date(details.created_at);
    var date = today.toLocaleDateString("en-US", options);
    setDetailsDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };
  var mimeType = getData.mime.split("/");

    //  handleCopyToAnotherVault
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
  
  
    // handleCloseCopyVaultSubmit
    const handleCloseCopyVaultSubmit = (fileId)=>{
    
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
          data.append("mediaId", fileId);
          var config = {
            method: "post",
            url: vaultToVaultCopyUrl,
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
  
  if (getData) {
    return (
      <Fragment>
        <div className={segName ==='user-vault'?'my_file_item_user_vault':'my_file_item'} >
          <div className="item_icon">
            {/* <img src={file} alt="" /> */}
            {/* {mimeType[0] === "audio" && <img src={audioType} alt="" />}
            {mimeType[0] === "video" && <img src={videoType} alt="" />}
            {mimeType[0] === "application" && <img src={file} alt="" />}
            {mimeType[0] === "image" && <img src={getData.url} alt="" />} */}
            {(getData?.mime ==='image/png' 
            || getData?.mime ==='image/jpg' 
            || getData?.mime ==='image/jpeg'
            || getData?.mime ==='image/gif'
            || getData?.mime ==='image/webp') &&
            <Image
              width={200}
              src={getData.url}
            />
          }
          {(getData?.mime ==='video/mp4' 
            || getData?.mime ==='video/mov' 
            || getData?.mime ==='image/mkv') &&
            <video src={getData.url}  width={'100%'} autoPlay controls></video>
          }
         
         {(getData?.mime ==='application/pdf') &&
            <img src={pdfImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/msword') &&
            <img src={docImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/zip') &&
            <img src={zipImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/vnd.ms-excel') &&
            <img src={xlsxImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='audio/mpeg') &&
            <img src={audioImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/vnd.openxmlformats-officedocument.presentationml.presentation') &&
            <img src={pptxImage}  width={'100%'}></img>
          }
          </div>
          <div className="item_name">
            {getData.name.length > 25 ? (
              <>
                <span>
                  {" "}
                  {getData.name.slice(0, 25)}
                  {"..."}{" "}
                </span>
              </>
            ) : (
              <>
                <span> {getData.name} </span>
              </>
            )}
          </div>
          <div className="my_item_bootom">
            <div className="uploaded_date">{date}</div>
            <div className="File_list_activity">
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
                          openInNewTab(getData.url);
                        }}
                      >
                        View File
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleRename(getData.uuid, getData.name);
                        }}
                      >
                        Rename File
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleSentToMe(getData.uuid);
                        }}
                      >
                        Sent To Me
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleSentToOther(getData.uuid);
                        }}
                      >
                        Sent To Other
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleCopyToAnotherVault(getData.uuid);
                        }}
                      >
                        Copy To Another iVault
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleClickOpen(getData);
                        }}
                      >
                        {" "}
                        Details{" "}
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleRemoveBin(
                            getData.uuid,
                            getData.collection_name
                          );
                        }}
                      >
                        {" "}
                        Move To Bin
                      </MenuItem>
                      <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                          popupState.close();
                          handleDelete(getData.uuid, getData.collection_name);
                        }}
                      >
                        {" "}
                        Delete Permanently
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          </div>
          <Box sx={{ display: `${loaderShow}` }}>
            <MainLoader />
          </Box>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div className="item_details_dialogue">
              <div className="file_name">
                <span>File Name :</span> {details.name}
              </div>
              <div className="file_moreItem">
                <span>File Size : </span>
                {details.human_readable_size}
              </div>
              <div className="file_moreItem">
                <span> File Type : </span>
                {details.mime}
              </div>
              <div className="file_moreItem">
                <span>Created Date : </span>
                {detailsDate}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>



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
          <Button autoFocus onClick={()=>handleCloseCopyVaultSubmit(getData?.id)}>
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

export default MyItem2;
