import React, { Fragment, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import Logo from "../../asset/image/logo.png";
import AuthenticationGraphix from "./AuthenticationGraphix";
import { useLocation, useNavigate } from "react-router-dom";
import { errorNotify } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import { checkActivationCodeUrl } from "../api/Api";
import axios from "axios";
import Loader from "../Loader/Loader";
import { ReactSession } from "react-client-session";
const MatchActivationCode = () => {
  ReactSession.setStoreType("localStorage");
  const [loaderVisible, setLoaderVisible] = useState("none");
  const location = useLocation();
  const navigate = useNavigate();
  const [activationCode, setActivationCode] = useState("");
  const handleSubmit = () => {
    setLoaderVisible("");
    var data = new FormData();
    data.append("uuid", ReactSession.get("uuid"));
    data.append("activation_code", activationCode);

    var config = {
      method: "post",
      url: checkActivationCodeUrl,
      data: data,
    };

    axios(config)
      .then(function (response) {
        ReactSession.set("activation_code", activationCode);
        navigate("/set-vault-details");
      })
      .catch(function (error) {
        setActivationCode("");
        setLoaderVisible("none");
        errorNotify("Given code is invalid", 5000);
      });
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
                <div className="logo">
                  <img src={Logo} alt="" />
                </div>
                <h4> Enter iVault Activation Code </h4>
                <div className="entry_process_container">
                  <div className="process_wrapper">
                    <TextField
                      id="filled-basic-activation-code"
                      label="Activation Code"
                      variant="filled"
                      onChange={(e) => setActivationCode(e.target.value)}
                    />
                    <div className="button_side">
                      {activationCode ? (
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

export default MatchActivationCode;
