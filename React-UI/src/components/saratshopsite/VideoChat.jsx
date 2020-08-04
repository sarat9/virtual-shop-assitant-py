import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { uploadRecogImage } from './../../services/RecogService'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

var getScreenMedia = require('getscreenmedia');

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Video Chat and Screen Share
export default function VideoChat(props) {


    const screeShareEl = useRef(null)
    const screeShareElStreamRef = useRef(null)
    const videoEl = useRef(null)
    const streamRef = useRef(null)

    const classes = useStyles();
    const { isVideoWindowOpen, openVideoWindow, closeVideoWindow } = props;

    useEffect(() => {
        if (!videoEl) {
            return
        }
        if (!isVideoWindowOpen) {
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

        if (isVideoWindowOpen) {
            startSharingScreen()
            navigator.mediaDevices.getUserMedia({ video: open })
                .then(stream => {
                    let video = videoEl.current
                    video.srcObject = stream
                    streamRef.current = stream
                    video.play()
                })
        }
    }, [videoEl, isVideoWindowOpen])


    function startSharingScreen() {
        getScreenMedia(function (err, stream) {
            // if the browser doesn't support user media
            // or the user says "no" the error gets passed
            // as the first argument.
            if (err) {
                console.log('failed');
            } else {
                console.log('got a stream', stream);
                let video = screeShareEl.current
                video.srcObject = stream
                screeShareElStreamRef.current = stream
                video.play()
                console.log(open)
            }
        });
    }

    function stopSharingScreen() {

    }

    return (
        <div>
            <Dialog fullScreen open={isVideoWindowOpen} onClose={closeVideoWindow} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeVideoWindow} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Group Call
                    </Typography>
                        <Button autoFocus color="inherit" onClick={closeVideoWindow}>
                            Back
                    </Button>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12} sm={12} md={12}>
                    <br /> <br />
                    <div>
                        <Button autoFocus color="inherit" onClick={startSharingScreen}>
                            Start Sharing
                        </Button>
                    </div>
                    <div>
                        <Grid container className="space-pad" style={{ width: 'inherit' }}>
                            <Grid item md={6}>
                                <video ref={screeShareEl} width="100%" height='350px' />
                            </Grid>
                            <Grid item md={6}>
                                <video ref={videoEl} width="100%" height='350px'/>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Dialog>
        </div>

    );
}