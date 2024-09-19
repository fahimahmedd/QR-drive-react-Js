import {  Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { errorNotify } from '../../Toast/Toast';
import { baseUrl, folderUrl } from '../../api/Api';
import {ReactSession} from 'react-client-session'
import { imageTitleDetailsVerticle } from '../../../effects/imageTitleDetailsVerticle';
import { useNavigate } from 'react-router-dom';
import MyRecycleItem2 from './MyRecycleItem2';
import MyRecycleItem from './MyRecycleItem';
const MyRecycleFilesBody = (props) => {
   ReactSession.setStoreType("localStorage");
   const navigate = useNavigate()
   const[media,setMedia] = useState([]);
   const[collectionName,setCollectionName] = useState([])
   const[highLength,setHighLength] = useState()
   const[searchValue,setSearchValue] = useState('')
   const[apiData,setApiData] = useState()
   const uuid = ReactSession.get('uuid');
   const token = ReactSession.get('token')
   const url = `${folderUrl}/${uuid}`
   useEffect(()=>{
      var config = {
         method: 'get',
         url: url,
         headers: { 
           'Authorization': `Bearer ${token}`, 
         }
       };
       axios(config)
       .then(function (res) {
         setApiData(res.data)
         setMedia(res.data.media)
       })
       .catch(function (error) {
         // errorNotify('Invalid api')
       });

   },[])

   useEffect(()=>{

      let ObjMap = [];
            let collection_name = [];
            if (media.length > 0) {
                media.forEach(element => {
                    var makeKey = element.collection_name;
                    collection_name.push(element.collection_name)
                    if (!ObjMap[makeKey]) {
                        ObjMap[makeKey] = [];
                    }

                    ObjMap[makeKey].push({
                        name: element.name,
                        file_name: element.file_name,
                        size: element.size,
                        created_at: element.created_at,
                        custom_properties: element.custom_properties
                    });
                });

            }
            collection_name = Array.from(new Set(collection_name))
            let heighest_depth = 0;
            let folders = [];
            setCollectionName(collection_name)
            collection_name.forEach(element => {
                folders = element.split('/')
                if (folders.length > heighest_depth) heighest_depth = folders.length
                
            })
            setHighLength(heighest_depth)
   },[media])

   let folders =[];
    
   const handleFolderData = (cName,position,folderName)=>{
      navigate('/files-recycle/name',{
         state: {
           collectionName:cName,
           position:position,
           folderName:folderName
         }
       })
      
   }

   const handleSearch = (e)=>{
      
      if(e.key === 'Enter') { 
          e.preventDefault()
          let toSearch = e.target.value; //Will check if title have text 'search'
          let result = media.filter(o => o.collection_name.includes(toSearch) || o.name.includes(toSearch));
          if(result){
            setMedia(result)
          }
         }
  }

    if(media.length>0){
      return (
         <Fragment>
           <div className="my_files_body recycle_body">
            <div className="files_body_content">
               <Grid container spacing={2}>
                 {(collectionName.length>0) && collectionName.map((data,key)=>{ 
                  
                     var URL=data;
                     var arr=URL.split('/'); 
                     
                     var secondFolder = ''
                     secondFolder = arr[2]
                     let recycleBin = arr[0]
                     if(secondFolder !== undefined && folders.indexOf(secondFolder) === -1 && recycleBin ==='recycle_bin'){ 
                         
                        folders.push(secondFolder)  
                       return(
                          <Grid item xs={6} sm={4} md={3} lg={2} key={key} >
                              <MyRecycleItem name="Lemmesay Images" icon="folder" data={data} date={data.created_at} onClick={(e)=>{handleFolderData(data,3,secondFolder)}}  />
                          </Grid>
                          )
                     }
                 })}
                </Grid>
              <div className="File_areas">
                 <Grid container spacing={2} columns={18}>
                 {(media) && media.map((data,key)=>{  
                    if(data.collection_name === 'recycle_bin/'+apiData.user.username){
                       return(
                          <Grid item xs={9} sm={4} md={4} lg={3} xl={2} key={key}>
                             <MyRecycleItem2 name="iCircles Images" getData={data}/>
                          </Grid>
                          )
                     }
                 })}
                 </Grid>
              </div>
            </div>
           </div>
         </Fragment>
       )
    }else{
      return(
         <div className="my_files_body recycle_body">
         {/* <div className="my_files_navigate">
            <div className="navigate_part_one">
                 <div className="navigate_bar_icon">
                    <DashboardIcon/>
                 </div>
                 <div className="navigate_title">
                    My Files
                 </div>
                 <div className="navigate_bar_icon">
                  <KeyboardArrowRightIcon/>
                 </div>
            </div>
            <div className="navigate_part_two">
                  <div className="navigate_serachbar">
                       <input onChange={(e)=>setSearchValue(e.target.value)} onKeyPress={handleSearch} type="text" className="form_control"  placeholder=' Search'/>
                  </div>
            </div>
         </div> */}
         <div className="files_body_content">
           <Grid container spacing={2}>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
               <Grid item xs={6} sm={4} md={3} lg={2} >{ imageTitleDetailsVerticle()}</Grid>
            </Grid>
         </div>
       </div>
      )
    }
 
}

export default MyRecycleFilesBody