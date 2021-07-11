import React, {useState, useEffect} from 'react'
import {commerce} from './lib/commerce'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//import {useLocation} from 'react-router-dom'
//import {Products,Navbar} from './components'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
const App = () => {
    //const location = useLocation();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order,setorder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');    
    const fetchProducts = async()=>{
        const {data} = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async ()=>{
        setCart(await commerce.cart.retrieve());
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    }, [])

    const handleAddToCart = async (productID, quantity) =>{
        const {cart} = await commerce.cart.add(productID, quantity)
        setCart(cart) 
        //console.log(response.cart)                                             //doubts here
    }

    const handleUpdateCartQty = async(productID, quantity)=>{
        const {cart} = await commerce.cart.update(productID, {quantity})
        setCart(cart)
    }
    const handleRemoveFromCart = async(productID)=>{
        const {cart} = await commerce.cart.remove(productID);
        setCart(cart)
    }
    const handleEmptyCart = async()=>{
        const {cart} = await commerce.cart.empty();
        setCart(cart)
    }
    const refreshCart = async ()=>{
        const newCart =await commerce.cart.refresh();
        setCart(newCart)
    }
    const handleCaptureCheckout = async(checkoutTokenId,newOrder)=>{
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
            console.log(incomingOrder)
            setorder(incomingOrder)
            refreshCart()
        }catch(error){
            console.log(error)
            setErrorMessage(error.data.error.message)
        }
    }
    //console.log(products)
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddtoCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart 
                        cart={cart}
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleEmptyCart={handleEmptyCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        />        
                    </Route>
                    <Route exact path="/checkout">
                       <Checkout 
                       cart={cart}
                       order={order}
                       onCaptureCheckout={handleCaptureCheckout}
                       error={errorMessage}
                       />
                    </Route>
                </Switch>
                
                
            </div>
        </Router>
        
    )
}

export default App
