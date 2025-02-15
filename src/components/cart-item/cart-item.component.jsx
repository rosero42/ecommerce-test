import { CartItemContainer, CartItemImage, ItemDetails, Name } from './cart-item.styles';

const CartItem = ({cartItem}) =>{
    const {name, quantity, imageUrl, price} = cartItem
    return(
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={`${name}`}/>
            <ItemDetails className='item-details'>
                <Name className='name'>{name}</Name>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>

        </CartItemContainer>
    );
}
export default CartItem;