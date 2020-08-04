import React, { useEffect, useRef } from 'react';
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
        uploadAudio("audioBlob").then(response=>{
            console.log('response',response)
            setRecording(false)
            operateByVoiceResponse(response.data)
        }).catch(err=>{
            console.log(err)
        })

        setRecording(true)
    }



    function stopRecording() {
        // mediaRecorder.stop();
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
                    onClick={() => {}}>
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