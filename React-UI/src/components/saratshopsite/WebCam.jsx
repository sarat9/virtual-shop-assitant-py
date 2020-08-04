import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { uploadRecogImage } from './../../services/RecogService'

export default function WebCam(props) {
    const { open, handleClose, searchByImage } = props;
    const [videoSrcData, setVideoSrcData] = React.useState(null);

    const videoEl = useRef(null)
    const streamRef = useRef(null)

    function captureImage() {
        if(props.isAddFrnd){
            return
        }
        let mediaStreamTrack = streamRef.current.getTracks()[0]
        let imageCapture = new ImageCapture(mediaStreamTrack);
        console.log(imageCapture);
        recognizeImage(imageCapture)
        // downloadImage(imageCapture)
        setTimeout(()=>{
            handleClose()
        },1000)
    }

    function recognizeImage(imageCapture){
        imageCapture = imageCapture || document.querySelector('img');
        imageCapture.takePhoto().then(imageBlob=>{
            // imageBlob = URL.createObjectURL(imageBlob)
            console.log('imageBlob',imageBlob)
            uploadRecogImage(imageBlob).then(response=>{
                console.log(response)
                searchByImage(response.data)
            })
        })
        
    }

    function downloadImage(imageCapture) {
        imageCapture = imageCapture || document.querySelector('img');
        imageCapture.takePhoto()
            .then(blob => {
                let a = document.createElement('a'); 
                a.href = URL.createObjectURL(blob);
                a.download = 'screenshot.jpg';
                document.body.appendChild(a);
                a.click();
                // let url = window.URL.createObjectURL(blob);
                // img.src = url;
                // window.URL.revokeObjectURL(url);
            })
            .catch(error=>{
                console.log(error)
            });
    };

    useEffect(() => {
        if (!videoEl) {
            return
        }
        if (!open) {
            console.log(videoEl.current)
            console.log(streamRef)
            if (streamRef.current) {
                let tracks = streamRef.current.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            }
            if (videoEl.current) {
                videoEl.current.pause()
            }

            return
        }

        if (open) {
            navigator.mediaDevices.getUserMedia({ video: open })
                .then(stream => {
                    let video = videoEl.current
                    video.srcObject = stream
                    streamRef.current = stream
                    video.play()
                    console.log(open)
                })
        }
    }, [videoEl, open])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>
                            <video ref={videoEl} width="100%" height='350px'/>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => captureImage()} color="primary" autoFocus>
                        {props.submitButtonTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


WebCam.defaultProps={
    dialogTitle:'Capture your product..',
    submitButtonTitle:'Capture & Search',
    isAddFrnd: false
}