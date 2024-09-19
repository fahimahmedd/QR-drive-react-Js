import React from "react";
import {  Puff, ThreeCircles } from "react-loader-spinner";
import logo from '../../asset/image/logo.png' 

const Loader = ()=>{
    return(
        // <div className="circleLoader">
        //  <ThreeCircles
        //     height="100"
        //     width="100" 
        //     color="#fff"
        //     wrapperStyle={{}}
        //     wrapperClass=""
        //     visible={true}
        //     ariaLabel="three-circles-rotating"
        //     outerCircleColor=""
        //     innerCircleColor=""
        //     middleCircleColor=""
        //   />
        // </div>
        <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-img">
                <img src={logo} alt="" />
            </div>
       </div>
     
    )
}

export default Loader