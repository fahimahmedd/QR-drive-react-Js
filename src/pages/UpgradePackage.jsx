import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import UpgradeCard from "../components/UpgradeStorage/UpgradeCard";
import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
const UpgradePackage = () => {
  ReactSession.setStoreType("localStorage");
  const micrositeId = ReactSession.get("micrositeId");
  const location = useLocation();
  const navigate = useNavigate()

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


  // Upgradce storage
  const storageOptions = [10, 15, 20,25];



  const [selectedStorage, setSelectedStorage] = React.useState('');
  const [customStorage, setCustomStorage] = React.useState('');


  const handleCustomInputChange = (event) => {
    setCustomStorage(event.target.value);
  };

  const handleSelectCustomStorage = async(selectedStorage) => {
    // Implement your logic when a storage option is selected
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
       navigate('/subscription-payment',{state:{storage:selectedStorage}})
      } 
    });
  };

  const handleSelectCustom = () => {
    const selectedValue = customStorage !== '' ? parseInt(customStorage, 10) : selectedStorage;
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
       navigate('/subscription-payment',{state:{storage:selectedValue}})
      } 
    });
  };




  if (ReactSession.get("token")) {
    return (
      <>
        <UserVaultMobileHeader allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        <Header />
        {/* <LeftSideBar /> */}
        <UserVaultLeftSideBar allVaultLists={allVaultLists} activeItem={activeItem} setActiveItem={setActiveItem} />
        <RightSideBar media={media} />
        <div className="home_page_body_content">
          {advertisements && advertisements.length > 0 && (
            <CompanyBanner advertisements={advertisements} />
          )}
        <Box sx={{mt:2}} display={'flex'} justifyContent={'center'} justifyItems={'center'}>
          <h3>Upgrade Package (Per 5GB (120TK/1$)/Year) </h3>
        </Box>

        <Grid container>
           {storageOptions.map((storage) => (
             <Grid item key={storage} xs={12} sm={4} md={3}>
               <UpgradeCard 
                  storage={storage} 
                  onSelect={handleSelectCustomStorage} 
                />
             </Grid>
           ))}
          </Grid>

      {/* custom package */}
        <Grid container spacing={1}>
             <Grid item  xs={8} sm={18} md={8}>
                <Card sx={{m:1.5}}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Upgrade Package (Custom)
                    </Typography>
                    {/* <FormControl sx={{mt:3}} fullWidth>
                      <InputLabel id="storage-select-label">Choose storage</InputLabel>
                      <Select
                        labelId="storage-select-label"
                        id="storage-select"
                        value={selectedStorage}
                        onChange={handleSelectCustomChange}
                        label='Choose storage'
                        variant="outlined"
                      >
                        <MenuItem value="" disabled>Select storage</MenuItem>
                        {storageOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option} GB
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                    <TextField
                      sx={{mt:3}}
                      id="custom-storage-input"
                      label="Custom storage (GB)"
                      variant="outlined"
                      fullWidth
                      value={customStorage}
                      onChange={handleCustomInputChange}
                    />
                  </CardContent>
                  <CardActions 
                      sx={{
                        display:'flex',
                        justifyContent:'center',
                        justifyItems:'center'
                      }}
                    >

                      {customStorage?
                       <Button variant="contained" color="primary" onClick={handleSelectCustom}>
                          Select
                        </Button>:
                      <Button variant="contained" color="primary" disabled>
                        Select
                      </Button>
                    }
                  </CardActions>
                </Card>
             </Grid>
        </Grid>
         
        </div>
        <ToastContainer />
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default UpgradePackage;

