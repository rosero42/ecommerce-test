import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { CartIconContainer, ItemCount, ShopIcon } from './cart-icon.styles'


const CartIcon = () =>{
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShopIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon