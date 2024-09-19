import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const JournalSaveItem = () => {
  return (
    <Fragment>
        <div className="Journal_Save_Item"> 
            <div className="journal_Title">
                Mirpur Apartment Avidance
             </div>
             <div className="journal_creat_date">
                 12 December 2022
             </div>
             <div className="journal_text">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, itaque? </p>
             </div>
          </div>
    </Fragment>
  )
}

export default JournalSaveItem