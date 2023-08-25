import './cart.styles.scss'
import { CartContext } from '../../../contexts/cart.context'
import { useContext, useEffect } from 'react'
import ProductCheckoutItem from '../../product-checkout-item/product-checkout-item.component'

const Cart = () =>{
    const {cartItems, totalCost} = useContext(CartContext)
    return(
        <div className='product-checkout-container'>
            I am the cart page!
            { 
                cartItems.map(item => 
                <ProductCheckoutItem key={item.id} product={item}/>)   
            }
            <p>Total ${totalCost}</p>
        </div>
    )
}

export default Cart