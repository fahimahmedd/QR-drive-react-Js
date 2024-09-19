import { Box, Grid } from "@mui/material";
import React, { Fragment, useState } from "react";
import document from "../../asset/image/document.png";
import audio from "../../asset/image/audio.png";
import vedio from "../../asset/image/vedio.png";
import picture from "../../asset/image/picture.png";
import file from "../../asset/image/file.png";
import audioType from "../../asset/image/audioType.png";
import videoType from "../../asset/image/videoType.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { errorNotify, successNotify } from "../Toast/Toast";
import { editMediaUrl, sentEmailUrl } from "../api/Api";
import Swal from "sweetalert2";
import MainLoader from "../Loader/MainLoader";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StorageProgress from "../storageProgress/StorageProgress";
const HomeBodyUserVaultContent = ({ media }) => {
  ReactSession.setStoreType("localStorage");
  const navigate = useNavigate();
  const localUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const localData = ReactSession.get("data");
  const [loaderShow, setLoaderShow] = useState("none");
  let total_size = 0;
  let audio_size = 0;
  let video_size = 0;
  let pictur_size = 0;
  let file_size = 0;

  let audioCount = 0;
  let videoCount = 0;
  let fileCount = 0;
  let photoCount = 0;

  let videoPercentage = "";
  let audioPercentage = "";
  let picturePercentage = "";
  let filePercentage = "";

  media.forEach((element) => {
    let mimeName = element.mime.split("/");
    total_size = total_size + element.size;
    if (mimeName[0] == "image") {
      photoCount = photoCount + 1;
      pictur_size = pictur_size + element.size;
      picturePercentage = (pictur_size * 100) / 5368709120;
    }
    if (mimeName[0] == "application") {
      fileCount = fileCount + 1;
      file_size = file_size + element.size;
      filePercentage = (file_size * 100) / 5368709120;
    }
    if (mimeName[0] == "audio") {
      audioCount = audioCount + 1;
      audio_size = audio_size + element.size;
      audioPercentage = (audio_size * 100) / 5368709120;
    }
    if (mimeName[0] == "video") {
      videoCount = videoCount + 1;
      video_size = video_size + element.size;
      videoPercentage = (video_size * 100) / 5368709120;
    }
  });

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // const [progress, setProgress] = React.useState(0);
  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((oldProgress) => {
  //         if (oldProgress === 100) {
  //           return 0;
  //         }
  //         const diff = Math.random();
  //         return Math.min(oldProgress + diff, 100);
  //       });
  //     }, 50);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  const handleSentToMe = (uuid) => {
    setLoaderShow("block");
    var data = new FormData();
    data.append("email", localData.user.email);

    var config = {
      method: "post",
      url: `${sentEmailUrl}/${uuid}/${localUuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoaderShow("none");
        successNotify("File successfully sent to your email", 5000);
      })
      .catch(function (error) {
        setLoaderShow("none");
        errorNotify("Something went wrong!. Please try again", 5000);
      });
  };

  const handleSentToOther = async (uuid) => {
    const { value: email } = await Swal.fire({
      title: "Enter email address whom you wnat to sent",
      input: "email",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      setLoaderShow("block");
      var data = new FormData();
      data.append("email", email);

      var config = {
        method: "post",
        url: `${sentEmailUrl}/${uuid}/${localUuid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setLoaderShow("none");
          successNotify("File successfully sent to this email", 5000);
        })
        .catch(function (error) {
          setLoaderShow("none");
          errorNotify("Something went wrong!. Please try again", 5000);
        });
    }
  };

  const handleRemoveBin = (uuid, collectionName) => {
    var data = new FormData();
    data.append("folder_name", `recycle_bin/${localData.user.username}`);

    var config = {
      method: "post",
      url: `${editMediaUrl}/${uuid}/${localUuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      setLoaderShow("block");
      if (result.isConfirmed) {
        axios(config)
          .then(function (response) {
            setLoaderShow("none");
            successNotify("File successfully removed to recycle-bin", 2000);
            setTimeout((e) => {
              window.location.reload();
            }, 2000);
          })
          .catch(function (error) {
            setLoaderShow("none");
            errorNotify("Something went wrong!. Please try again", 5000);
          });
      } else {
        setLoaderShow("none");
      }
    });
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleFile = (type) => {
    navigate("/files-type", {
      state: {
        mimeType: type,
      },
    });
  };

  return (
    <Fragment>
      <div className="HomeBodyContent">
        <div className="home_top_content">
          <Grid container spacing={2}>
            <Grid
              item
              lg={3}
              md={6}
              xs={3}
              onClick={(e) => {
                handleFile("audio/");
              }}
            >
              <div className="store_Card">
                <div className="store_Card_top">
                  <div className="overviewItem_icon">
                    <img src={audio} alt="" />
                  </div>
                  <div className="card_name"> Audio </div>
                  <div className="card_file_quantity">{audioCount} files</div>

                  <div className="store_Card_bottom">
                    <div className="used_space">
                      {" "}
                      {formatBytes(audio_size)} used
                    </div>
                    <StorageProgress completed={audioPercentage} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={6}
              xs={3}
              onClick={(e) => {
                handleFile("video/");
              }}
            >
              <div className="store_Card">
                <div className="store_Card_top">
                  <div className="overviewItem_icon">
                    <img src={vedio} alt="" />
                  </div>
                  <div className="card_name"> Video </div>
                  <div className="card_file_quantity">{videoCount} files</div>

                  <div className="store_Card_bottom">
                    <div className="used_space">
                      {" "}
                      {formatBytes(video_size)} used
                    </div>
                    <StorageProgress completed={videoPercentage} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={6}
              xs={3}
              onClick={(e) => {
                handleFile("image/");
              }}
            >
              <div className="store_Card">
                <div className="store_Card_top">
                  <div className="overviewItem_icon">
                    <img src={picture} alt="" />
                  </div>
                  <div className="card_name"> Picture </div>
                  <div className="card_file_quantity">{photoCount} files</div>

                  <div className="store_Card_bottom">
                    <div className="used_space">
                      {" "}
                      {formatBytes(pictur_size)} used
                    </div>
                    <StorageProgress completed={picturePercentage} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={3}
              md={6}
              xs={3}
              onClick={(e) => {
                handleFile("application/");
              }}
            >
              <div className="store_Card">
                <div className="store_Card_top">
                  <div className="overviewItem_icon">
                    <img src={document} alt="" />
                  </div>
                  <div className="card_name"> Document </div>
                  <div className="card_file_quantity">{fileCount} files</div>

                  <div className="store_Card_bottom">
                    <div className="used_space">
                      {" "}
                      {formatBytes(file_size)} used
                    </div>
                    <StorageProgress completed={filePercentage} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="recent_files">
          <div className="recent_files_container">
            <div className="section_heading">
              <div className="heading_left">
                <h4> Recent Files</h4>
                <h6>You can see your recently updated thigs from here.</h6>
              </div>
              {/* <div className="heading_right">
                         View All 
                      </div> */}
            </div>

            {media
              .slice(Math.max(media.length - 5, 0))
              .reverse()
              .map((data, key) => {
                var mimeType = data.mime.split("/");
                const checkNames = data.collection_name.split("/");
                var options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                var today = new Date(data.created_at);
                var date = today.toLocaleDateString("en-US", options);
                if (checkNames[0] !== "recycle_bin") {
                  return (
                    <div className="recent_files_item" key={key}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item lg={4} md={5} sm={8} xs={10}>
                          <div className="item_title">
                            <div className="overviewItem_icon">
                              {mimeType[0] === "audio" && (
                                <img src={audioType} alt="" />
                              )}
                              {mimeType[0] === "video" && (
                                <img src={videoType} alt="" />
                              )}
                              {mimeType[0] === "application" && (
                                <img src={file} alt="" />
                              )}
                              {mimeType[0] === "image" && (
                                <img src={data.url} alt="" />
                              )}
                            </div>
                            <div className="item_title_name">
                              {data.name.length > 20 ? (
                                <>
                                  <span>
                                    {" "}
                                    {data.name.slice(0, 20)}
                                    {"..."}{" "}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span> {data.name} </span>
                                </>
                              )}

                              <div className="title_mob_date">{date}</div>
                            </div>
                          </div>
                        </Grid>
                        <Grid
                          item
                          lg={3}
                          xs={4}
                          className="d_responsive d_sm d_md"
                        >
                          <div className="item_text d_lg">{date}</div>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={3}
                          sm={3}
                          xs={2}
                          className="d_responsive"
                        >
                          <div className="item_text">
                            {formatBytes(data.size)}
                          </div>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={3}
                          xs={2}
                          className="d_responsive d_sm "
                        >
                          <div className="item_text">{data.mime}</div>
                        </Grid>
                        <Grid
                          item
                          lg={1}
                          md={1}
                          sm={1}
                          xs={2}
                          justifyContent="flex-end"
                        >
                          <div className="list_activity">
                            <PopupState
                              variant="popover"
                              popupId="demo-popup-menu"
                            >
                              {(popupState) => (
                                <React.Fragment>
                                  <div className="icoon">
                                    <MoreVertIcon
                                      {...bindTrigger(popupState)}
                                    />
                                  </div>
                                  <Menu
                                    {...bindMenu(popupState)}
                                    className="droper_menu"
                                  >
                                    <MenuItem
                                      className="droper_menu_item"
                                      onClick={(e) => {
                                        popupState.close();
                                        openInNewTab(data.url);
                                      }}
                                    >
                                      View File
                                    </MenuItem>
                                    <MenuItem
                                      onClick={(e) => {
                                        popupState.close();
                                        handleSentToMe(data.uuid);
                                      }}
                                      className="droper_menu_item"
                                    >
                                      Sent To Me
                                    </MenuItem>
                                    <MenuItem
                                      className="droper_menu_item"
                                      onClick={(e) => {
                                        popupState.close();
                                        handleSentToOther(data.uuid);
                                      }}
                                    >
                                      Sent To Other
                                    </MenuItem>
                                    <MenuItem
                                      className="droper_menu_item"
                                      onClick={(e) => {
                                        popupState.close();
                                        handleRemoveBin(
                                          data.uuid,
                                          data.collection_name
                                        );
                                      }}
                                    >
                                      {" "}
                                      Move to Bin
                                    </MenuItem>
                                  </Menu>
                                </React.Fragment>
                              )}
                            </PopupState>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default HomeBodyUserVaultContent;







// import { Box, Grid, Typography } from "@mui/material";
// import React, { Fragment, useState } from "react";
// import { ReactSession } from "react-client-session";
// import MainLoader from "../Loader/MainLoader";
// import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import activeIcon  from '../../asset/image/activeIcon.png'
// import inactiveIcon from '../../asset/image/inactiveIcon.png'


// const HomeBodyUserVaultContent = () => {
//   ReactSession.setStoreType("localStorage");
//   const navigate = useNavigate();
//   const localUuid = ReactSession.get("uuid");
//   const token = ReactSession.get("token");
//   const localData = ReactSession.get("data");
//   const [loaderShow, setLoaderShow] = useState("none");
  

//   return (
//     <Fragment>
//       <div className="HomeBodyContent">
//         <div className="home_top_content">
//           <Box display='flex' justifyContent='center' justifyItems='center'>
//               <Typography variant="h5">User's iVault Lists</Typography>
//             </Box>
//           <Grid sx={{mt:2}} container spacing={2}>
//             <Grid item lg={3} md={6} xs={3}>
//               <div className="store_Card active_vault">
//                 <div className="store_Card_top">
//                   <div className="overviewItem_icon">
//                     <img src={activeIcon} alt="" />
//                   </div>
//                   <div className="card_name"> Naeem iVault </div>
//                   {/* <div className="card_file_quantity">{audioCount} files</div> */}

//                   <div className="store_Card_bottom">
//                     <div className="used_space">
//                       Validity 03 Aug,2024
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Grid>
//             <Grid item lg={3} md={6} xs={3}>
//               <div className="store_Card">
//                 <div className="store_Card_top">
//                   <div className="overviewItem_icon">
//                     <img src={inactiveIcon} alt="" />
//                   </div>
//                   <div className="card_name"> Naeem iVault </div>
//                   {/* <div className="card_file_quantity">{audioCount} files</div> */}

//                   <div className="store_Card_bottom">
//                     <div className="used_space">
//                       Validity 03 Aug,2024
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Grid>
           
//           </Grid>
//         </div>
//         <Box sx={{ display: `${loaderShow}` }}>
//           <MainLoader />
//         </Box>
//       </div>
//       <ToastContainer />
//     </Fragment>
//   );
// };

// export default HomeBodyUserVaultContent;
