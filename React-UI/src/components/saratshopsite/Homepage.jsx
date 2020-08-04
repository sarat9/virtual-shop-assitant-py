import React, { useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import './index.css'
import CartProfileImage from './../../assets/website/cart-profile.PNG'
import FurnitureCategoriesImg from './../../assets/website/furniture-store.jpg'
import FaeturedCategoriesImg from './../../assets/website/featured-products.png'
import SizingFurnitureImg from './../../assets/website/sizing-furniture.png'
import VoiceSearchImg from './../../assets/website/voice-search-in-retail.jpg'


const style = {
    height: 250 // we can control scene size by setting container dimensions
};

const Homepage = () => {

    return (<>
     <div style={{background:'white', width:'100%'}}>
      
        <br />
        <br />

        <div className="space-pad">
            <div>
                <img className="pick-up-image" src={FurnitureCategoriesImg} width="100%" height="auto" alt="Voice and Image based search retai" />   
            </div>
            <div>
                
            <br />
            </div>
        </div>

        <br />
        <br />

        <div className="tools-and-supply-div space-pad">
            <div>
                <img className="pick-up-image" src={VoiceSearchImg} width="100%" height="400px" alt="Summer is Open." />   
            </div>
        </div>

        <br />
        <br />

        <div className="featured-categories-div space-pad">
            <div>
                <h2 style={{fontWeight:400}}>FEATURED CATEGORIES</h2>
            </div>
            <div>
                <img className="pick-up-image" src={FaeturedCategoriesImg} width="100%" height="auto" alt="Summer is Open." />   
            </div>
        </div>

        <div className="beat-the-heat-div space-pad">
            <div>
                <h2 style={{fontWeight:400}}>BEAT THE HEAT</h2>
            </div>
            <div>
                <img className="pick-up-image" src={SizingFurnitureImg} width="100%" height="auto" alt="Summer is Open." />   
            </div>
        </div>


        <br />
        <br />

       


        
    </div>
    </>)
}

export default Homepage;