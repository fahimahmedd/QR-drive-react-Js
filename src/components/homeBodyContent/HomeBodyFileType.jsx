import { Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyItem from "../media/myFilesBody/MyItem";
import MyItem2 from "../media/myFilesBody/MyItem2";
import axios from "axios";
import { errorNotify } from "../Toast/Toast";
import { baseUrl, folderUrl } from "../api/Api";
import { ReactSession } from "react-client-session";
import { imageTitleDetailsVerticle } from "../../effects/imageTitleDetailsVerticle";
import { useLocation, useNavigate } from "react-router-dom";
const HomeBodyFileType = (props) => {
  ReactSession.setStoreType("localStorage");
  const location = useLocation();
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [highLength, setHighLength] = useState();
  const [apiData, setApiData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const uuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const url = `${folderUrl}/${uuid}`;

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
        if (location.state !== null && res.data.media.length > 0) {
          let toSearch = location.state.mimeType; //Will check if title have text 'search'
          let result = res.data.media.filter((o) => o.mime.includes(toSearch));

          if (result) {
            setMedia(result);
          }
        }
      })
      .catch(function (error) {
        // errorNotify('Invalid api')
      });
  }, []);

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
            <div className="File_areas">
              <Grid container spacing={2} columns={18}>
                {media &&
                  media.map((data, key) => {
                    return (
                      <Grid item xs={9} sm={4} md={4} lg={3} xl={2} key={key}>
                        <MyItem2 name="iCircles Images" getData={data} />
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </div>
        </div>
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

export default HomeBodyFileType;
