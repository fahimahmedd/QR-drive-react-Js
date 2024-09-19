import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import MyFilesBody from "../components/media/myFilesBody/MyFilesBody";
import Uploader from "../components/media/Uploader";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { errorNotify } from "../components/Toast/Toast";
import { folderUrl } from "../components/api/Api";
import UploadProgress from "../components/uploadProgress/UploadProgress";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
import HomeBodyFileType from "../components/homeBodyContent/HomeBodyFileType";
const HomeBodyFileTypePage = () => {
  ReactSession.setStoreType("localStorage");
  const [apiData, setApiData] = useState();
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

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <Header />
        <LeftSideBar />
        <div className="myfile_page_body_content">
          <HomeBodyFileType />
          <Uploader totalSize={total_size} getAllMedia={getAllMedia} />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default HomeBodyFileTypePage;
