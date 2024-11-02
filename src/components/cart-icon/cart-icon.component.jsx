import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { CartIconContainer, ItemCount, ShopIcon } from './cart-icon.styles'

const CartIcon = () =>{
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return(
        <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShopIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon