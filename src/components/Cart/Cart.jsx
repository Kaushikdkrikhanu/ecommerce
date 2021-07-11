import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
const Cart = ({cart, handleUpdateCartQty, handleEmptyCart, handleRemoveFromCart}) => {
    //console.log(cart)
    const classes = useStyles();
    //console.log(cart.line_items)
    const EmptyCart=()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!
            <Link to="/" className={classes.title}>Start adding some!</Link>
        </Typography>
    )
    const FilledCart= ()=>(
        <React.Fragment>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} image={item.media.source} 
                        alt={item.name} 
                        className={classes.media} 
                        onUpdateCartQty={handleUpdateCartQty}
                        onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button className ={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant = "contained" color="secondary">Empty Cart</Button>
                        <Button component={Link} to="/checkout" className ={classes.checkoutButton} size="large" type="button" variant = "contained" color="primary">CHECKOUT</Button>
                    </div>
                </Typography>

            </div>
        </React.Fragment>
    )
    if(!cart.line_items) return 'Loading ...'
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length? <EmptyCart/>:<FilledCart/> }
        </Container>
    )
}    

export default Cart
