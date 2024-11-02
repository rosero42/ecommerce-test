import Button from '../button/button.component'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItem from '../cart-item/cart-item.component'
import { CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx'
import { selectCartItems } from '../../store/cart/cart.selector.js'

const CartDropdown = () =>{
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()
    
    const goToCheckoutHandler = () =>{
        navigate('/checkout')
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                    cartItems.map(item => 
                    <CartItem key={item.id} cartItem={item}/>)) :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropdownContainer>
    )
}
export default CartDropdown