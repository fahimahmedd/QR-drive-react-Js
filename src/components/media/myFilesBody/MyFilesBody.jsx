import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyItem from "./MyItem";
import MyItem2 from "./MyItem2";
import axios from "axios";
import { errorNotify } from "../../Toast/Toast";
import { baseUrl, folderUrl } from "../../api/Api";
import { ReactSession } from "react-client-session";
import { imageTitleDetailsVerticle } from "../../../effects/imageTitleDetailsVerticle";
import { useLocation, useNavigate } from "react-router-dom";
const MyFilesBody = ({media, getAllMedia,handleSearch,apiData,setSearchValue,collectionName,folders,loaderVisible, allVaultLists}) => {
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate()
  const handleFolderData = (cName, position, folderName) => {
    navigate("/files/name", {
      state: {
        collectionName: cName,
        position: position,
        folderName: folderName,
      },
    });
  };



  if (media.length > 0) {
    return (
      <Fragment>
        <div className="my_files_body">
          <div className="my_files_navigate">
            <div className="navigate_part_one">
              <div className="navigate_bar_icon">
                <DashboardIcon />
              </div>
              <div className="navigate_title">
                {apiData ? apiData.user.username : ""}
              </div>
              <div className="navigate_bar_icon">
                <KeyboardArrowRightIcon />
              </div>
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
              {collectionName.length > 0 &&
                collectionName
                  .slice(0)
                  .reverse()
                  .map((data, key) => {
                    var URL = data;
                    var arr = URL.split("/");

                    var userVault =false;
                    if(arr[1]){
                      const getSplitedName = arr[1].split("userVault")
                      if(getSplitedName[1] !==''){
                        userVault = true
                      }
                    }

                    var secondFolder = "";
                    secondFolder = arr[1];
                    let recycleBin = arr[0];
                    if (
                      secondFolder !== undefined &&
                      userVault ===true &&
                      folders.indexOf(secondFolder) === -1 &&
                      recycleBin != "recycle_bin"
                    ) {
                      folders.push(secondFolder);
                      return (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
                          <MyItem
                            name="Lemmesay Images"
                            icon="folder"
                            data={data}
                            date={data.created_at}
                            getAllMedia={getAllMedia}
                            allVaultLists={allVaultLists}
                            onClick={(e) => {
                              handleFolderData(data, 2, secondFolder);
                            }}
                          />
                        </Grid>
                      );
                    }
                  })}
            </Grid>
            <div className="File_areas">
              <Grid container spacing={2} columns={18}>
                {media &&
                  media
                    .slice(0)
                    .reverse()
                    .map((data, key) => {
                      if (data.collection_name === apiData.user.username) {
                        return (
                          <Grid
                            item
                            xs={9}
                            sm={4}
                            md={4}
                            lg={3}
                            xl={2}
                            key={key}
                          >
                            <MyItem2 name="iCircles Images" getData={data} getAllMedia={getAllMedia} allVaultLists={allVaultLists} />
                          </Grid>
                        );
                      }
                    })}
              </Grid>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }else if(loaderVisible===true){
    return(
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
  )
  }
   else {
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
        <Box display="flex" justifyContent='center' justifyItems='center'>
          {media && media.length===0 && loaderVisible===false ?<Button disabled>No media found</Button>:'Loding...' }
            
        </Box>
      
      </div>
    );
  }
};

export default MyFilesBody;
