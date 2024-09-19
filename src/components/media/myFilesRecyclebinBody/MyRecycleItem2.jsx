import React, { Fragment, useState } from "react";
import file from "../../../asset/image/file.png";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem } from "@mui/material";
import {ReactSession} from 'react-client-session'
import { deleteMediaUrl, editMediaUrl, sentEmailUrl } from "../../api/Api";
import { errorNotify, successNotify } from "../../Toast/Toast";
import axios from "axios";
import MainLoader from "../../Loader/MainLoader";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

import docImage from '../../../asset/image/docx.png'
import xlsxImage from '../../../asset/image/xlsx.png'
import audioImage from '../../../asset/image/audio.jpeg'
import pdfImage from '../../../asset/image/pdf.png'
import { Image } from "antd";

const MyRecycleItem2 = ({ getData }) => {
  ReactSession.setStoreType("localStorage");
  const localUuid = ReactSession.get('uuid');
  const token = ReactSession.get('token')
  const localData = ReactSession.get('data')
  const [loaderShow,setLoaderShow] = useState('none')

  var URL = getData.collection_name;
  var arr = URL.split("/");
  var folderName = "";
  folderName = arr[1];

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(getData.created_at);
  var date = today.toLocaleDateString("en-US", options);




  const handleRemoveBin = (uuid,collectionName) => {
    var valueName = collectionName.replace("recycle_bin/", "");
    var data = new FormData();
    data.append('folder_name', valueName);

    var config = {
      method: 'post',
      url: `${editMediaUrl}/${uuid}/${localUuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      setLoaderShow('block')
      if (result.isConfirmed) {
        axios(config)
        .then(function (response) {
        setLoaderShow('none')
        successNotify('Restored successfully', 5000)  
        setTimeout(()=>{
          window.location.reload()
        },3000)
        })
        .catch(function (error) {
          errorNotify('Something went wrong!. Please try again',5000)
         setLoaderShow('none')
        });
        
      }else{
        setLoaderShow('none')
      }
    })
  };
  const handleDelete = (uuid,collectionName) => {
    var config = {
      method: 'delete',
      url: `${deleteMediaUrl}/${uuid}/${localUuid}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      setLoaderShow('block')
      if (result.isConfirmed) {
        axios(config)
        .then(function (response) {
         
          setLoaderShow('none')
          successNotify('File permanently deleted',2000)
          setTimeout((e)=>{
            window.location.reload()
          },2000)
        })
        .catch(function (error) {
          setLoaderShow('none')
          errorNotify('Something went wrong!. Please try again',5000)
        });
        
      }else{
        setLoaderShow('none')
      }
    })
  };


  return (
    <Fragment>
      <div className="my_file_item">
        <div className="item_icon">
        {(getData?.mime ==='image/png' 
            || getData?.mime ==='image/jpg' 
            || getData?.mime ==='image/jpeg'
            || getData?.mime ==='image/gif'
            || getData?.mime ==='image/webp') &&
            <Image
              width={200}
              src={getData.url}
            />
          }
          {(getData?.mime ==='video/mp4' 
            || getData?.mime ==='video/mov' 
            || getData?.mime ==='image/mkv') &&
            <video src={getData.url}  width={'100%'} autoPlay controls></video>
          }
         
         {(getData?.mime ==='application/pdf') &&
            <img src={pdfImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/msword') &&
            <img src={docImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='application/vnd.ms-excel') &&
            <img src={xlsxImage}  width={'100%'}></img>
          }
         {(getData?.mime ==='audio/mpeg') &&
            <img src={audioImage}  width={'100%'}></img>
          }
        </div>
        <div className="File_list_activity">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div className="icoon">
                    <MoreVertIcon {...bindTrigger(popupState)} />
                  </div>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                        className="droper_menu_item"
                        onClick={(e) => {
                        popupState.close();
                        handleRemoveBin(getData.uuid,getData.collection_name);
                      }}
                      > Restore File</MenuItem>
                       
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        <div className="item_name"> {(getData.name.length>25)?<>
                <span> {getData.name.slice(0, 25)}{'...'} </span>
             </>:<>
             <span> {getData.name} </span>
             </>}</div>
        <div className="my_item_bootom">
          <div className="uploaded_date">
            {date}
            {/* <span>({formatBytes(getData.size)})</span>{" "} */}
            <span> </span>
          </div>
        </div>
        <Box sx={{display:`${loaderShow}`}}>
          <MainLoader />
        </Box>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default MyRecycleItem2;
