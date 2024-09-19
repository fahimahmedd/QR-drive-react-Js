import React, { Fragment, useEffect, useState } from 'react'
import { AppBar, Container, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
// Menu
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {ReactSession} from 'react-client-session'
import { useNavigate } from 'react-router-dom';

import Logo from "../../asset/image/logo.png";
import { Logout } from '@mui/icons-material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const Header = (props) => {
  const navigate = useNavigate()
  ReactSession.setStoreType("localStorage");
    const [stickyNav, setStickyNav] = useState(false);
    const getStoredData = ReactSession.get('data');
    const userData = getStoredData?.user;
    const[searchValue,setSearchValue] = useState('')
    useEffect(() => {
        window.onscroll = () => {
          setStickyNav(window.pageYOffset === 0 ? false : true);
          return () => (window.onscroll = null);
        };
      }, []);

      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleLogOut = () =>{
        ReactSession.remove('data')
        ReactSession.remove('token')
        ReactSession.remove('uuid')
        window.location.reload()
      }

      const handleSearch = (e)=>{
        if(e.key === 'Enter') { 
          navigate('/files',{
            state: {
              searchValue:searchValue,
            }
          })
         }
          }  

return (
  <Fragment>
   <title>{props.title}</title>
   <div className="header">
    <AppBar className='header_content' sx={{ display: { xs: 'none', sm:'none,', md:'block', lg:'block'}}}>
      <Container maxWidth="xl lg md sm">
         <div className="header_wrapper"> 
            <div className="header_left">
                <img src={Logo} alt="" width={'8%'} />
                 {/* <div className="header_serachBar">
                      <input onChange={(e)=>setSearchValue(e.target.value)} onKeyPress={handleSearch} type="text" className="form_control"  placeholder=' Search'/>
                      <i><BiSearch/></i>
                 </div> */}
                 {/* Uploader Menu */}
                 {/* <PopupState variant="popover" popupId="demo-popup-menu">
                   {(popupState) => (
                      <>
                       <div className="upload_btn" {...bindTrigger(popupState)}>
                         <AddCircleIcon/> Upload
                       </div> 
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>  File Upload     </MenuItem>
                          <MenuItem onClick={popupState.close}>  Folder Upload   </MenuItem>
                       </Menu>
                      </>
                   )}
                 </PopupState>   */}
            </div>
            <div className="header_right">
              {/* Account Menus > Profile also */}
               <div className="user_info">
                  <div className="user_name">
                    {(userData) && (userData.username)}
                  </div>
                  <div className="user_id">
                    {(userData) && (userData.email)}
                  </div>
               </div>
               <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title={(userData) && (userData.username)} >
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        >
                        <Avatar sx={{ width: 35, height: 35 }}> {(userData) && (userData.username)} </Avatar>
                      </IconButton>
                    </Tooltip>
                </Box>
             {/* <Menu
              anchorEl={anchorEl}
               id="account-menu"
               open={open}
               onClose={handleClose}
               onClick={handleClose}
               PaperProps={{
                 elevation: 0,
                 sx: {
                   overflow: 'visible',
                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                   mt: 1.5,
                   '& .MuiAvatar-root': {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                   },
                   '&:before': {
                     content: '""',
                     display: 'block',
                     position: 'absolute',
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: 'background.paper',
                     transform: 'translateY(-50%) rotate(45deg)',
                     zIndex: 0,
                   },
                 },
               }}
                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                 <MenuItem onClick={handleClose}>
                   <Avatar /> Profile
                 </MenuItem>
                 <Divider />
                 <MenuItem onClick={handleClose}>
                   <ListItemIcon>
                     <HelpCenterIcon fontSize="small" />
                   </ListItemIcon>
                    Get Support 
                 </MenuItem>
                 <MenuItem onClick={handleLogOut}>
                   <ListItemIcon>
                     <Logout fontSize="small" />
                   </ListItemIcon>
                   Logout
                 </MenuItem> 
            </Menu> */}
             <Menu
              anchorEl={anchorEl}
               id="account-menu"
               open={open}
               onClose={handleClose}
               onClick={handleClose}
               PaperProps={{
                 elevation: 0,
                 sx: {
                   overflow: 'visible',
                   filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                   mt: 1.5,
                   '& .MuiAvatar-root': {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                   },
                   '&:before': {
                     content: '""',
                     display: 'block',
                     position: 'absolute',
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: 'background.paper',
                     transform: 'translateY(-50%) rotate(45deg)',
                     zIndex: 0,
                   },
                 },
               }}
                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                 {/* <MenuItem onClick={handleClose}>
                   <Avatar /> Profile
                 </MenuItem>
                 <Divider />
                 <MenuItem onClick={handleClose}>
                   <ListItemIcon>
                     <HelpCenterIcon fontSize="small" />
                   </ListItemIcon>
                    Get Support 
                 </MenuItem> */}
                 <MenuItem onClick={(e)=> navigate('/user-vault-sponsors')}>
                   iVault Lists
                 </MenuItem> 
                 <MenuItem onClick={handleLogOut}>
                   <ListItemIcon>
                     <Logout fontSize="small" />
                   </ListItemIcon>
                   Logout
                 </MenuItem> 
            </Menu>
          </div>
        </div>
      </Container>
    </AppBar>
   </div>

  </Fragment>
)
}

export default Header