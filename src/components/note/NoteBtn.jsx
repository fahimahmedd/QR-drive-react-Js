import React from "react";
import { Link } from "react-router-dom";
import note from '../../asset/image/notee.png' 

const NoteBtn = ()=>{
    return(
       <>
       <Link to="/note-edit">
          <div className="noteAdd">
               <div className="notebtn_wrap">
                   <div className="note_img">
                       <img src={note} alt="" />
                   </div>
                   <h4>Add Note</h4>
               </div>
           </div>
       </Link>
       </>
    )
}

export default NoteBtn