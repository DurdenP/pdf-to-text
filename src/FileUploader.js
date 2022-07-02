import React from 'react'

const FileUploader = ({onFileSelectSuccess}) => {
    const handleFileInput = (e) => {
        onFileSelectSuccess(e);
    };

    return(<div className="file-uploader">
        <input type="file" onChange={handleFileInput}></input>
    </div>)
    }

    export default FileUploader