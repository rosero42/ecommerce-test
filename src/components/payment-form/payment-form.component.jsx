import { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { 
    PaymentFormContainer, 
    FormContainer, 
    PaymentButton 
} from "./payment-form.styles";
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { clearItemsFromCart } from '../../store/cart/cart.action';

const PaymentForm = () =>{
    const stripe = useStripe()
    const dispatch = useDispatch()
    const elements = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const paymentHandler = async (e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json())

        const {
            paymentIntent:{ client_secret }
        } = response

        console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest'
                }
            }
        })

        setIsProcessingPayment(false)
        if(paymentResult.error){
            alert(paymentResult.error.message)
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment successful')
                dispatch(clearItemsFromCart())
            }
        }

    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                {
                    amount > 0 ? 
                    <div>
                        <h2>Credit Card Payment</h2>
                        <CardElement/>
                        <PaymentButton 
                            buttonType={BUTTON_TYPE_CLASSES.inverted}
                            isLoading={isProcessingPayment}>
                            Pay now
                        </PaymentButton>
                    </div> : <div/>
                }
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm