import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Logo from "../../asset/image/logo.png";
import AuthenticationGraphix from "./AuthenticationGraphix";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { checkPassCodeUrl, vaultDetailsUrl } from "../api/Api";
import { errorNotify } from "../Toast/Toast";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactSession } from "react-client-session";
const UserVaultPassCodeBody = ({handleClickOpen,handleClose,handleClickOpen2,handleClose2}) => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();
  const [passCode, setPassCode] = useState("");
  const [vaultName, setVaultName] = useState("");
  const navigate = useNavigate();
  const [loaderVisible, setLoaderVisible] = useState("none");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");


  const getUrl = window.location.href;
  var segName = getUrl.split("/").pop();

  
  const [status, setStatus] = useState(0)

  useEffect(() => {
    let config = {
      method: "get",
      url: `${vaultDetailsUrl}/${uuid}`,
    };

    axios.request(config).then((response) => {
      if(response?.data?.status ==='1'){
        ReactSession.set("id", response.data.id)
        setStatus(1)
        setVaultName(response.data.name);
        if (response.data.microsite_id != null) {
          ReactSession.set("micrositeId", response.data.microsite_id);
        }
      }
     
    });
  }, [uuid,status]);

  const handleSubmit = () => {
    setLoaderVisible("");
    var data = new FormData();
    data.append("uuid", ReactSession.get("uuid"));
    data.append("user_id", ReactSession.get("user_id"));
    data.append("pass_code", passCode);

    var config = {
      method: "post",
      url: checkPassCodeUrl,
      data: data,
    };

    axios(config)
      .then(function (res) {
        //if user already logged in
        // navigate("/otp");
        handleClose()
        handleClickOpen2()
      })
      .catch(function (err) {
        setLoaderVisible("none");
        setPassCode("");
        errorNotify("Invalid Please Try Again!", 3000);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <div className={segName !=='user-vault'?"entry_bg":"entry_bg_userVault"}>
        <div className="entry_container">
          <Grid container spacing={2} alignItems="center">
            {/* <Grid className="mob_none" item lg={6} md={12} sm={12} xs={12}>
              <AuthenticationGraphix showValue={0} />
            </Grid> */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className="entry_conetnt_two">
                <h4> Enter Your iVault Passcode </h4>
                {vaultName && <h5>({vaultName})</h5>}
                {status ==='0' &&  <Alert severity="error">Your iVault is deactivated!. To active your iVault go: icircles.app→dashboard→profile→iVault </Alert>}
                <div className="entry_process_container">
                  <div className="process_wrapper">
                    {/* ------------ */}
                    <FormControl variant="filled">
                      <InputLabel htmlFor="standard-adornment-password">
                        PASSCODE
                      </InputLabel>
                      <Input
                        disabled={status===1?false:true}
                        className=" pass_input_field "
                        onChange={(e) => setPassCode(e.target.value)}
                        value={passCode}
                        id="standard-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              className="pass_eye_btn"
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    {/* ------------ */}

                    <div className="button_side">
                      {passCode ? (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            className="submit_btn"
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            className="submit_btn"
                            variant="contained"
                            disabled
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    </div>
                    <Box sx={{ mt: 5 }}>
                      <h5>Forgot Passcode?</h5>
                      <p>Go: icircles.app→dashboard→profile→iVault</p>
                    </Box>
                  </div>

                  <Box component="span" sx={{ display: `${loaderVisible}` }}>
                    <Loader />
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default UserVaultPassCodeBody;
