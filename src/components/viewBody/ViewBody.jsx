import React from "react";
import FileViewer from "react-file-viewer";
import logo from '' ;


const file = "./tesssst.pdf";
const type = "pdf";


const onError = e => {

};

const ViewBody = ()=>{
  
    return( 
        <>
          <FileViewer fileType={type} filePath={file} onError={onError} />
        </>
    )
    
}



export default ViewBody