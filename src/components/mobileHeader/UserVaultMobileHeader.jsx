import { Box, Button, Drawer } from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment, useState } from "react";
import Logo from "../../asset/image/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactSession } from "react-client-session";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

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

const UserVaultMobileHeader = ({allVaultLists, activeItem, setActiveItem}) => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

  ReactSession.setStoreType("localStorage");
  const handleLogOut = () => {
    ReactSession.remove("data");
    ReactSession.remove("token");
    ReactSession.remove("uuid");
    ReactSession.remove("user_id");
    ReactSession.remove("id");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  const getStoredData = ReactSession.get("data");
  const userData = getStoredData?.user;

    // handle activeItem
    const handleActiveItem = (vault,anchor)=>{
      ReactSession.set("micrositeId", vault.microsite_id);
      ReactSession.set("uuid", vault.uuid);
      toggleDrawer(anchor, false)
      // setActiveItem(vault)
      window.location.reload()
    }

  return (
    <Fragment>
      <div className="mobile_header">
        <Container>
          <div className="mobile_wrapper">
            <div className="mobile_left_side">
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <div
                    className="mobile_menubar"
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <MenuIcon />
                  </div>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                    {/* drawer Body */}
                    <div className="mobile_logo">
                      <img src={Logo} alt="" />
                    </div>
                    <div className="user_info">
                      <div className="sideBtn_list_content">
                        <ul className="sidebar_tabs">
                          {allVaultLists && allVaultLists.map((vault,key)=>{
                            return(
                                <li key={vault.id} className={activeItem?.id===vault?.id?`sideBtn_list sideBtn_list_mobile active cursorPointer`:`sideBtn_list sideBtn_list_mobile cursorPointer`} onClick={(e)=> handleActiveItem(vault,anchor)}>
                                    {vault?.status ==='1'?<LockOpenIcon />:<LockIcon />} {vault?.name}
                                    <Box sx={{ml:6}} >
                                      <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant={activeItem?.id===vault.id?'dot':''}
                                      >
                                      </StyledBadge>
                                    </Box>
                                </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                    <Button
                      className="mobile_logout_btn"
                      variant="contained"
                      onClick={handleLogOut}
                    >
                      {" "}
                      <LogoutIcon /> Log Out
                    </Button>
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            {/* <div className="mobile_rightt_side">
               <div className="search_input">
                 <input type="text" className="form_control" placeholder="Search" />
                 <div className="search_bar_icon">
                    <SearchIcon/>
                </div>
               </div>
            </div> */}
          </div>
        </Container>
      </div>
      {/* <Container>
         <div className="Mobile_searchBar">
           
        </div>
      </Container> */}
    </Fragment>
  );
};

export default UserVaultMobileHeader;
