import { Grid } from '@mui/material'
import React from 'react'
import { baseUrl } from '../api/Api'
import { ReactSession } from "react-client-session";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import UserVaultPassCodeBody from '../authenticationBody/UserVaultPassCodeBody';
import UserVaultOTP from '../authenticationBody/UserVaultOTP';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const VaultSponsors = ({allVaultLists}) => {
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return "0 Bytes";
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      }

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

//HANDLE ENTER IVAULT
  const handleEnterIVault =(vault)=>{
    const getUuid = sessionStorage.getItem(`otpStatus-${vault?.uuid}`)

    if(getUuid ==='true'){
      ReactSession.set("micrositeId", vault.microsite_id);
      ReactSession.set("uuid", vault.uuid);
      setTimeout(()=>{
        window.location.href = '/home'
      },300)
    }else{
      setOpen(true)
    }
  }


  return (
    <div className="card-sponsors">
        <Grid container spacing={2}>
        {allVaultLists &&
          allVaultLists.length > 0 &&
          allVaultLists.map((data, i) => {
            var validity = '';
            if (data?.validity) {
              const splitedValidity = data?.validity.split(' ');
              validity = splitedValidity;
            }

            return (
              <Grid key={data.uuid} item xs={12} sm={6} md={4} lg={3}>
                <div className="main-card" onClick={(e)=> handleEnterIVault(data)}>
                  <div className="card-company">
                    <div className="vault-info">
                      {data?.name && <h4>{data?.name}</h4>}
                      {data?.meta?.size ? (
                        <p>Total Usable Storage : {formatBytes(data?.meta?.size)}</p>
                      ) : (
                        <p>Total Usable Storage : 5GB</p>
                      )}
                      {validity[0] && <p>Validity: {validity[0]}</p>}
                    </div>

                    {data?.microsite !== null && (
                      <div className="company">
                        <small>Sponsored By</small>
                        {data?.microsite?.name && <h6>{data?.microsite?.name}</h6>}
                        {data?.microsite.entity_logo && (
                          <a href={data?.microsite?.website} rel="noreferrer" target="_blank">
                            <img src={`${baseUrl}/${data?.microsite?.entity_logo}`} alt=""></img>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>



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


    </div>  
)}

export default VaultSponsors