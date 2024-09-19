import { Box, Button } from "@mui/material";
import React, { Fragment } from "react";
import document from "../../asset/image/document.png";
import audio from "../../asset/image/audio.png";
import vedio from "../../asset/image/vedio.png";
import picture from "../../asset/image/picture.png";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import UserVaultPassCodeBody from "../authenticationBody/UserVaultPassCodeBody";
import UserVaultOTP from "../authenticationBody/UserVaultOTP";
import { ReactSession } from "react-client-session";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const RightSideBar = ({ media }) => {
  ReactSession.setStoreType("localStorage");

  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop(); 

  let total_size = 0;
  let audio_size = 0;
  let video_size = 0;
  let pictur_size = 0;
  let file_size = 0;

  let audioCount = 0;
  let videoCount = 0;
  let fileCount = 0;
  let photoCount = 0;

  media.forEach((element) => {
    let mimeName = element.mime.split("/");
    total_size = total_size + element.size;
    if (mimeName[0] == "image") {
      photoCount = photoCount + 1;
      pictur_size = pictur_size + element.size;
    }
    if (mimeName[0] == "application") {
      fileCount = fileCount + 1;
      file_size = file_size + element.size;
    }
    if (mimeName[0] == "audio") {
      audioCount = audioCount + 1;
      audio_size = audio_size + element.size;
    }
    if (mimeName[0] == "video") {
      videoCount = videoCount + 1;
      video_size = video_size + element.size;
    }
  });

  let percentageUsed = (total_size * 100) / 5368709120;

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= percentageUsed
          ? percentageUsed
          : prevProgress + percentageUsed
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [media]);

  const handleUpgrade = () => {
    Swal.fire("Please Contact with us (+880 1978785522)");
  };
  const handleFile = (type) => {
    if(segName !=='user-vault'){
      navigate("/files-type", {state: { mimeType: type}});
    }
  };


  //HANDLE ENTER IVAULT
  const handleEnterIVault =()=>{
    const uuid = ReactSession.get("uuid");
    const getUuid = sessionStorage.getItem(`otpStatus-${uuid}`)

    if(getUuid ==='true'){
      navigate('/home')
    }else{
      setOpen(true)
    }
  }

 

  return (
    <Fragment>
     
      <div className="rightSidebar">
           <div className="vaultName">
            {segName ==='user-vault' && 
              <Button sx={{pb:-2}} variant="contained" onClick={(e)=> handleEnterIVault()}>Enter iVault</Button>
            }
            {segName ==='home' && 
              <Button sx={{pb:-2}} variant="contained" onClick={(e)=> navigate('/user-vault-sponsors')}>iVault List</Button>
            }
          </div>
        
        <div className="vault_space">
          <CircularProgress
            className="vault_capacity_svg"
            variant="determinate"
            value={progress}
          />
          <div className="space_update">
            <div className="total_storage">
              {formatBytes(total_size)}{" "}
              <span> {percentageUsed.toFixed(2)}% Storage used of 5GB </span>
            </div>
            {/* <div className="used_space">
                  
               </div> */}
          </div>
        </div>
        <div className="vault_upgrade">
          <div className="vault_upgrade_left">
            {/* <Button variant="contained" color="success" onClick={handleUpgrade}> */}
            <Button variant="contained" color="success" onClick={(e)=> navigate('/upgrade-package')}>
              Upgrade
            </Button>
          </div>
          <div className="vault_upgrade_right">
            Upgrade your plan for more space
          </div>
        </div>
        <div className="vault_overview">
          <div
            className="overview_item"
            onClick={(e) => {
              handleFile("application/");
            }}
          >
            <div className="item_title">
              <div className="overviewItem_icon">
                <img src={document} alt="" />
              </div>
              <span> Doc </span>
            </div>
            <div className="space_count">{formatBytes(file_size)}</div>
          </div>
          <div
            className="overview_item"
            onClick={(e) => {
              handleFile("audio/");
            }}
          >
            <div className="item_title">
              <div className="overviewItem_icon">
                <img src={audio} alt="" />
              </div>
              <span> Audio </span>
            </div>
            <div className="space_count">{formatBytes(audio_size)}</div>
          </div>
          <div
            className="overview_item"
            onClick={(e) => {
              handleFile("video/");
            }}
          >
            <div className="item_title">
              <div className="overviewItem_icon">
                <img src={vedio} alt="" />
              </div>
              <span> Video </span>
            </div>
            <div className="space_count">{formatBytes(video_size)}</div>
          </div>
          <div
            className="overview_item"
            onClick={(e) => {
              handleFile("image/");
            }}
          >
            <div className="item_title">
              <div className="overviewItem_icon">
                <img src={picture} alt="" />
              </div>
              <span> Picture </span>
            </div>
            <div className="space_count">{formatBytes(pictur_size)}</div>
          </div>
        </div>
      </div>


    
    {/* pass code modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'sm'}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
         <UserVaultPassCodeBody 
          handleClickOpen={handleClickOpen}
          handleClose = {handleClose} 
          handleClickOpen2={handleClickOpen2}
          handleClose2 = {handleClose2}
         />
        </DialogContent>
      </BootstrapDialog>
       
       {/* OTP modal */}
       <BootstrapDialog
        onClose={handleClose2}
        aria-labelledby="customized-dialog-title"
        open={open2}
        maxWidth={'sm'}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose2}
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
         <UserVaultOTP 
            handleClickOpen={handleClickOpen}
            handleClose = {handleClose} 
            handleClickOpen2={handleClickOpen2}
            handleClose2 = {handleClose2}
         />
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
};

export default RightSideBar;
