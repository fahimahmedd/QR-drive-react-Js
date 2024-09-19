import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import HomeBodyContent from "../components/homeBodyContent/HomeBodyContent";
import LeftSideBar from "../components/Sidebar/LeftSideBar";
import RightSideBar from "../components/Sidebar/RightSideBar";
import Uploader from "../components/media/Uploader";
import { ReactSession } from "react-client-session";
import { folderUrl, qrdriveAll, vaultAdvertisement } from "../components/api/Api";
import axios from "axios";
import { errorNotify } from "../components/Toast/Toast";
import MobileHeader from "../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../components/mobileBottomTab/MobileBottomTab";
import UploadProgress from "../components/uploadProgress/UploadProgress";
import CompanyBanner from "../components/companyBanner/CompanyBanner";
import UserVaultLeftSideBar from "../components/Sidebar/UserVaultLeftSideBar";
import UserVaultFilesBody from "../components/media/myFilesBody/UserVaultFilesBody";
import UserVaultUploader from "../components/media/UserVaultUploader";
import UserVaultMobileHeader from "../components/mobileHeader/UserVaultMobileHeader";
import VaultSponsors from "../components/Sponsors/VaultSponsors";
const UserSponsorVaultPage = () => {
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");
  const location = useLocation();

  const [apiData, setApiData] = useState();
  const [advertisements, setAdvertisements] = useState([]);
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;
  const [media, setMedia] = useState([]);

  const [allVaultLists, setAllVaultLists] = useState([])
  const [activeItem, setActiveItem] = useState(null);
  
  const [collectionName, setCollectionName] = useState([]);
  const [highLength, setHighLength] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(false)





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

  const  getAllMedia = ()=>{
    setLoaderVisible(true)
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
        setLoaderVisible(false)
      })
      .catch(function (error) {
        setLoaderVisible(false)
        // errorNotify('Invalid api')
      });
  }


  useEffect(() => {
    getAllMedia();
  }, []);

  useEffect(() => {
    if(searchValue ===''){
      getAllMedia();
    }
  }, [searchValue]);

  let folders = [];
  useEffect(() => {
    if(media && media.length>0){
      let ObjMap = [];
      let collection_name = [];
      if (media.length > 0) {
        media.forEach((element) => {
          var makeKey = element.collection_name;
          collection_name.push(makeKey);
          if (!ObjMap[makeKey]) {
            ObjMap[makeKey] = [];
          }
  
          ObjMap[makeKey].push({
            name: element.name,
            file_name: element.file_name,
            size: element.size,
            created_at: element.created_at,
            custom_properties: element.custom_properties,
          });
        });
      }
      collection_name = Array.from(new Set(collection_name));
      let heighest_depth = 0;
      setCollectionName(collection_name);
      collection_name.forEach((element) => {
        folders = element.split("/");
        if (folders.length > heighest_depth) heighest_depth = folders.length;
      });
      setHighLength(heighest_depth);
    }
  }, [media]);



  // let toSearch = 'new'; //Will check if title have text 'search'
  // let result = media.filter(o => o.collection_name.includes(toSearch) || o.name.includes(toSearch));

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let toSearch = e.target.value; //Will check if title have text 'search'
      let result = media.filter(
        (o) => o.collection_name.includes(toSearch) || o.name.includes(toSearch)
      );
      if (result) {
        setMedia(result);
      }
    }
  };

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
    if(micrositeId){
      addMedia();
    }
  }, []);


  if (ReactSession.get("token")) {
    return (
      <>
        <UserVaultMobileHeader allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        <Header />
        {/* <LeftSideBar /> */}
        <UserVaultLeftSideBar allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        {/* <RightSideBar media={media} /> */}
        <div className="home_page_body_content">
          {/* {advertisements && advertisements.length > 0 && (
            <CompanyBanner advertisements={advertisements} />
          )} */}

          {/* <HomeBodyContent media={media} /> */}
           <VaultSponsors allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
          {/* <UserVaultUploader totalSize={total_size} getAllMedia={getAllMedia} apiData={apiData} /> */}
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default UserSponsorVaultPage;

