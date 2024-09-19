import React, { Fragment } from 'react'

const JournalListItem = () => {
  return (
    <Fragment>
        <div className="journal_list_item">
             <div className="journal_creat_date">
                 12 December 2022
             </div>
             <div className="journal_Title">
                Mirpur Apartment Avidance
             </div>
             <div className="journal_text">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
             </div>
        </div>
    </Fragment>
  )
}

export default JournalListItem