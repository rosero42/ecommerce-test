import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { Arrow, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, BaseSpan, Value } from './checkout-item.styles'

const CheckoutItem = ({product}) =>{
    //  product: id, name, imageUrl, price, quantity

    // Image, description, quantity, price, remove
    const {name, imageUrl, quantity, price} = product
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext)
    const lowerQuantity = () => removeItemFromCart(product)
    const increaseQuantity = () => addItemToCart(product)
    const deleteFromCart = () => deleteItemFromCart(product)
    
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={lowerQuantity}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseQuantity}>&#10095;</Arrow>
            </Quantity> 
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={deleteFromCart}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    )
}

export default CheckoutItem