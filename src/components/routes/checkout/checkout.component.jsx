import './checkout.styles.scss'
import { CartContext } from '../../../contexts/cart.context'
import { useContext } from 'react'
import CheckoutItem from '../../checkout-item/checkout-item.component'

const Checkout = () =>{
    const {cartItems, totalCost} = useContext(CartContext)
    return(
        <div className='product-checkout-container'>
            I am the cart page!
            { 
                cartItems.map(item => 
                <CheckoutItem key={item.id} product={item}/>)   
            }
            <p>Total ${totalCost}</p>
        </div>
    )
}

export default Checkout