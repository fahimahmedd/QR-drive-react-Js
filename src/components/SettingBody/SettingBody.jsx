import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { addNomineeUrl, createVoltUrl, updateVoltUrl, vaultDetailsUrl } from "../api/Api";
import { ReactSession } from "react-client-session";
import MainLoader from "../Loader/MainLoader";
import { ToastContainer } from "react-toastify";
import { errorNotify, successNotify } from "../Toast/Toast";
import InfoIcon from '@mui/icons-material/Info';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SettingBody = () => {
  ReactSession.setStoreType("localStorage");
  const localUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const localData = ReactSession.get("data");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [settingData, setSettingData] = useState({});


  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  const [vaultName, setVaultName] = useState("");
  const [vaultPassCode, setVaultPassCode] = useState("");
  const [vaultPassConfCode, setVaultConfPassCode] = useState("");
  const [valultDescription, setVaultDescription] = useState("");
  const [valultNomineeDescription, setVaultNomineeDescription] = useState("");
  const [vaultValidity, setVaultValidity] = useState("");
  const [loaderShow, setLoaderShow] = useState("none");
  const [userId, setUserId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [timer, setTimer] = useState(600);

  const url = `${vaultDetailsUrl}/${localUuid}`;
  useEffect(() => {
    var config = {
      method: "get",
      url: url,
    };

    axios(config)
      .then(function (res) {
        setVaultName(res.data.name);
        setVaultDescription(res.data.details);
        setUserId(res.data.user.id);
        setPaymentId(res.data.payment_id);
        setVaultValidity(res.data.validity);
        setSettingData(res.data);
        if (res.data.meta) {
          if (res.data.meta.hasOwnProperty("inactivity_timer")) {
            setTimer(res.data.meta.inactivity_timer);
          }
        }
        if (res.data.meta) {
          setVaultNomineeDescription(res.data.meta.nominee);
        }
      })
      .catch(function (error) { });
  }, [url]);

  const handleUpdateVault = () => {
    setLoaderShow("block");
    var formData = new FormData();
    formData.append("name", vaultName);
    formData.append("details", valultDescription);
    formData.append("user_id", userId);
    formData.append("payment_id", paymentId);
    formData.append("status", "1");
    formData.append("nominee", valultNomineeDescription);
    formData.append("validity", vaultValidity);
    formData.append("inactivity_timer", timer);
    if (vaultPassCode) {
      formData.append("pass_code", vaultPassCode);
    }
    var config = {
      method: "post",
      url: `${updateVoltUrl}/${ReactSession.get("uuid")}`,
      headers: {
        Authorization: `Bearer ${token} `,
      },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        setLoaderShow("none");
        successNotify("Updated successfully", 5000);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(function (error) {
        setLoaderShow("none");
      });
  };

  const handleTimerSet = (e) => {
    setTimer(e.target.value);
    // if (e.target.value > 0) {
    //   setTimer(e.target.value);
    // } else errorNotify("Timer value must greater than 0 sec");
  };


  const [nominees, setNominees] = useState([]);

  const handleActionChange = (nominee,id, action) => {
    // console.log(`Selected action ${action} for nominee with ID ${id}`);
    if(action ==='edit'){
      navigate('/setting-nominee-update', {state:nominee})
    }
    if(action ==='reject'){

    }

  };

  // get all  nominee information
  const getAllNominee = ()=>{
    setLoaderShow("block");
      let config = {
        method: 'get',
        url: `${addNomineeUrl}?vault_id=${ReactSession.get("id")}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        }
      };

      axios.request(config)
      .then((response) => {
        setLoaderShow("none");
        if(response?.data){
          setNominees(response.data)
        }
      })
      .catch((error) => {
        setLoaderShow("none");
      });

  }

  useEffect(()=>{
    if(ReactSession.get("id")){
      getAllNominee()
    }
  },[])

  //handle delete nominee
  const handleDelete = (uuid) => {
    var config = {
      method: "delete",
      url: `${addNomineeUrl}/${uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
            successNotify("Deleted successfully", 2000);
            getAllNominee()
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
  

  return (
    <>
      <div className="setting_body">
        <div className="setting_container">
          <h4>
            {" "}
            iVault Setting <SettingsIcon />
          </h4>
          <div className="vault_info">
            <h5>iVault Details Update</h5>
            <TextField
              id="filled-basic-v-name"
              label="iVault Name"
              variant="filled"
              required
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
            />
            <TextField
              id="filled-basic-v-description"
              label="iVault Description"
              multiline
              rows={3}
              variant="filled"
              required
              onChange={(e) => setVaultDescription(e.target.value)}
              value={valultDescription}
            />
            {/* <TextField
              id="filled-basic-v-nominee-description"
              multiline
              rows={3}
              label="iVault Nominee Details"
              variant="filled"
              required
              onChange={(e) => setVaultNomineeDescription(e.target.value)}
              value={valultNomineeDescription}
            /> */}

            {vaultName && valultDescription ? (
              <>
                <Button
                  className="vault_save_btn"
                  variant="contained"
                  onClick={handleUpdateVault}
                >
                  Save Change
                </Button>
              </>
            ) : (
              <>
                <Button className="vault_save_btn" variant="contained" disabled>
                  Save Change
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="setting_container respons_margin">
          <div className="vault_info">
            <h5>iVault Auto Logout Setting(e.g: 10mins=600s)</h5>
            <FormControl variant="filled">
              <Input
                value={timer}
                onChange={(e) => handleTimerSet(e)}
                className=" pass_input_field "
                id="standard-adornment-password"
                type="number"
              />
            </FormControl>

            {timer != "" ? (
              <>
                <Button
                  className="vault_save_btn"
                  variant="contained"
                  onClick={handleUpdateVault}
                >
                  Save Change
                </Button>
              </>
            ) : (
              <>
                <Button className="vault_save_btn" variant="contained" disabled>
                  Save Change
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="setting_container respons_margin">
          <div className="vault_info">
            <h5>iVault Passcode Setting</h5>
            <FormControl variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                iVault New Passcode
              </InputLabel>
              <Input
                onChange={(e) => setVaultPassCode(e.target.value)}
                className=" pass_input_field "
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm New Vault Passcode
              </InputLabel>
              <Input
                onChange={(e) => setVaultConfPassCode(e.target.value)}
                className=" pass_input_field "
                id="standard-adornment-password"
                type={showConfPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfPassword}
                    >
                      {showConfPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {vaultPassCode != "" && vaultPassCode === vaultPassConfCode ? (
              <>
                <Button
                  className="vault_save_btn"
                  variant="contained"
                  onClick={handleUpdateVault}
                >
                  Save Change
                </Button>
              </>
            ) : (
              <>
                <Button className="vault_save_btn" variant="contained" disabled>
                  Save Change
                </Button>
              </>
            )}
          </div>
        </div>

        {/* set Nominee information */}
        <div className="setting_container">
          <div className="vault_info">

            <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
              <h5>Nominee Information </h5>
              <Button variant="contained" onClick={(e) => navigate('/setting-nominee-add')}>Add Nominee</Button>
            </Box>
            {/* <Box>
              <div className="table_info">
                  <div className="table_heading">
                     <Grid container spacing={2}>
                        <Grid item xs={3}>
                           <div className="heading_item">
                              Name
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="heading_item">
                             Email
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="heading_item">
                              Phone
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="heading_item">
                              Action
                           </div>
                        </Grid>
                     </Grid>
                  </div>
                  <div className="table_content">
                     <Grid container spacing={2}>
                        <Grid item xs={3}>
                           <div className="content_item">
                              SHahin Alam
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="content_item">
                             Email@info.com
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="content_item">
                              012536563232
                           </div>
                        </Grid>
                        <Grid item xs={3}>
                        <div className="content_item">
                              Action
                           </div>
                        </Grid>
                     </Grid>
                  </div>
              </div>
            <table>
              <tbody>
                {nominees.map((nominee) => (
                  <tr key={nominee.id}>
                    <td>{nominee.name}</td>
                    <td>{nominee.email}</td>
                    <td>{nominee.phone}</td>
                    <td>
                      <select
                        onChange={(e) => handleActionChange(nominee.id, e.target.value)}
                      >
                        <option value="">Select Action</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                        <option value="edit">Edit</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </Box> */}
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          {/* <TableCell>Phone</TableCell> */}
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {nominees && nominees.map((nominee) => (
                          <TableRow key={nominee.id}>
                            <TableCell>{nominee.name}</TableCell>
                            <TableCell>{nominee.email}</TableCell>
                            {/* <TableCell>{nominee.phone}</TableCell> */}
                            {/* <TableCell>{nominee?.status ===1?'Active':'Inactive'}</TableCell> */}
                            {nominee?.status ===1 &&<TableCell>Active</TableCell>}
                            {nominee?.status ===0 &&<TableCell>Sent Invitation</TableCell>}
                            <TableCell>
                              <Select
                                value=""
                                onChange={(e) => handleActionChange(nominee, nominee.id, e.target.value)}
                              >
                                <MenuItem value="edit">Edit</MenuItem>
                                <MenuItem value="reject" onClick={(e)=> handleDelete(nominee.uuid)}>Delete</MenuItem>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>

        <Box sx={{ display: `${loaderShow}` }}>
          <MainLoader />
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default SettingBody;
