import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LeftSideBar from "../../components/Sidebar/LeftSideBar";
import MyFilesFolderBody from "../../components/media/myFilesFolderBody/MyFilesFolderBody";
import Uploader from "../../components/media/Uploader";
import { ReactSession } from "react-client-session";

import { useLocation } from "react-router-dom";
import DynamicUploader from "../../components/media/DynamicUploader";
import { errorNotify } from "../../components/Toast/Toast";
import axios from "axios";
import { folderUrl, qrdriveAll } from "../../components/api/Api";
import UploadProgress from "../../components/uploadProgress/UploadProgress";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../../components/mobileBottomTab/MobileBottomTab";
import { ToastContainer } from "react-toastify";

const MyFilesFolderPage = () => {
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");
  const location = useLocation();

  const [apiData, setApiData] = useState();
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;
  const [media, setMedia] = useState([]);

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


  useEffect(() => {
    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (res) {
        setApiData(res.data);
        setMedia(res.data.media);
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
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
          <MyFilesFolderBody total_size={total_size} allVaultLists={allVaultLists} />
          {/* <DynamicUploader
            path={location.state.collectionName}
            totalSize={total_size}
          /> */}
           <ToastContainer/>
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default MyFilesFolderPage;
