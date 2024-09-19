import React, { Fragment } from 'react'
import JournalEditorRight from './JournalEditorRight'


const JournalEditroBody = () => {
  return (
    <Fragment>
        <div className="journal_editor_fixed_sidebar">
            <JournalEditorRight/>
            {/* <JournalEditorLeftBar/> */}
            
        </div>
    </Fragment>
  )
}

export default JournalEditroBody