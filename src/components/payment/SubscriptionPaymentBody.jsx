import React, { useContext, useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";

import { Box, Grid, TextField } from "@mui/material";
import { ShimmerThumbnail } from "react-shimmer-effects";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaypalClientId } from "../../utils/PaypalClientId";


import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { usePayStationPaymentMutation } from "../api/slices/payStattionApiSlice";
import { ReactSession } from "react-client-session";
import MainLoader from "../Loader/MainLoader";
import { updateVoltUrl } from "../api/Api";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const SubscriptionPaymentBody = ({ params, currentLocation }) => {
  const location  = useLocation()
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const [payStationPayment, { isLoading }] = usePayStationPaymentMutation();
  const [loading, setLoading] = useState(false);
  const [loaderShow, setLoaderShow] = useState("none");


  const user = ReactSession.get("data");

  var val = Math.floor(1000 + Math.random() * 9000);

  const [paymentData, setPaymentData] = useState({
    invoice_number: `${val}-${location?.state?.storage}`,
    currency: "BDT",
    payment_amount: (((location?.state?.storage)/5)*120),
    reference: user?.user?.username,
    cust_name: user?.user?.username,
    cust_phone: user?.user?.meta?.mobile || user?.user?.meta?.phone,
    cust_email: user?.user?.email,
    cust_address: user?.user?.meta?.present_address,
    callback_url: "https://qrdrive.icircles.app/subscription-payment",
    checkout_items:  `${val}-${location?.state?.storage}`,
  });

  const handlePayStationPaymentSubmit = async () => {
    // console.log("Payment button clicked", paymentData);
    setLoading(true);
    try {
      const result = await payStationPayment({ paymentData, token });
      if (result?.data?.status === "success") {
        // console.log("payment url", result?.data?.payment_url);
        setLoading(false);
        window.open(result?.data?.payment_url, "_blank");
        // navigate(result?.data?.payment_url)
      }

      // console.log(result)

      if (result?.data?.status === "failed") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result?.data?.message,
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };


  // received data from paystation 
  const search = useLocation().search;
  const status=new URLSearchParams(search).get("status");
  const invoice_number=new URLSearchParams(search).get("invoice_number");
  const trx_id=new URLSearchParams(search).get("trx_id");

const handleUpdateVault = (size) => {
    setLoaderShow("block");
    var formData = new FormData();
    formData.append("size", size);

    var config = {
      method: "post",
      url: `${updateVoltUrl}/${ReactSession.get("uuid")}`,
      headers: {
        Authorization: `Bearer ${token} `,
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        setLoaderShow("none");
        setTimeout(() => {
         navigate('/user-vault')
        }, 4000);
      })
      .catch(function (error) {
        setLoaderShow("none");
      });
  };

  useEffect(()=>{
    if(trx_id !=='' && trx_id !==null && trx_id !=='null'){
        if(invoice_number){
           var splitedInvoiceNumber = invoice_number.split('-');
           var size = (splitedInvoiceNumber[1]+5)*1000000000
           handleUpdateVault(size)
        }
    }
    if(status ==='Canceled'){
      navigate('/upgrade-package')
    }
  },[invoice_number,trx_id,status])


  // paypal payment
  const  handlePaymentPaypal =(size)=>{
        handleUpdateVault(size)
    }


  // for stripe payments
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
        billing_details: {
            name: user?.user?.profile?.name,
            email: user?.user?.email,
            phone:  user?.user?.meta?.mobile || user?.user?.meta?.phone,
        },
    });
    if (paymentMethod) {
      setLoading(true);
      Swal.fire({
        title: "Congratulation!",
        text: "You Payment Successfully Completed!",
        icon: "success",
      });
    //   paymentMethod["microsite_id"] = msDetails?.uuid;
    //   paymentMethod["microsite_name"] = msDetails?.name;
    //   paymentMethod["microsite_location"] = msDetails?.location;
    //   paymentMethod["uuid"] = userDetails?.uuid;
      paymentMethod["price"] = (location?.state?.storage)/5;
      paymentMethod["theme_details"] = paymentData?.invoice_number;
      // console.log("card Payment success-------", paymentMethod);
      const size = ((location?.state?.storage)+5)*1000000000
      handleUpdateVault(size)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Check Your Stripe Credentials Again!",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };


 

  return (
    <Fragment>

      <div className="purchase_body">
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>

          {currentLocation === "BD" && currentLocation !== "loading" ? (
            <Grid item xs={6}>
              <div className="purchase_card">
                <div>
                  <img
                    width={200}
                    src="https://www.paystation.com.bd/documentation/assets/images/logo.png"
                    alt="pay station logo"
                  ></img>
                  <h4 style={{ marginTop: "10px" }}>Pay Station</h4>
                  <Button
                    onClick={(e) => handlePayStationPaymentSubmit()}
                    sx={[
                      { backgroundColor: "#7d6be0" },
                      {
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#7d6be0",
                        },
                      },
                    ]}
                    variant="contained"
                  >
                    {`Upgrade(${(((location?.state?.storage)/5-1)*120)}TK)`}
                  </Button>
                </div>
              </div>
            </Grid>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  {currentLocation !== "loading" && (
                    <Box  item xs={6}>
                      <div className="purchase_card">
                        <div>
                          <img
                            width={100}
                            src="data:image/png;base64,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"
                            alt="pay station logo"
                          ></img>
                          <h4 style={{ marginTop: "10px" }}>Stripe</h4>
                          <a>
                            <Button
                              onClick={handleStripePayment}
                              sx={[
                                { backgroundColor: "#7d6be0" },
                                {
                                  "&:hover": {
                                    color: "white",
                                    backgroundColor: "#7d6be0",
                                  },
                                },
                              ]}
                              variant="contained"
                            >
                              ${((location?.state?.storage)/5)}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={6} md={6}>
                  {currentLocation !== "loading" && (
                    <Box item xs={6}>
                      <div className="purchase_card">
                        <div className="payment_option_card">
                          <Box>
                              <PayPalScriptProvider
                                options={{ "client-id": PaypalClientId }}>
                              <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                    purchase_units: [
                                        {
                                        amount: {
                                            value: ((location?.state?.storage)/5),
                                        },
                                        },
                                    ],
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    const details = await actions.order.capture();
                                    const name = details.payer.name.given_name;
                                    if(name){
                                        const size = ((location?.state?.storage)+5)*1000000000
                                        handlePaymentPaypal(size)
                                    }
                                    // alert("Transaction completed by " + name);
                                }}
                              />
                              </PayPalScriptProvider>
                          </Box>
                        </div>
                      </div>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {currentLocation === "loading" && (
            <>
              <Grid item xs={6}>
                <ShimmerThumbnail
                  height={300}
                  width={500}
                  className="m-0"
                  rounded
                />
              </Grid>
            </>
          )}

          <Grid item xs={2}></Grid>
        </Grid>
      </div>


      {/* Stripe payment modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Stripe Payment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          
        <div>
      <>
        {!success ? (
          <form onSubmit={handleStripeSubmit}>
            <h4>Pay Your Bills</h4>
                <div className="paybill_form">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Email"
                        // defaultValue={userDetails?.email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="card_content">
                        <CardElement />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Name"
                        // defaultValue={userDetails?.profile?.name}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Phone Number"
                        // defaultValue={userDetails?.meta?.phone}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
               
              {isLoading ? (
                <>
                  <button>Pay</button>
                </>
              ) : (
                <>
                  <button className="pay_button">Pay</button>
                </>
              )}

              {/* <button>Pay</button> */}
            </div>
          </form>
        ) : (
          //
          <div>
            <h2>
              <p>Payment success...</p>
            </h2>
          </div>
        )}
      </>
    </div>

        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>

      <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>

    </Fragment>
  );
};

export default SubscriptionPaymentBody;
