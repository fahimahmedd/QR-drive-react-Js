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
const LostAndFoundBody = () => {
  ReactSession.setStoreType("localStorage");
  const [loaderVisible, setLoaderVisible] = useState("none");
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [addres, setAdress] = useState('')
  const [phone, setPhone] = useState('')
  const [details, setDetails] = useState('')


  const handleSubmit = () => {
    setLoaderVisible("");
  
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", addres);
    data.append("details", details);
   
    var config = {
      method: "post",
      // url: `${createVoltUrl}/${ReactSession.get("uuid")}`,
      data: data,
    };
    axios(config)
      .then(function (response) {
       
      })
      .catch(function (error) {
        setLoaderVisible("none");
        errorNotify("Something went wrong!.Please try again", 5000);
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
                <div className="entry_process_container">
                  <div className="process_wrapper">
                    <h3>Information</h3>
                    <TextField
                      id="filled-basic-v-name"
                      label="Name"
                      variant="filled"
                      type="text"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      id="filled-basic-v-name"
                      label="Email"
                      variant="filled"
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      id="filled-basic-v-name"
                      label="Phone"
                      variant="filled"
                      type="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                      id="filled-basic-v-name"
                      label="Address"
                      variant="filled"
                      type="text"
                      onChange={(e) => setAdress(e.target.value)}
                    />
                    <TextField
                      id="filled-basic-v-description"
                      label="Details"
                      multiline
                      rows={3}
                      variant="filled"
                      onChange={(e) => setDetails(e.target.value)}
                    />
                   
                    <div className="button_side">
                      {email && phone  ? (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            variant="contained"
                            className="submit_btn N_user_btn"
                          >
                            Submit
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

export default LostAndFoundBody;
