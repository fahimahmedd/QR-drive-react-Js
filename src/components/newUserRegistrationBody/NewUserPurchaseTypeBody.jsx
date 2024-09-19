import React, { Fragment, useEffect, useState } from "react";
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
  MenuItem,
  Select,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { purchaseUrl, registerUrl } from "../api/Api";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthenticationGraphix from "../authenticationBody/AuthenticationGraphix";
import Swal from "sweetalert2";
import MainLoader from "../Loader/MainLoader";
import { errorNotify } from "../Toast/Toast";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";

const NewUserPurchaseTypeBody = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [loaderShow, setLoaderShow] = useState("none");
  const [name, setName] = useState(
    location.state !== null ? location.state.userName : ""
  );
  const [userId, setUserId] = useState(
    location.state !== null ? location.state.id : ""
  );
  const [email, setEmail] = useState(
    location.state !== null ? location.state.email : ""
  );
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [microsite, setMicrosite] = useState("");
  const [shipping, setShipping] = useState("");
  const [billing, setBilling] = useState("");
  const [price, setPrice] = useState(1);
  const handleSubmit = () => {
    if (quantity > 0) {
      setLoaderShow("block");
      var date = new Date();
      var data = new FormData();
      data.append("user_id", userId);
      data.append("name", name);
      data.append("email", email);
      data.append("phone", phone);
      data.append("quantity", quantity);
      data.append("total_amount", price);
      data.append("payment_date", date.toLocaleDateString());
      data.append("microsite_name", microsite);
      data.append("shipping_address", shipping);
      data.append("billing_address", billing);
      var config = {
        method: "post",
        url: purchaseUrl,
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoaderShow("none");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your purchase has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout((e) => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          errorNotify("Something went wrong.Please try again", 5000);
        });
    } else {
      errorNotify("Quantity must be greater than 0", 5000);
    }
  };

  return (
    <Fragment>
      <div className="entry_bg">
        <div className="entry_container">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <div className="entry_conetnt_two">
                <div className="entry_process_container entry_process_container_2">
                  <div className="process_wrapper">
                    <h3>Set Purchase Details</h3>
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-phone"
                      label="Phone"
                      variant="filled"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-microsite"
                      label="Microsite Name"
                      variant="filled"
                      value={microsite}
                      onChange={(e) => setMicrosite(e.target.value)}
                    />
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-quantity"
                      label="Quantity"
                      variant="filled"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-price"
                      label="Price"
                      variant="filled"
                      value={quantity * 250}
                      onChange={(e) => setPrice(quantity * 250)}
                      disabled
                      required
                    />
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-shipping-address"
                      label="Shipping Address"
                      multiline
                      rows={3}
                      variant="filled"
                      value={shipping}
                      onChange={(e) => setShipping(e.target.value)}
                      required
                    />
                    <TextField
                      className="purchase_filed"
                      id="filled-basic-billing-address"
                      label="Billing Address"
                      multiline
                      rows={3}
                      variant="filled"
                      value={billing}
                      onChange={(e) => setBilling(e.target.value)}
                      required
                    />
                    <div className="button_side">
                      {email && name && quantity && shipping && billing ? (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            className="submit_btn N_user_btn"
                            variant="contained"
                          >
                            Purchase Now
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={(e) => handleSubmit()}
                            className="submit_btn N_user_btn"
                            variant="contained"
                            disabled
                          >
                            Purchase Now
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <Box sx={{ display: `${loaderShow}` }}>
                    {" "}
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

export default NewUserPurchaseTypeBody;
