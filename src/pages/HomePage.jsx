import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import HomeBodyContent from "../components/homeBodyContent/HomeBodyContent";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import RightSideBar from "../components/Sidebar/RightSideBar";
import Uploader from "../components/media/Uploader";
import { ReactSession } from "react-client-session";
import { folderUrl, vaultAdvertisement } from "../components/api/Api";
import axios from "axios";
import { errorNotify } from "../components/Toast/Toast";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
import UploadProgress from "../components/uploadProgress/UploadProgress";
import CompanyBanner from "../components/companyBanner/CompanyBanner";
const HomePage = () => {
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");
  const location = useLocation();

  const [apiData, setApiData] = useState();
  const [advertisements, setAdvertisements] = useState([]);
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;
  const [media, setMedia] = useState([]);

  const getAllMedia = ()=>{
    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (res) {
        ReactSession.set("id", res.data.id);
        setApiData(res.data);
        setMedia(res.data.media);
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
  }

  useEffect(() => {
    getAllMedia()
  }, []);

  let total_size = 0;
  media.forEach((element) => {
    total_size = total_size + element.size;
  });

  const addMedia = () => {
    let config = {
      method: "get",
      url: `${vaultAdvertisement}/${micrositeId}`,
    };

    axios.request(config).then((response) => {
      setAdvertisements(response.data.data);
    });
  };

  useEffect(() => {
    addMedia();
  }, []);

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <Header />
        <LeftSideBar />
        <RightSideBar media={media} />
        <div className="home_page_body_content">
          {advertisements && advertisements.length > 0 && (
            <CompanyBanner advertisements={advertisements} />
          )}

          <HomeBodyContent media={media} />
          <Uploader totalSize={total_size} getAllMedia={getAllMedia} />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default HomePage;
