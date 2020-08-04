import React, { useEffect, useImperativeHandle } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './index.css'
import * as productsJson from './products/products'
import useDialog from './../../hooks/useDialog'
import ProductDialog from './ProductDialog'

const productsData = productsJson["default"]


const style = {
    height: 250 // we can control scene size by setting container dimensions
};

const Productspage = React.forwardRef((props, ref) => {

    const { searchedInput } = props;
    const [isProductOpen, openProduct, closeProduct] = useDialog()
    const [selectedProduct, setSelectedProduct] = React.useState(null);


    let valid = false;

    if ('tv' === searchedInput || 'sapling' === searchedInput ||
        'table' === searchedInput || 'screw driver' === searchedInput) {
        valid = true
    }


    function selectProduct(product) {
        console.log(product)
        setSelectedProduct(product)
        openProduct()
    }

    function selectProductByNum(productNo) {
        if (searchedInput) {
            if (productsData[searchedInput]) {
                let productData = productsData[searchedInput][(+productNo - 1)]
                if (productData) {
                    console.log(productData)
                    setSelectedProduct(productData)
                    openProduct()
                }

            }
        }
    }

    function getCurrentProductList(val) {
        if (searchedInput) {
            if (productsData[searchedInput]) {
                return productsData[searchedInput][(+val - 1)]
            }
        }
        return null
    }

    useImperativeHandle(ref, () => ({
        getCurrentProductList: getCurrentProductList,
        selectProductByNum: selectProductByNum,
        closeProduct: closeProduct
    }));

    return (<>
        <div style={{ background: 'white', width: '100%' }}>
            <div>
                <Grid container style={{ width: 'inherit' }}>
                    <Grid item xs={2} sm={2} md={3}>
                        <div>
                            <img src={require('./../../assets/website/brandfilter.PNG')} width="80%" />
                            <img src={require('./../../assets/website/pricefilter.PNG')} width="80%" />
                            <img src={require('./../../assets/website/ratingfilter.PNG')} width="80%" />
                        </div>
                    </Grid>
                    <Grid item xs={7} sm={7} md={6}>
                        {valid && <Grid container style={{ width: 'inherit' }}>
                            <div>
                                <p><span style={{ fontWeight: 700, fontSize: '18px' }}>{productsData[searchedInput].length + " "}</span>
                                    Products for {searchedInput}
                                </p>
                            </div>
                            {productsData[searchedInput].map((product, pIndex) => {
                                return (<>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <div className="product-card">
                                            <Grid container style={{ width: 'inherit' }}>
                                                <Grid item xs={6} sm={6} md={6}>
                                                    <div style={{ padding: '20px' }} >
                                                        <img src={require('./../../assets/' + product.image)} width="100%" height="190px" />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6}>
                                                    <div style={{ padding: '10px' }}>
                                                        <p style={{ fontSize: '12px', fontWeight: 800, margin: '0px' }}>{'Product' + (pIndex + 1)}</p>
                                                        <p style={{ fontWeight: 800 }}>{product.name}</p>
                                                        <p style={{ fontWeight: 900, fontSize: '24px' }}>{product.price}</p>
                                                        <p>{product.caption}</p>
                                                        <p>{product.model}</p>
                                                        <Button variant="outlined" color="primary" onClick={() => selectProduct(product)}>
                                                            Open Product
                                                </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div></div>
                                    </Grid>
                                </>)
                            })}
                        </Grid>}
                        {!valid &&
                            <div>
                                <p>No results found for
                            <span style={{ fontWeight: 700, fontSize: '18px' }}>{" " + searchedInput}</span>
                                    !!!
                        </p>
                                <p> Please try some other product! </p>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                    </Grid>
                    <ProductDialog
                        isProductOpen={isProductOpen}
                        openProduct={openProduct}
                        closeProduct={closeProduct}
                        selectedProduct={selectedProduct}
                    />
                </Grid>

            </div>

        </div>
    </>)
})

export default Productspage;