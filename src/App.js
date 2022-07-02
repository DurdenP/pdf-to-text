import React, { useState } from "react";
import FileUploader from "./FileUploader";
import axios from "axios";

const App = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfText, setPdfText] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", 'file');
        formData.append("file", selectedFile.target.files[0]);
        axios
            .post('https://pdf-to-text-server.herokuapp.com/upload', formData)
            .then((res) => {
                console.log(setPdfText(res.data.data))
            })
            .catch((err) => alert("File Upload Error"));
    };

    return (
        <div className="App" >
            <div >
                <form onSubmit={submitForm}>
                    <FileUploader
                        onFileSelectSuccess={(event) => setSelectedFile(event)}
                    />
                    <button onClick={submitForm}>Submit</button>
                    {pdfText && <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>{pdfText}</div>}
                </form>
            </div>

        </div>
    );
};

export default App;