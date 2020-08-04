import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
//Fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop, faVideo } from '@fortawesome/fontawesome-free-solid'


var mediaRecorder = null;

export default function AudioRec(props) {
    const { open, handleClose, operateByVoiceResponse } = props;
    const [isRecording, setRecording] = React.useState(false);

    const videoEl = useRef(null)
    const streamRef = useRef(null)

    function recordAudio(){
        console.log('recordAudio')
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            streamRef.current = stream
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            console.log('recording started')
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                console.log('recording stopped')
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                console.log('recording playing')
                audio.play();
                let tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
            });
        });

        setRecording(true)
    }

    function stopRecording(){
        mediaRecorder.stop();
        setRecording(false)
    }


    return (
        <div style={{width:'100%'}}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'lg'}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{"Audio Recording"}</DialogTitle>
                <DialogContent style={{width:'100%'}}>
                    <DialogContentText id="alert-dialog-description" style={{width:'100%'}}>
                        <br />
                        <div style={{display:'block'}}>
                            {!isRecording&&<Fab color="primary" 
                                style={{display:'block',margin:"0px auto"}}
                                onClick={()=>recordAudio()}>
                                <FontAwesomeIcon 
                                    icon={faMicrophone} 
                                    color={'white'} 
                                    style={{fontSize:'20px'}}
                                />
                            </Fab>}
                            {isRecording&&<>
                                <Fab color="primary" 
                                    style={{display:'block',margin:"0px auto"}}
                                    onClick={()=>stopRecording()}>
                                    <FontAwesomeIcon 
                                        icon={faStop} 
                                        color={'white'} 
                                        style={{fontSize:'20px'}}
                                    />
                                </Fab>
                                <LinearProgress />
                                <LinearProgress color="secondary" /> 
                            </>} 
                        </div>
                        <br />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Play
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}