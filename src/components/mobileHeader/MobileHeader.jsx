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

const MobileHeader = () => {
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
                      <div className="user_name">
                        <AccountCircleIcon /> {userData && userData.username}
                      </div>
                      <div className="user_mail">
                        <EmailIcon /> {userData && userData.email}
                      </div>
                      <Link to="/setting" className="user_setting">
                        <SettingsIcon /> Setting
                      </Link>
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

export default MobileHeader;
