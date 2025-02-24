import { useDispatch, useSelector } from 'react-redux'
import { Arrow, CheckoutItemContainer, ImageContainer, 
    Quantity, RemoveButton, BaseSpan, Value } from './checkout-item.styles'
import { 
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart
} from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import { CartItem } from '../../store/cart/cart.types'
import { FC } from 'react'

export type CheckoutItemProps = {
    product: CartItem
} 

const CheckoutItem: FC<CheckoutItemProps> = ({product}) =>{
    //  product: id, name, imageUrl, price, quantity

    // Image, description, quantity, price, remove
    const {name, imageUrl, quantity, price} = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const lowerQuantityHandler = () => dispatch(removeItemFromCart(cartItems, product))
    const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, product))
    const deleteFromCartHandler = () => dispatch(deleteItemFromCart(cartItems, product))
    
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={lowerQuantityHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseQuantityHandler}>&#10095;</Arrow>
            </Quantity> 
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={deleteFromCartHandler}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    )
}

export default CheckoutItem