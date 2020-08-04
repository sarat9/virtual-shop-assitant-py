import React, { useEffect, useState, useRef } from 'react'

import Grid from '@material-ui/core/Grid';
import './index.css'
import SaratLogo from './../../assets/website/sarat-logo.PNG'
import CartProfileImage from './../../assets/website/cart-profile.PNG'
import FooterImg from './../../assets/website/footer.jpg'
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/fontawesome-free-solid'

import useDialog from './../../hooks/useDialog'
import useUpdate from './../../hooks/useUpdate'
import Productspage from './Productspage'
import Homepage from './Homepage'
import AnimSlot from './AnimSlot'
import WebCam from './WebCam'
import AudioRec from './AudioRec'
import SelectUpload from './SelectUpload'
import VideoChat from './VideoChat'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { checkOutProduct } from './../../redux/actions/actions'
import * as productsJson from './products/products'



//Services
import { uploadRecogImage } from './../../services/RecogService'
import { scrollDown, scrollUp } from './../../utility/scroll'

const style = {
    height: 250 // we can control scene size by setting container dimensions
};

const InitialPage = () => {
    const animRef = useRef()
    const productsPageRef = useRef()
    const [searched, setSearched] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    var [searchedInput, setSearchedInput] = useState('')
    const [isWebCamOpen, openWebCam, closeWebCam] = useDialog()
    const [isAddFriendOpen, openAddFriend, closeAddFriend] = useDialog()
    const [isAudRecOpen, openAudRec, closeAudRec] = useDialog()
    const [isSelFileOpen, openSelFileUpl, closeSelFileUpl] = useDialog()
    const [isVideoWindowOpen, openVideoWindow, closeVideoWindow] = useDialog()

    const dumRef = useRef(0)

    const history = useHistory();
    const dispatch = useDispatch()


    useUpdate(() => {
        if (searched&&searchedInput) {
            let val = searchedInput.trim().toLowerCase()
            if (val === 'table') {
                handleAnimImg('Hulk')
            }
            else if(val === 'screw driver'){
                handleAnimImg('AntMan')
            }
            else if(val === 'sapling'){
                handleAnimImg('Groot')
            }
            else {
                handleAnimImg('IronManFlyStand')
            }
        } else {
            handleAnimImg('IronManFlyStand')
        }
    }, [searchedInput, searched])

    function handleAnimImg(img) {
        animRef.current.handleAnimImg(img)
    }

    function handleSearchInput(event) {
        event.preventDefault()
        console.log(event)
        let value = event.target.value;
        console.log(value)
        setSearchInput(value)
    }

    function handleSearchSubmit(event) {
        event.preventDefault()
        setSearchedInput(searchInput.trim())
        searchedInput = searchInput.trim()
        if (searchedInput.trim()) {
            setSearched(true)
        } else {
            setSearched(false)
        }
    }

    function handleSearchClear(event) {
        event&&event.preventDefault()
        setSearchInput('')
        setSearchedInput('')
        setSearched(false)
    }

    function searchByImage(imgType) {
        setSearchInput(imgType)
        setSearchedInput(imgType)
        setTimeout(() => {
            setSearched(true)
        }, 700)
    }

    function operateByVoiceResponse(voiceResponse) {
        voiceResponse = voiceResponse&&voiceResponse.trim().toLowerCase()
        let numbers = {
            one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10
        }
        console.log('voiceResponse', voiceResponse)
        if (voiceResponse === 'down') {
            //Scroll down
            scrollDown()
        }
        else if (voiceResponse === 'up') {
            //Scroll up
            scrollUp()
        }
        else if (voiceResponse === 'back'||voiceResponse === 'left') {
            handleSearchClear()
        }
        else if (voiceResponse == 'one' || voiceResponse == 'two' || voiceResponse == 'three'
                    ||voiceResponse == 'four'||voiceResponse == 'five'||voiceResponse == 'six'
                         ||voiceResponse == 'seven'||voiceResponse == 'eight'||voiceResponse == 'nine' 
                            ||voiceResponse == 'ten') {
            productsPageRef.current && productsPageRef.current.selectProductByNum(numbers[voiceResponse])
        }
        else {
            console.log('Not sure what to do when you say ::::   ', voiceResponse)
        }

        // // Manual Showcase Dummy Voice Search
        // dumCount = (dumCount+1);
        // dumRef.current= dumRef.current+1
        // if(dumRef.current<3){
        //     scrollDown()
        // }
        // else if(dumRef.current>=3&&dumRef.current<5){
        //     scrollUp()
        // }
        // else if(dumRef.current===5){
        //     productsPageRef.current && productsPageRef.current.selectProductByNum(4)
        // }
        // else if(dumRef.current===6){
        //     productsPageRef.current && productsPageRef.current.closeProduct()
        // }
        // else if(dumRef.current===7){
        //     let num = 6
        //     // let num = (numbers[voiceResponse])
        //     productsPageRef.current && productsPageRef.current.selectProductByNum(num)
        // }
        // else if(dumCount===8){
        //     let num = 6
        //     // let num = (numbers[voiceResponse])
        //     let productsData = productsJson.default
        //     let product = productsData&&productsData[searchedInput]&&productsData[searchedInput][num-1]
        //     dispatch(checkOutProduct(product))
        //     history.push('/checkout')
        // }

    }


    return (<>
        <div style={{ background: 'white', width: '100%' }}>
            <br />

            <div>
                <WebCam
                    open={isWebCamOpen}
                    handleClose={closeWebCam}
                    searchByImage={searchByImage}
                />
            </div>


             <div>
                <VideoChat 
                    isVideoWindowOpen={isVideoWindowOpen}
                    openVideoWindow={openVideoWindow}
                    closeVideoWindow={closeVideoWindow}
                />
            </div>

            <div>
                <AudioRec
                    open={isAudRecOpen}
                    handleClose={closeAudRec}
                    operateByVoiceResponse={operateByVoiceResponse}
                />
            </div>

            <div>
                <SelectUpload
                    open={isSelFileOpen}
                    handleClose={closeSelFileUpl}
                    searchByImage={searchByImage}
                />
            </div>

            <div>
                <AnimSlot
                    ref={animRef}
                    openWebCam={openWebCam}
                    openAudRec={openAudRec}
                    operateByVoiceResponse={operateByVoiceResponse}
                    openSelFileUpl={openSelFileUpl}
                    openAddFriend={openAddFriend}
                    openVideoWindow={openVideoWindow}
                />
            </div>

            <div className="header-div">
                <div>
                    <Grid container className="space-pad" style={{ width: 'inherit' }}>
                        <Grid item md={1}>
                            <div>
                                <img className="sarat-logo" style={{ width: '95px', height: '75px' }} src={SaratLogo} width="100%" height="auto" alt="Summer is Open." />
                            </div>
                        </Grid>

                        <Grid item md={7}>
                            <div className="search-bar-div">
                                <form className="search-bar-form" onSubmit={handleSearchSubmit}>
                                    <input className="search-bar" type="text" name="search"
                                        placeholder="Search by Name, Keyword or Item Number "
                                        onChange={handleSearchInput}
                                        value={searchInput}
                                    />
                                
                                <IconButton color="primary"
                                    style={{ margin: "0px 0px" }}
                                    onClick={handleSearchSubmit}
                                >
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        color={'#0041c2'}
                                        style={{ fontSize: '16px' }}
                                    />
                                </IconButton>
                                <IconButton color="primary"
                                    style={{ margin: "0px 0px" }}
                                    onClick={handleSearchClear}
                                >
                                    <FontAwesomeIcon
                                        icon={faTimesCircle}
                                        color={'#0041c2'}
                                        style={{ fontSize: '16px' }}
                                    />
                                </IconButton>
                                </form>
                            </div>
                        </Grid>
                        <Grid item md={2}>

                        </Grid>
                        <Grid item md={2}>
                            <div>
                                <img className="sarat-logo" style={{ width: '95px', height: '55px' }} src={CartProfileImage} width="100%" height="auto" alt="Summer is Open." />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className="menu-wrap-div border-set">
                <Grid container className="space-pad" style={{ width: 'inherit' }}>
                    <Grid item xs={4} sm={4} md={4}>
                        <div className="menu-wrap">
                            <ul className="mcontainer" role="menubar" aria-label="Sarat menu">
                                <li className="mitems navigation-menu" role="menuitem">
                                    <a className="mitem-text" id="shopMenu" href="#" aria-hidden="false" title="Shop">Shop </a>
                                </li>
                                <li className="mitems navigation-menu" role="menuitem">
                                    <a className="mitem-text" href="#" title="Furniture" aria-hidden="false"> Furniture</a>
                                </li>
                                <li className="mitems navigation-menu" role="menuitem">
                                    <a className="mitem-text" href="#" title="Saplings" aria-hidden="false"> Saplings </a>
                                </li>
                                <li className="mitems navigation-menu" role="menuitem">
                                    <a className="mitem-text" href="#" title="Tables" aria-hidden="false"> Tables</a>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <div className="menu-right menu-wrap-secondary">
                            <span><a className='item' href="#" title="Orders">Orders</a></span>
                            <span><a className='item' href="#" title="Coupons">Coupons</a></span>
                            <span><a className='item' href="#" title="Discounts">Discounts</a></span>
                        </div>
                    </Grid>

                </Grid>
            </div>

            <br />
            <br />


            {!searched && <div>
                <Homepage />
            </div>}

            {searched && <div>
                <Productspage
                    ref={productsPageRef}
                    searchedInput={searchedInput.toLowerCase()}
                />
            </div>}

            <div>
                <img className="pick-up-image" src={FooterImg} width="100%" height="auto" alt="Summer is Open." />
            </div>

        </div>
    </>)
}

export default InitialPage;