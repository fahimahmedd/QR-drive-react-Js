import { Button } from '@mui/material'
import React, { Fragment } from 'react'
import AddIcon from '@mui/icons-material/Add';
import JournalListItem from './JournalListItem';
import { useLocation } from 'react-router-dom';
import parser from 'html-react-parser'
const JournalEditorLeftBar = React.forwardRef((props, ref)=>{
  const location =useLocation()
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(location.state.data.created_at);
  var createDate = today.toLocaleDateString("en-US", options);
  return (
    <Fragment>
         <div className="Journal_left_Bar" ref={ref}>
             <h4> My Withness  </h4>
             {(location.state.data.witness.length>0) && location.state.data.witness.map((data,key)=>{
              return(
                <div className="journal_item_list_container" key={key}>
                    <div className="journal_list_item">
                    <div className="journal_creat_date">
                        {createDate}
                    </div>
                    <div className="journal_Title">
                        {data.name}
                    </div>
                    <div className="journal_Title">
                       {data.email}
                    </div>
                    <div className="journal_text">
                       {parser(data.details)}
                    </div>
                  </div>
              </div>
              )
             })}
         </div>
    </Fragment>
  )
})

export default JournalEditorLeftBar