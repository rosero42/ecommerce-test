import { useSelector } from 'react-redux'
import CheckoutItem from '../../checkout-item/checkout-item.component'
import { selectCartItems, selectCartTotal } from '../../../store/cart/cart.selector'
import { 
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total
 } from './checkout.styles'
 import PaymentForm from '../../payment-form/payment-form.component'

const Checkout = () =>{
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>

            </CheckoutHeader>
            { 
                cartItems.map(item => 
                <CheckoutItem key={item.id} product={item}/>)   
            }
            <Total>Total ${cartTotal}</Total>
            <PaymentForm/>
        </CheckoutContainer>
    )
}

export default Checkout