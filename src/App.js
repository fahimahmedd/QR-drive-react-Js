import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import "../src/asset/css/style.css";
import "../src/asset/css/responsive.css";
import { ReactSession } from "react-client-session";
import axios from "axios";
import { vaultDetailsUrl } from "./components/api/Api";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { errorNotify } from "./components/Toast/Toast";
import useAutoLogout from "./useAutoLogout";
import { Box } from "@mui/material";

import { Provider } from "react-redux";
import { store } from "./store/store";


function App() {
  ReactSession.setStoreType("localStorage");
  const getUuid = ReactSession.get("uuid");
  const token = ReactSession.get("token");
  const micrositeId = ReactSession.get("micrositeId");
  const [getTimer, setGetTimer] = useState(600);
  

  useEffect(() => {
      const Url = window.location.href;
      var uuid = Url.split("/").pop();
      if (uuid && uuid.length>20) {
        axios.get(`${vaultDetailsUrl}/${uuid}`).then((res) => {
          ReactSession.set("uuid", uuid);
          ReactSession.set("micrositeId", res?.data?.microsite_id);
          const getUserId =   ReactSession.get("user_id");

          if (res.data.meta) {
            if (res.data.meta.hasOwnProperty("inactivity_timer")) {
              setGetTimer(res.data.meta.inactivity_timer);
            }
          }
          if(getUserId ===res.data.user_id){
            setTimeout(()=>{
              window.location.href = "/user-vault"
            },300)
          }else{
            ReactSession.set("user_id", res.data.user_id);
            setTimeout(()=>{
              window.location.href = "/pass-code"
            },300)
          }
          // window.location.href = "/";
        });
      } else if (micrositeId && uuid === "author-microsite") {
        window.location.href = "/author-microsite";
      }
  }, [getUuid, micrositeId]);

  // const timer = useAutoLogout(getTimer);
  var timer

  if (token && timer === 0) {
    // ReactSession.remove("data");
    // ReactSession.remove("token");
    // ReactSession.remove("uuid");
    // ReactSession.remove("user_id");
    // ReactSession.remove("id");
    // localStorage.clear();
    window.location.href = "/user-vault";
  }
  if (token && timer < 8) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        In {timer} seconds you will be automatically logged out
      </Box>
    );
  }

  return (
    <div>
        <Provider store={store}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
