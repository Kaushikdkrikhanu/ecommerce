import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'
const poducts = [
    {id: 1,name: 'Shoes', description: 'Running Shoes', price: '$5', image:'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ'},
    {id: 2,name: 'Macbook', description: 'Apple macbook', price: '$10', image:'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'}
]

const Products = ({products, onAddtoCart})=>{

    const classes = useStyles()
    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddtoCart={onAddtoCart} />
                    </Grid>
                ))}
            </Grid>
    </main>
    )
    
}

export default Products