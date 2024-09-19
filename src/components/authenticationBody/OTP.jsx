import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import Logo from "../../asset/image/logo.png";
import AuthenticationGraphix from "./AuthenticationGraphix";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { addNomineeUrl, folderUrl, validateOtpUrl } from "../api/Api";
import Loader from "../Loader/Loader";
import { errorNotify } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import { ReactSession } from "react-client-session";
const OTP = () => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();
  const [loaderVisible, setLoaderVisible] = useState("none");
  const [device, setDevice] = useState("");
  const [otp, setOtp] = useState("");
  const handleChange = (otp) => {
    setOtp(otp);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const ua = navigator.userAgent;
    if (ua) {
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        setDevice("tablet");
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        setDevice("mobile");
      }
    } else {
      setDevice("desktop");
    }
  }, []);

  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;
  // get all  nominee information
  const handleNomineeCheck = ()=>{
    setLoaderVisible("");
    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${ReactSession.get("token")}`,
      },
    };
    axios(config)
      .then(function (res) {
        if(res.data.id){
          let config = {
            method: 'get',
            url: `${addNomineeUrl}?vault_id=${res.data.id}`,
            headers: { 
              'Authorization': `Bearer ${ReactSession.get("token")}`, 
            }
          };
      
          axios.request(config)
          .then((response) => {
            setLoaderVisible("none");
            if(response?.data.length===0){
              // errorNotify('Nominee not found. Please add your nominee!')
              setTimeout(()=>{
                navigate('/setting-nominee-add')
              },2000)
            }
            if(response?.data.length>0){
              navigate('/home')
            }
          })
          .catch((error) => {
            
          });
        }
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
}



  // ReactSession.set("token", location.state.data.token);
  const handleSubmit = () => {
    var data = new FormData();
    setLoaderVisible("");
    data.append("user_id", ReactSession.get("user_id"));
    data.append("otp", otp);
    data.append("device_name", device ? device : "Unknown");

    var config = {
      method: "post",
      url: validateOtpUrl,
      data: data,
    };

    axios(config)
      .then(function (res) {
        sessionStorage.setItem(`otpStatus-${uuid}`,true)

        ReactSession.set("token", res.data.token);
        ReactSession.set("data", res.data);
        ReactSession.set("email", "");
        ReactSession.set("activation_code", "");
        ReactSession.set("details_set", "");
        ReactSession.set("PassCode", "");

        setTimeout(()=>{
          navigate("/user-vault");
        },300)
        // handleNomineeCheck(res.data.token, res.data)
      })
      .catch(function (error) {
        setOtp("");
        setLoaderVisible("none");
        errorNotify("Invalid OTP. Please try again!", 4000);
      });
  };

  return (
    <Fragment>
      <div className="entry_bg">
        <div className="entry_container">
          <div className="otp_text">OTP Is Sent To Your E-mail Address</div>
          <Grid container spacing={2} alignItems="center">
            <Grid className="mob_none" item lg={6} md={12} sm={12} xs={12}>
              <AuthenticationGraphix showValue={0} />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <div className="entry_conetnt_two">
                <div className="logo">
                  <img src={Logo} alt="" />
                </div>
                <h4> Enter Your OTP </h4>
                <div className="entry_process_container">
                  <div className="process_wrapper otp_field_container">
                    <OtpInput
                      value={otp}
                      onChange={handleChange}
                      numInputs={6}
                      separator={<span style={{ width: "8px" }}></span>}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      inputStyle={{
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        width: "54px",
                        height: "54px",
                        fontSize: "15px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "blue",
                      }}
                      focusStyle={{
                        border: "1px solid #CFD3DB",
                        outline: "none",
                      }}
                    />
                    <div className="button_side otp_btn">
                      {otp.length > 5 ? (
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

export default OTP;
