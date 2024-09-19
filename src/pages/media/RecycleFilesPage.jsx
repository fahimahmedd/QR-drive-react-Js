import React from "react";
import Header from "../../components/header/Header";
import LeftSideBar from "../../components/Sidebar/LeftSideBar";
import MyRecycleFilesBody from "../../components/media/myFilesRecyclebinBody/MyRecycleFilesBody";
import Uploader from "../../components/media/Uploader";
import { ReactSession } from "react-client-session";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileBottomTab from "../../components/mobileBottomTab/MobileBottomTab";
const MyRecycleFilesPage = () => {
  ReactSession.setStoreType("localStorage");

  if (ReactSession.get("token")) {
    return (
      <>
        <MobileHeader />
        <MobileBottomTab />
        <Header />
        <LeftSideBar />
        <div className="myfile_page_body_content">
          <MyRecycleFilesBody />
        </div>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
};
export default MyRecycleFilesPage;
