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
//Services
import { uploadAudio } from '../../services/RecogService'

var mediaRecorder = null;

export default function AudioRecBut(props) {
    const { open, handleClose, operateByVoiceResponse  } = props;
    const [isRecording, setRecording] = React.useState(false);

    const videoEl = useRef(null)
    const streamRef = useRef(null)

    function recordAudio() {
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
                    uploadAudio(audioBlob).then(response=>{
                        console.log('response',response)
                        operateByVoiceResponse(response.data)
                        
                    }).catch(err=>{
                        console.log(err)
                    })
                    let tracks = stream.getTracks();
                    tracks.forEach(function (track) {
                        track.stop();
                    });
                });

                // setTimeout(()=>{
                //     stopRecording()
                // },2000)
            });

        setRecording(true)
    }



    function stopRecording() {
        mediaRecorder.stop();
        setRecording(false)
    }


    return (
        <>
            {!isRecording && <Fab color="primary"
                style={{ margin: "0px 10px" }}
                size="medium"
                onClick={() => recordAudio()}>
                <FontAwesomeIcon
                    icon={faMicrophone}
                    color={'white'}
                    style={{ fontSize: '20px' }}
                />
            </Fab>}
            {isRecording && <>
                <Fab color="primary"
                    style={{ margin: "0px 10px", background:'red' }}
                    onClick={() => stopRecording()}>
                    <FontAwesomeIcon
                        icon={faStop}
                        color={'white'}
                        style={{ fontSize: '20px' }}
                    />
                </Fab>
            </>}
        </>
    );
}