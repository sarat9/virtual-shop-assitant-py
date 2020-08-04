import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { checkOutProduct } from './../../redux/actions/actions'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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

export default function ProductDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();

    const { isProductOpen, openProduct, closeProduct, selectedProduct } = props;

    let product = selectedProduct
    useEffect(()=>{
        console.log("product",product)
        if(selectedProduct){product = selectedProduct}
    },[isProductOpen])

    function addToCart(product){
        dispatch(checkOutProduct(product))
        history.push('/checkout')
    }

    return (
        <div>
            <Dialog fullScreen open={isProductOpen} onClose={closeProduct} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeProduct} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Product
                        </Typography>
                        <Button autoFocus color="inherit" onClick={closeProduct}>
                            Back
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12} sm={12} md={12}>
                    <br /> <br />
                   {product && <div className="product-card">
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
                                    <Button variant="outlined" color="primary" onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>}
                    <div>
                        <div style={{padding:'10px'}}>
                            <img src={require('./../../assets/website/product-description.png')} width="100%" height="auto" />
                        </div>
                        <div style={{padding:'10px'}}>
                            <img src={require('./../../assets/website/recomondation.png')} width="100%" height="auto" />
                        </div>
                    </div>
                </Grid>
            </Dialog>
        </div>
    );
}