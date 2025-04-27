import { CartItemContainer, CartItemImage, ItemDetails, Name } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { FC, memo } from 'react';

type CartItemProps = {
    cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({cartItem}) =>{
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
})
export default CartItem;