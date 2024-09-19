import React, { useState, useEffect, Fragment } from "react";
import { Box, Button, Grid } from "@mui/material";
import Logo from "../../asset/image/logo.png";
import { Html5QrcodeScanner } from "html5-qrcode";
import AuthenticationGraphix from "../authenticationBody/AuthenticationGraphix";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { vaultDetailsUrl } from "../api/Api";
import { errorNotify } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { ReactSession } from "react-client-session";

const ScanBody = () => {
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();
  const [loaderVisible, setLoaderVisible] = useState("none");

  const getUuid = ReactSession.get("uuid");

  useEffect(() => {
    setTimeout(() => {
      function onScanSuccess(decodedText, decodedResult) {
        setLoaderVisible("");
        var URL = decodedText;
        var arr = URL.split("/");
        var stroreUuid = "";
        stroreUuid = arr[4];
        const url = `${vaultDetailsUrl}/${stroreUuid}`;
        if (stroreUuid && arr[3] === "vault") {
          axios
            .get(url)
            .then((res) => {
              ReactSession.set("uuid", arr[4]);
              if (res.data.user_id !== null) {
               const getUserId =   ReactSession.get("user_id");
                  if(getUserId ===res.data.user_id){
                    navigate("/user-vault");
                  }else{
                    ReactSession.set("user_id", res.data.user_id);
                    setTimeout(()=>{
                      navigate("/pass-code");
                    },300)
                  }
                  // navigate("/user-vault");
              } else {
                setTimeout(() => {
                  navigate("/email-check");
                }, 300);
              }
            })
            .catch((err) => {
              errorNotify("Invalid Vault!", 3000);
              setTimeout(() => {
                // window.location.reload()
              }, 3000);
            });
        } else {
          errorNotify("Invalid QR Code. Please try again", 3000);
          setTimeout(() => {
            // window.location.reload()
          }, 3000);
        }
      }
      var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 150,
      });
      html5QrcodeScanner.render(onScanSuccess);
    }, 200);
  }, []);
  return (
    <Fragment>
      <div className="entry_bg">
        <div className="entry_container">
          <Grid container spacing={2} alignItems="center">
            <Grid className="mob_none" item lg={6} md={6} sm={12} xs={12}>
              <AuthenticationGraphix showValue={1} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="entry_conetnt_two ">
                <div className="logo">
                  <img src={Logo} alt="" />
                </div>
                <h4> Upload/Scan your QR Code </h4>
                {/* Container */}
                <div className="entry_process_container">
                  <div className="drag_qr_container" id="reader"></div>
                  <Box component="span" sx={{ display: `${loaderVisible}` }}>
                    <Loader />
                  </Box>
                </div>
              </div>
              <Link
                className="purchase_btn purchase_btn_2"
                to="/new-user-email-check"
              >
                <Button variant="outlined">Purchase Now</Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default ScanBody;
