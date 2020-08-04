
import React from 'react'
import Grid from '@material-ui/core/Grid';
import './index.css'


import { useSelector, useDispatch } from 'react-redux'
import { checkOutProduct } from './../../redux/actions/actions'

import SaratLogo from './../../assets/website/sarat-logo.png'
import FooterImg from './../../assets/website/footer.jpg'

import CheckoutPayImg from './../../assets/website/payment-checkout.jpg'

function CheckoutPage() {
  const dispatch = useDispatch()
  const checkOutList = useSelector(state => state.checkOutList)



  return (
    <div className='Checkout-page'>
      <br />
      <div className="space-pad">
        <img className="sarat-logo space-pad" style={{ width: '95px', height: '55px' }} src={SaratLogo} width="100%" height="auto" alt="Summer is Open." />
      </div>
      <Grid container className="space-pad" style={{ width: 'inherit' }}>
        <Grid item md={8}>
          <div>
          {checkOutList&&checkOutList.map(product=>{
            return (<>
                  {product && 
                  <div className="product-card">
                    <Grid container style={{ width: 'inherit' }}>
                            <Grid item xs={6} sm={6} md={6}>
                                <div style={{ padding: '20px' }} >
                                    <img src={require('./../../assets/' + product.image)} width="100%" height="290px" />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <div style={{ padding: '10px' }}>
                                    <p style={{ fontWeight: 800 }}>{product.name}</p>
                                    <p style={{ fontWeight: 900, fontSize: '24px' }}>{product.price}</p>
                                    <p>{product.caption}</p>
                                    <p>{product.model}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>}
            </>)
          })}
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <img className="Checkout-payment" src={CheckoutPayImg} width="100%" height="auto" alt="Summer is Open." />
          </div>
        </Grid>
      </Grid>
      <div>
        <img className="pick-up-image" src={FooterImg} width="100%" height="auto" alt="Summer is Open." />
      </div>
    </div>
  )
}

export default CheckoutPage