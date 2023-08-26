import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'

const CheckoutItem = ({product}) =>{
    //  product: id, name, imageUrl, price, quantity

    // Image, description, quantity, price, remove
    const {name, imageUrl, quantity, price} = product
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext)
    const lowerQuantity = () => {
        removeItemFromCart(product)
    }

    const increaseQuantity = () =>{
        addItemToCart(product)
    }

    const deleteFromCart = () =>{
        deleteItemFromCart(product)
    }
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow'onClick={lowerQuantity}>&#10094;</div>
                {quantity} 
                <div className='arrow'onClick={increaseQuantity}>&#10095;</div>
            </span> 
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={deleteFromCart}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem