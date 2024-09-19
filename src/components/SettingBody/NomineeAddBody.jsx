import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';
import { addNomineeUrl, baseUrl, userCheckUrl } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import {ReactSession} from 'react-client-session'
import Loader from '../Loader/Loader';
import { errorNotify, successNotify } from '../Toast/Toast';
import { ToastContainer } from 'react-toastify';
function NomineeAddBody() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState("none");

    const naviagte = useNavigate();
    const token = ReactSession.get('token')

    const [nomineeInfo, setNomineeInfo] = useState({
        memberId:'',
        name: '',
        username: '',
        avatar:'',
        mobile: '',
    });

    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: email,
        dob: '',
        phone: '',
        relation: '',
        status:1,
        agree: false,
        privacyPolicy: false,
    });
    const [showGrid, setShowGrid] = useState({
        checkEmail: true,
        register: false,
        join: false
    });

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        // Basic email validation (you can implement your own validation logic)
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setIsValid(isValidEmail);
    };

    const handleCheckEmail = (e) => {
        e.preventDefault();
        setLoaderVisible(true)
        // Handle checking the email here (e.g., send a request to your server)
        if (isValid) {
            // alert(`Checking email: ${email}`);
                  axios.post(userCheckUrl,{
                    email:email
                  }).then((response)=>{
                    setLoaderVisible('none')
                    if(response.data.length>0){
                        setNomineeInfo({
                            memberId:response.data[0].id,
                            name: response.data[0].name,
                            username: response.data[0].username,
                            avatar: response.data[0].avatar,
                            mobile: response?.data[0]?.meta?.mobile,
                          });
                        setShowGrid({
                            checkEmail: false,
                            register: false,
                            join: true
                        })
                        
                }else{
                    setRegisterFormData({
                        email:email
                    })
                    setShowGrid({
                        checkEmail: false,
                        register: true,
                        join: false
                    })
                   
                }
            }).catch((err)=>{})
        }else {
            errorNotify('Invalid email');
            setLoaderVisible('none')
        }
    };


    
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
        // console.log('Form data submitted:', registerFormData);
        handleAddNominee();
    };


    //handle add nominee
    const handleAddNominee =()=>{
        setLoaderVisible(true)
        let data = new FormData();
        data.append('name', registerFormData.name);
        data.append('email', registerFormData.email);
        data.append('vault_id', ReactSession.get("id"));
        if(nomineeInfo.memberId){
            data.append('user_id', nomineeInfo.memberId);
        }
        data.append('dob', registerFormData.dob);
        data.append('phone', registerFormData.phone);
        data.append('relation', registerFormData.relation);
        data.append('status', 1);

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
            successNotify('Nominee Added Successfully!')
            setTimeout(()=>{
                naviagte('/user-vault')
            },[2000])
            
        })
        .catch((error) => {
            setLoaderVisible('none')
        });
    }
   
    const handleAddNomineeExist =()=>{
        setLoaderVisible(true)
        let data = new FormData();
        data.append('name', nomineeInfo.name);
        data.append('email', email);
        data.append('vault_id', ReactSession.get("id"));
        if(nomineeInfo.memberId){
            data.append('user_id', nomineeInfo.memberId);
        }
        data.append('phone', registerFormData.mobile);
        data.append('status', 1);

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
            successNotify('Nominee Added Successfully!')
            setTimeout(()=>{
                naviagte('/user-vault')
            },[2000])
            
        })
        .catch((error) => {
            setLoaderVisible('none')
        });
    }
   

    return (
        <Container>

            {showGrid.checkEmail ===true && <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ height: '90vh' }}
            >
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" align="center">
                            Add Nominee
                        </Typography>
                        <form onSubmit={handleCheckEmail}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleCheckEmail}
                            disabled={!isValid}
                            style={{ marginTop: '10px' }}
                        >
                            Check Email
                        </Button>
                        </form>
                    </Paper>
                    <Box sx={{mt:5}} display='flex' justifyContent='center' justifyItems='center'>
                        <Button onClick={(e)=> naviagte('/user-vault')}>Skip</Button>
                    </Box>
                </Grid>
              
            </Grid>}

            {showGrid.register ===true && <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h5" align="center">
                            Add Nominee
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
                            
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        name="agree"
                                        checked={registerFormData.agree}
                                        onChange={handleRegisterChange}
                                    />
                                }
                                label="Acknowledge that I agree for an iCircles account.(*)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="privacyPolicy"
                                        checked={registerFormData.privacyPolicy}
                                        onChange={handleRegisterChange}
                                    />
                                }
                                label="I agree to the terms & conditions and privacy policy.(*)"
                            /> */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '10px' }}
                                disabled={!registerFormData.email || !registerFormData.name}
                                onClick={(e)=> handleRegisterSubmit(e)}
                            >
                                Add Now
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>}
            
            {showGrid.join ===true &&  <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <form onSubmit={handleAddNominee} >
                            <div className="coverImg">
                                <img src={`${baseUrl}/${nomineeInfo.avatar}`} alt={''} />
                            </div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Box className="loginInput_filed" >
                                        <TextField label="E-mail" variant="filled" fullWidth focused value={email} disabled />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className="loginInput_filed" >
                                        <TextField label="Name" variant="filled" fullWidth focused value={nomineeInfo.name} disabled/>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className="loginInput_filed" >
                                        <TextField label="Username" variant="filled" fullWidth focused value={nomineeInfo.username} disabled />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className="loginInput_filed">
                                        <TextField label="Mobile" variant="filled" fullWidth focused value={nomineeInfo.mobile} disabled />
                                    </Box>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <div className="agrrementCheq">
                                        <input type="checkbox" className="chequeB" /> Agree with terms and policy.
                                    </div>
                                </Grid> */}


                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    <Button className='get_emailBtn' variant='contained' onClick={(e)=> handleAddNomineeExist()}> Add Nominee </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>}

            <Box component="span" sx={{ display: `${loaderVisible}` }}>
                <Loader />
            </Box>

            <ToastContainer />
           
        </Container>
    );
}

export default NomineeAddBody;
