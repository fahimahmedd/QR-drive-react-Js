import React from 'react'
import Header from '../components/header/Header'
import LeftSideBar from '../components/Sidebar/LeftSideBar'
import MobileBottomTab from '../components/mobileBottomTab/MobileBottomTab'
import MobileHeader from '../components/mobileHeader/MobileHeader'
import NoteBody from '../components/note/NoteBody'

const NotesPage = () =>{
  
  
    return (
      <> 
        <MobileHeader/>
        <MobileBottomTab/>
        <Header/>
        <LeftSideBar/>
         <div className="note_page_body_content">
           <NoteBody/>
        </div>
     </> 
    )
}
export default NotesPage