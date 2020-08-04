import React, { useEffect, useState, useImperativeHandle } from 'react'
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

//Fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faCamera, faVideo, faFileImage, faUserPlus } from '@fortawesome/fontawesome-free-solid'
import './index.css'
import IronManSit from './../../assets/giffy/Ironmansit.gif'
import IronMansitstart from './../../assets/giffy/IronMansitstart.gif'
import FinalFlyingIM from './../../assets/giffy/FinalFlyingIM.png'
import AntMan from './../../assets/giffy/AntMan1.gif'
import Groot from './../../assets/giffy/Groot.gif'
import Hulk from './../../assets/giffy/Hulk.gif'

import AudioRecButton from './AudioRecBut'

const style = {
    height: 250 // we can control scene size by setting container dimensions
};

const WhatToDoButtonsComp = (props) => {

    const { openWebCam, operateByVoiceResponse, openSelFileUpl, openAddFriend, openVideoWindow } = props

    return (<div className="what-to-do-buttons" style={{ zIndex: 1600, bottom: '10px', position: 'absolute' }}>
        <Fab color="primary"
            style={{ margin: "0px 7px" }}
            size="medium"
            onClick={() => openWebCam()}>
            <FontAwesomeIcon
                icon={faCamera}
                color={'white'}
                style={{ fontSize: '20px' }}
            />
        </Fab>
        <AudioRecButton
            operateByVoiceResponse={operateByVoiceResponse}
        />
        <Fab color="primary"
            style={{ margin: "0px 7px" }}
            size="medium"
            onClick={() => openSelFileUpl()} >
            <FontAwesomeIcon
                icon={faFileImage}
                color={'white'}
                style={{ fontSize: '20px' }}
            />
        </Fab>
        <Fab color="primary"
            style={{ margin: "0px 7px" }}
            size="medium"
            onClick={() => openVideoWindow()} >
            <FontAwesomeIcon
                icon={faUserPlus}
                color={'white'}
                style={{ fontSize: '20px' }}
            />
        </Fab>
    </div>)

}


const AnimSlot = React.forwardRef((props, ref) => {

    const { openWebCam, openAudRec, openSelFileUpl, operateByVoiceResponse, openAddFriend, openVideoWindow } = props;
    const [animImg, setAnimImg] = useState('ironsit')
    const handleAnimImg = (data) => {
        setAnimImg(data)
    }


    function handleClickMeStart() {
        console.log('handleClickMeStart')
        handleAnimImg('ironsitstart')
        setTimeout(() => {
            handleAnimImg('IronManFlyStandStarter')
        }, 1500)
        setTimeout(() => {
            handleAnimImg('IronManFlyStand')
        }, 3000)
    }


    useImperativeHandle(ref, () => ({
        handleAnimImg: handleAnimImg
    }));



    return (<>
        <div>
            {animImg === 'ironsit' &&
                <img
                    className="fixed-anim-char"
                    src={IronManSit}
                    width="100%" height="auto"
                    onClick={() => handleClickMeStart()}
                />}

            {animImg === 'ironsitstart' &&
                <img
                    className="fixed-anim-char"
                    src={IronMansitstart}
                    width="100%" height="auto"
                />}

            {animImg === 'IronManFlyStandStarter' &&
                <div className="fixed-anim-char">
                    <img className="flying-transition-starter" src={FinalFlyingIM} width="100%" height="auto" />
                </div>
            }

            {animImg === 'IronManFlyStand' &&
                <div className="fixed-anim-char">
                    <img className="flying-transition" src={FinalFlyingIM} width="100%" height="auto" />
                    <WhatToDoButtonsComp
                        openWebCam={openWebCam}
                        operateByVoiceResponse={operateByVoiceResponse}
                        openSelFileUpl={openSelFileUpl}
                        openAddFriend={openAddFriend}
                        openVideoWindow={openVideoWindow}
                    />
                </div>
            }

            {(animImg === 'AntMan' || animImg === 'Groot' || animImg === 'Hulk')
                && <div className="fixed-anim-char">
                    {animImg === 'AntMan' && <img
                        className="fixed-anim-char"
                        src={AntMan}
                        width="100%" height="auto"
                    />}
                    {animImg === 'Groot' && <img
                        className="fixed-anim-char"
                        src={Groot}
                        width="100%" height="auto" style={{ height: '350px' }}
                    />}
                    {animImg === 'Hulk' && <img
                        className="fixed-anim-char"
                        src={Hulk}
                        width="100%" height="auto" style={{ height: '250px' }}
                    />}
                    <WhatToDoButtonsComp
                        openWebCam={openWebCam}
                        operateByVoiceResponse={operateByVoiceResponse}
                        openSelFileUpl={openSelFileUpl}
                        openAddFriend={openAddFriend}
                        openVideoWindow={openVideoWindow}
                    />
                </div>
            }

        </div>
    </>)
})

export default AnimSlot;