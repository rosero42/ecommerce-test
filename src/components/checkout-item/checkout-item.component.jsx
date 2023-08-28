import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
import { Arrow, CheckoutItemContainer, ImageContainer, ImageStyle, Name, Quantity, RemoveButton, Price } from './checkout-item.styles'

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
                <ImageStyle src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={lowerQuantity}>&#10094;</Arrow>
                {quantity} 
                <Arrow onClick={increaseQuantity}>&#10095;</Arrow>
            </Quantity> 
            <Price>{price}</Price>
            <RemoveButton onClick={deleteFromCart}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    )
}

export default CheckoutItem