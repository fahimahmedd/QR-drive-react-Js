import { Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";
import { errorNotify } from "../../Toast/Toast";
import { baseUrl, folderUrl, qrdriveAll } from "../../api/Api";
import { ReactSession } from "react-client-session";
import { imageTitleDetailsVerticle } from "../../../effects/imageTitleDetailsVerticle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyItem from "../myFilesBody/MyItem";
import MyItem2 from "../myFilesBody/MyItem2";
import UserVaultDynamicUploader from "../UserVaultDynamicUploader";
import UserVaultMyItem from "../myFilesBody/UserVaultMyItem";
import UserVaultMyItem2 from "../myFilesBody/UserVaultMyItem2";
const UserVaultFolderBody = ({total_size,allVaultLists}) => {
  const location = useLocation();
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");

  const [collectionName, setCollectionName] = useState([]);
  const [highLength, setHighLength] = useState();
  const [media, setMedia] = useState([]);
  const [apiData, setApiData] = useState();
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;

  const [searchValue, setSearchValue] = useState("");
  const [position, setPosition] = useState(2)


  


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
        setApiData(res.data);
        setMedia(res.data.media);
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
  }

  useEffect(() => {
    getAllMedia();
    if(location.state.position){
      setPosition(location.state.position)
    }
  }, [location]);

  useEffect(()=>{
    if(searchValue ===''){
      getAllMedia()
    }
  },[searchValue])

  let folders = [];
  useEffect(() => {
    let ObjMap = [];
    let collection_name = [];
    if (media.length > 0) {
      media.forEach((element) => {
        var makeKey = element.collection_name;
        collection_name.push(element.collection_name);
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
  }, [media]);



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

  const handleFolderData = (cName, position, folderName, preFolderName) => {
    navigate("/files-user/name", {
      state: {
        collectionName: cName,
        position: position,
        folderName: folderName,
        preFolderName:preFolderName
      },
    });
  };
  if (media.length > 0) {
    return (
      <Fragment>
        <div className="my_files_body">
          <div className="my_files_navigate">
            <div className="navigate_part_one">
              <div className="navigate_Back" onClick={(e) => navigate(-1)}>
                <ChevronLeftIcon /> Back
              </div>
              <div className="navigate_bar_icon" onClick={(e)=> navigate('/user-vault')}>
                <DashboardIcon />
              </div>
              <div className="navigate_title">
                {apiData ? apiData.user.username : ""}
              </div>
              <div className="navigate_bar_icon">
                <KeyboardArrowRightIcon />
              </div>
              <div className="navigate_title">{location.state.folderName}</div>
            </div>
            <div className="navigate_part_two">
              <div className="navigate_serachbar">
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleSearch}
                  type="text"
                  className="form_control"
                  placeholder=" Search"
                />
              </div>
            </div>
          </div>
          <div className="files_body_content">
            <Grid container spacing={2}>
              {location.state.position < highLength ? (
                <>
                  {collectionName.length > 0 &&
                    collectionName.map((data, key) => {
                      var URL = data;
                      var arr = URL.split("/");

                      var secondFolder = "";
                      let recycleBin = arr[0];
                      secondFolder = arr[location.state.position];
                      var preFolderName = arr[location.state.position-1];
                      if (arr[location.state.position - 1] ===location.state.folderName) {
                        if (secondFolder !== undefined && folders.indexOf(secondFolder) === -1 && recycleBin !== "recycle_bin") {
                          folders.push(secondFolder);
                          return (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
                              <UserVaultMyItem
                                name="Lemmesay Images"
                                icon="folder"
                                data={data}
                                getAllMedia={getAllMedia}
                                allVaultLists={allVaultLists}
                                onClick={(e) => {
                                  // handleFolderData(
                                  //   data,
                                  //   location.state.position + 1,
                                  //   secondFolder
                                  // );
                                  handleFolderData(data, position+1, secondFolder,preFolderName);
                                }}
                              />
                            </Grid>
                          );
                        }
                      }
                    })}
                </>
              ) : (
                <></>
              )}
            </Grid>
            <div className="File_areas">
              <Grid container spacing={2}>
              {media &&
                  media.map((data, key) => {
                    const getCollectionName= data?.collection_name?.split('/')?.pop()
                    const getCollectionNameLength= data?.collection_name?.split('/');
                    if (getCollectionName === location.state.folderName && getCollectionNameLength.length===position ) {
                      return (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
                          <UserVaultMyItem2 name="iCircles Images" getData={data} getAllMedia={getAllMedia} allVaultLists={allVaultLists} />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            </div>
          </div>
        </div>
        <UserVaultDynamicUploader totalSize={total_size} getAllMedia={getAllMedia} position={position} />
      </Fragment>
    );
  } else {
    return (
      <div className="my_files_body">
        <div className="my_files_navigate">
          <div className="navigate_part_one">
            <div className="navigate_bar_icon">
              <DashboardIcon />
            </div>
            <div className="navigate_title">My Files</div>
            <div className="navigate_bar_icon">
              <KeyboardArrowRightIcon />
            </div>
          </div>
          <div className="navigate_part_two">
            <div className="navigate_serachbar">
              <input
                type="text"
                className="form_control"
                placeholder=" Search"
              />
            </div>
          </div>
        </div>
        <div className="files_body_content">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              {imageTitleDetailsVerticle()}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

export default UserVaultFolderBody;
