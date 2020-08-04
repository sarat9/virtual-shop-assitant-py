import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { uploadRecogImage } from './../../services/RecogService'

export default function SelectUpload(props) {
    // const [open, setOpen] = React.useState(false);
    const { open, handleClose, searchByImage } = props;
    const [selectedFile, setSelectedFile] = React.useState(null);


    function onFileChange(event){
        event.preventDefault()
       // Update the state 
       setSelectedFile(event.target.files[0])
    }

    function onFileUpload(){
        const fileblob = new Blob([selectedFile], { type: 'image/png' });// WORKS much better (if you know what MIME type you want.
        uploadRecogImage(fileblob).then(response=>{
            console.log(response)
            searchByImage(response.data)
        }).then(()=>{
            setTimeout(()=>{
                handleClose()
            },1000)
        })
    }

  
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Upload the file you wish to search..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        
                        <div>
                        {selectedFile&&<div> 
                            <h2>File Details:</h2> 
                            <p>File Name: {selectedFile.name}</p> 
                            <p>File Type: {selectedFile.type}</p> 
                            <p> 
                            Last Modified:{" "} 
                            {selectedFile.lastModifiedDate.toDateString()} 
                            </p> 
                        </div> }
                        <input type="file" onChange={onFileChange} />     
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={onFileUpload} color="primary" autoFocus>
                        Upload & Search
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}