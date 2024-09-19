import { Grid } from "@mui/material";
import { useParams } from "react-router";
import useGeolocation from "react-hook-geolocation";
import Geocode from 'react-geocode';
import { GoogleApiKey } from "../../utils/GoogleApiKey";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionPaymentBody from "../../components/payment/SubscriptionPaymentBody";

import { ReactSession } from "react-client-session";
import { qrdriveAll } from "../../components/api/Api";
import axios from "axios";
import UserVaultMobileHeader from "../../components/mobileHeader/UserVaultMobileHeader";
import Header from "../../components/header/Header";
import UserVaultLeftSideBar from "../../components/Sidebar/UserVaultLeftSideBar";


const stripePromise = loadStripe(
  "pk_test_51OE1gQSFKNm0CZMZHxi93TV4jmFc0TJIfKORRkPVYPqPJU5ObJeRmfEu9f80u5kwmguYfrfseBeWZyLCPbEsDVDZ00CJ9E6cwx"
);


const SubscriptionPaymentPage = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");
  // const [longitude, setLongitude] = useState(null);
  const params = useParams();
  Geocode.setApiKey(GoogleApiKey);
  const geolocation = useGeolocation();
  useEffect(()=>{
    setCurrentLocation('loading')
    if (geolocation.error) {
      alert(geolocation.error.message);
    } else {
      Geocode.fromLatLng(geolocation.latitude, geolocation.longitude).then(
        (response) => {
          response?.results[0]?.address_components.forEach(element => {
            if(element?.long_name ==="Bangladesh" || element?.short_name==="BD"){
              setCurrentLocation('BD')
            }
          });

        },
        (error) => {
          // console.error(error);
        }
      );
    }
  },[geolocation.latitude,geolocation.longitude,geolocation.error])
  // console.log('location', location)


  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");

  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");

  const [allVaultLists, setAllVaultLists] = useState([])
  const [activeItem, setActiveItem] = useState(null);





  const getAllUsersVault = ()=>{
    var config = {
      method: "get",
      url: qrdriveAll,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (res) {
        setAllVaultLists(res?.data)
        if(res?.data && res?.data.length>0){
          res.data.forEach(element => {
            if(element?.microsite_id ===micrositeId){
              setActiveItem(element)
            }
          });
        }
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
  }

  useEffect(() => {
    getAllUsersVault()
  }, []);



  
  return (
    <Fragment>
       <UserVaultMobileHeader allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        <Header />
        {/* <LeftSideBar /> */}
        <UserVaultLeftSideBar allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        {/* <RightSideBar media={media} /> */}
        <div className="home_page_body_content">
        <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={12} xs={12}></Grid>
          <Grid item lg={9} md={8} sm={12} xs={12}>
            <div className="content_body">
            <Elements stripe={stripePromise}>
              <SubscriptionPaymentBody
                params={params}
                currentLocation={currentLocation}
                // currentLocation={'sds'}
              />
              </Elements>
            </div>
          </Grid>
        </Grid>
        </div>
     
    </Fragment>
  );
};

export default SubscriptionPaymentPage;
