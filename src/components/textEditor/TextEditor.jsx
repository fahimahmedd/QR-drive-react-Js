import React, { Fragment, useState } from 'react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 



const TextEditor = () => {
    const[editorValue,setEditorValue] = useState()
    const handleEditorChange = (content) => {
        setEditorValue(content)
      };
    
  return (
    <Fragment>
      <SunEditor
           id='catDetails'
           name="details"
           showToolbar={true} 
           setDefaultStyle="height: 400px"
           onChange={handleEditorChange}
           setOptions={{
           buttonList: [
             [
               "undo",
               "redo",
               "font",
               "fontSize",
               "formatBlock",
               "paragraphStyle",
               "blockquote",
               "bold",
               "underline",
               "italic",
               "strike",
               "subscript",
               "superscript",
               "fontColor",
               "hiliteColor",
               "textStyle",
               "removeFormat",
               "outdent",
               "indent",
               "align",
               "horizontalRule",
               "list",
               "lineHeight",
               "table",
               "link",
               "image",
               "video",
               "audio", 
               "imageGallery",
               "fullScreen",
               "showBlocks",
               "codeView",
               "preview",
               "print",
               "save",
               "template"
             ]
           ]
           }}/>
   </Fragment>
  )
}

export default TextEditor