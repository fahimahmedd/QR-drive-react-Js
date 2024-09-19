import React, { Fragment, useEffect, useState } from "react";
import Logo from "../../asset/image/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { ReactSession } from "react-client-session";

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UserVaultLeftSideBar = ({allVaultLists, activeItem, setActiveItem}) => {
  ReactSession.setStoreType("localStorage");
  const handleLogOut = () => {
    ReactSession.remove("data");
    ReactSession.remove("token");
    ReactSession.remove("uuid");
    ReactSession.remove("user_id");
    ReactSession.remove("id");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/author-microsite";
  };
 
  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();


  // handle activeItem
  const handleActiveItem = (vault)=>{
    ReactSession.set("micrositeId", vault.microsite_id);
    ReactSession.set("uuid", vault.uuid);

    // setActiveItem(vault)
    window.location.href = '/user-vault'
  }


  return (
    <Fragment>
      <div className="leftSideBar">
        <div className="leftSideBar_contant">
          <Link to="/user-vault">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </Link>

          <div className="sideBtn_list_content">
            <ul className="sidebar_tabs">
              {allVaultLists && allVaultLists.map((vault,key)=>{
                return(
                  <li key={vault.id} className={activeItem?.id===vault?.id?`sideBtn_list active cursorPointer`:`sideBtn_list cursorPointer`} onClick={(e)=> handleActiveItem(vault)}>
                    <a>
                       {vault?.status ==='1'?<LockOpenIcon />:<LockIcon />} {vault?.name}
                      <Box sx={{ml:6}} >
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant={activeItem?.id===vault.id?'dot':''}
                        >
                        </StyledBadge>
                      </Box>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <Link to="/author-microsite">
            <Button
              className="sign_out_btn"
              variant="contained"
              onClick={handleLogOut}
            >
              <LogoutIcon /> Log Out
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default UserVaultLeftSideBar;
