import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../asset/image/one.png' 

const AuthenticationGraphix = ({showValue}) => {
  return (
    <Fragment>
         <div className="AuthenticationGraphix">
             <div className="side_show_image" >
                <div className="small_img"><img src={img1} alt="" /></div>
             </div>
             {(showValue>0) && <Link className='purchase_btn' to='/new-user-email-check'><Button variant="outlined"  >Purchase Now</Button></Link>}
             <div className="content_one">
                 <h4> Save your documents, photos, and videos in the iVault. </h4>
             </div>
         </div>
    </Fragment>
  )
}

export default AuthenticationGraphix