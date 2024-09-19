import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import AuthenticationGraphix from "./AuthenticationGraphix";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { createVoltUrl } from "../api/Api";
import { errorNotify } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactSession } from "react-client-session";
import Alert from '@mui/material/Alert';
const SetVaultDetails = () => {
  ReactSession.setStoreType("localStorage");
  const [loaderVisible, setLoaderVisible] = useState("none");
  const location = useLocation();
  const navigate = useNavigate();
  const [voltName, setVoltName] = useState("");
  const [voltPassCode, setVoltPassCode] = useState("");
  const [voltConfPassCode, setVoltConfPassCode] = useState("");
  const [voltDetails, setVoltDetails] = useState("");
  const [voltNomineeDetails, setVoltNomineeDetails] = useState("");

  const handleSubmit = () => {
    setLoaderVisible("");
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();

    var fulldate = new Date(year + 1, month, day);

    var toDate = fulldate.toISOString().slice(0, 10);

    var data = new FormData();
    data.append("name", voltName);
    data.append("details", voltDetails);
    data.append("user_id", ReactSession.get("user_id"));
    data.append("pass_code", voltPassCode);
    data.append("status", "1");
    // data.append("nominee", voltNomineeDetails);
    data.append("validity", toDate);
    data.append("inactivity_timer", 600);
    data.append("payment_id", ReactSession.get("activation_code"));
    var config = {
      method: "post",
      url: `${createVoltUrl}/${ReactSession.get("uuid")}`,
      data: data,
    };
    axios(config)
      .then(function (response) {
        ReactSession.set("details_set", voltName);
        navigate("/otp");
      })
      .catch(function (error) {
        setLoaderVisible("none");
        errorNotify("Something went wrong!.Please try again", 5000);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div className="entry_bg">
        <div className="entry_container">
          <Grid container spacing={2} alignItems="center">
            <Grid className="mob_none" item lg={6} md={12} sm={12} xs={12}>
              <AuthenticationGraphix showValue={0} />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <div className="entry_conetnt_two">
                <div className="entry_process_container">
                  <div className="process_wrapper">
                    <h3>Create Your iVault</h3>
                    <TextField
                      id="filled-basic-v-name"
                      label="iVault Name"
                      variant="filled"
                      required
                      onChange={(e) => setVoltName(e.target.value)}
                    />
                    <FormControl variant="filled">
                      <InputLabel htmlFor="standard-adornment-password">
                        iVault Passcode
                      </InputLabel>
                      <Input
                        className=" pass_input_field "
                        onChange={(e) => setVoltPassCode(e.target.value)}
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
                    <FormControl variant="filled">
                      <InputLabel htmlFor="standard-adornment-password">
                        Confirm iVault Passcode
                      </InputLabel>
                      <Input
                        className=" pass_input_field "
                        onChange={(e) => setVoltConfPassCode(e.target.value)}
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
                    {voltConfPassCode.length>3 && voltPassCode !==voltConfPassCode &&  <Alert severity="error">Passcode not matched!</Alert>}
                   
                    <TextField
                      id="filled-basic-v-description"
                      label="iVault Description"
                      multiline
                      rows={3}
                      variant="filled"
                      required
                      onChange={(e) => setVoltDetails(e.target.value)}
                    />
                    {/* <TextField
                      id="filled-basic-v-nominee-description"
                      multiline
                      rows={3}
                      label="iVault Nominee Details"
                      variant="filled"
                      required
                      onChange={(e) => setVoltNomineeDetails(e.target.value)}
                    /> */}
                    <div className="button_side">
                      {voltName &&
                      voltPassCode === voltConfPassCode ? (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            variant="contained"
                            className="submit_btn N_user_btn"
                          >
                            Create Now
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            variant="contained"
                            className="submit_btn N_user_btn"
                            disabled
                          >
                            Create Now
                          </Button>
                        </>
                      )}
                    </div>
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

export default SetVaultDetails;
