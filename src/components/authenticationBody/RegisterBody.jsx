import React, { Fragment, useState } from "react";
import TextField from "@mui/material/TextField";
import {
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
import { registerUrl } from "../api/Api";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactSession } from "react-client-session";
import { errorNotify } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/system";
import Loader from "../Loader/Loader";
const RegisterBody = () => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(ReactSession.get("email"));
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loaderVisible, setLoaderVisible] = useState("none");

  const handleSubmit = () => {
    setLoaderVisible(true);
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("username", userName);
    data.append("password", password);
    data.append("password_confirmation", conPassword);

    var config = {
      method: "post",
      url: registerUrl,
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoaderVisible("none");
        if (response.data.status === "success") {
          ReactSession.set("user_id", response.data.id);
          navigate("/activation-code");
        }
      })
      .catch((err) => {
        setLoaderVisible("none");
        errorNotify("Username already in used", 5000);
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
                    <h3>Registration</h3>
                    <TextField
                      id="filled-basic-name"
                      label="Your Name"
                      variant="filled"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <TextField
                      id="filled-basic-username"
                      label="User Name"
                      variant="filled"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <TextField
                      id="filled-basic-email"
                      label="Email"
                      variant="filled"
                      value={email}
                      required
                    />

                    <FormControl variant="filled">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        className=" pass_input_field "
                        onChange={(e) => setPassword(e.target.value)}
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
                        Confirm Password
                      </InputLabel>
                      <Input
                        className=" pass_input_field "
                        onChange={(e) => setConPassword(e.target.value)}
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
                    <div className="button_side">
                      {email && name && userName && password === conPassword ? (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            className="submit_btn N_user_btn"
                            variant="contained"
                          >
                            Register
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="submit_btn N_user_btn"
                            variant="contained"
                            disabled
                          >
                            Register
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

export default RegisterBody;
