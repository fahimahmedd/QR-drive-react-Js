import React, { useEffect, useRef, useState } from "react";
import MicrositeLogo from "../../asset/image/micrositeLogo.png";
import MicrositeVedio from "../../asset/image/companyvedio.mp4";
import { Button } from "@mui/material";
import axios from "axios";
import {
  baseUrl,
  singleMicrositeDetailsUrl,
  vaultAdvertisement,
} from "../api/Api";
import { ReactSession } from "react-client-session";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
const AuthMicrositeBody = () => {
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");
  const [advertisements, setAdvertisements] = useState([]);
  const [micrositeLogo, setMicrositeLogo] = useState("");

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  const media = () => {
    let config = {
      method: "get",
      url: `${vaultAdvertisement}/${micrositeId}`,
    };

    axios.request(config).then((response) => {
      setAdvertisements(response.data.data);
    });
  };

  useEffect(() => {
    media();
  }, []);

  const micrositeDetails = () => {
    let config = {
      method: "get",
      url: `${singleMicrositeDetailsUrl}/${micrositeId}`,
    };

    axios
      .request(config)
      .then((res) => {
        setMicrositeLogo(res.data.entity_logo);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    micrositeDetails();
  }, [micrositeDetails]);

  var count = 1;

  return (
    <>
      <div className="micrositeBody_header">
        <h6>This iVault brought to you by</h6>
        <div className="microsite_logo">
          <img src={`${baseUrl}/${micrositeLogo}`} alt="" />
        </div>
      </div>

      <Container>
        <div className="microsite_intro_vedio">
          {advertisements &&
            advertisements.map((data, key) => {
              if (count == 1 && data.position === "splash_screen") {
                count = count + 1;
                return (
                  <ReactPlayer
                    url={data.video}
                    playing={true}
                    controls={true}
                    loop={true}
                    muted={true}
                    playsinline={true}
                    onReady={onLoadedData}
                    className="vedio_container"
                  />
                );
              }
            })}
          {/* <Button className="viewMore_btn" variant="contained">
          Explore
        </Button> */}
        </div>
      </Container>
    </>
  );
};

export default AuthMicrositeBody;
