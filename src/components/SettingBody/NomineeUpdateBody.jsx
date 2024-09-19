import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, Checkbox, FormControlLabel, Box,FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import axios from 'axios';
import { addNomineeUrl, baseUrl, userCheckUrl } from '../api/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import {ReactSession} from 'react-client-session'
import Loader from '../Loader/Loader';
function NomineeUpdateBody() {
    const [isValid, setIsValid] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState("none");
    const location = useLocation();
    const naviagte = useNavigate();
    const token = ReactSession.get('token')

    const [status, setStatus] = useState(location?.state?.status?location.state.status:0)
    const [registerFormData, setRegisterFormData] = useState({
        name:location?.state?.name?location.state.name:'',
        email: location?.state?.email?location.state.email:'',
        dob: location?.state?.dob?location.state.dob:'',
        phone:  location?.state?.phone?location.state.phone:'',
        relation: location?.state?.relation?location.state.relation:'',
        userid:location?.state?.user_id !==null?location.state.user_id:null,
        agree: false,
        privacyPolicy: false,
    });

    const handleRegisterChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setRegisterFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send registration request)
        handleAddNominee();
    };

    //handle add nominee
    const handleAddNominee =(userid)=>{
        setLoaderVisible(true)
        let data = new FormData();
        data.append('name', registerFormData.name);
        data.append('email', registerFormData.email);
        data.append('vault_id', ReactSession.get("id"));
        if(registerFormData.userid !==null){
            data.append('user_id', registerFormData.userid);
        }
        data.append('dob', registerFormData.dob);
        data.append('phone', registerFormData.phone);
        data.append('relation', registerFormData.relation);
        data.append('status', status);
        let config = {
            method: 'post',
            url: addNomineeUrl,
            data : data,
            headers: { 'Authorization': `Bearer ${token}`},
        };

        axios.request(config)
        .then((response) => {
            setLoaderVisible('none')
            // console.log('ressddd', response)
            naviagte('/setting')
        })
        .catch((error) => {
            setLoaderVisible('none')
        // console.log(error);
        });
    }


    const getSingleNomineeDetails = (uuid)=>{
        let config = {
            method: 'get',
            url: `${addNomineeUrl}/${uuid}`,
            headers: { 
              'Authorization': `Bearer ${token}`, 
            }
          };
          
          axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            // console.log(error);
          });
          
    }

    useEffect(()=>{
        if(location.state !==null){
            // getSingleNomineeDetails()
        }

    },[location])

    const handleChangeStaus = (event) => {
        setStatus(event.target.value)
      };

     

    return (
        <Container>
         <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" align="center">
                            Update Nominee Information
                        </Typography>
                        <form onSubmit={handleRegisterSubmit}>
                        <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                type="email"
                                value={registerFormData.email}
                                onChange={handleRegisterChange}
                                margin="normal"
                                focused
                                required
                            />
                            <TextField
                                label="Nominee Full Name"
                                variant="outlined"
                                fullWidth
                                name="name"
                                value={registerFormData.name}
                                onChange={handleRegisterChange}
                                margin="normal"
                                focused
                                required
                            />
                           
                            <TextField
                                label="DOB"
                                variant="outlined"
                                fullWidth
                                name="dob"
                                value={registerFormData.dob}
                                onChange={handleRegisterChange}
                                margin="normal"
                                type='date'
                                focused
                            />

                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                name="phone"
                                value={registerFormData.phone}
                                onChange={handleRegisterChange}
                                margin="normal"
                                focused
                            />
                            <TextField
                                label="Relation"
                                variant="outlined"
                                fullWidth
                                name="relation"
                                value={registerFormData.relation}
                                onChange={handleRegisterChange}
                                margin="normal"
                                focused
                            />

                        <FormControl fullWidth focused>
                                <Select
                                    value={status}
                                    onChange={handleChangeStaus}
                                >
                                <MenuItem value="1">Active</MenuItem>
                                <MenuItem value="0">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                           
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '10px' }}
                                disabled={!registerFormData.email || !registerFormData.name}
                                onClick={(e)=> handleRegisterSubmit(e)}
                            >
                                Update
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            
           
            <Box component="span" sx={{ display: `${loaderVisible}` }}>
                <Loader />
            </Box>
           
        </Container>
    );
}

export default NomineeUpdateBody;
