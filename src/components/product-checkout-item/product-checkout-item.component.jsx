import './product-checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'

const ProductCheckoutItem = ({product}) =>{
    //  product: id, name, imageUrl, price, quantity

    // Image, description, quantity, price, remove
    console.log(product)
    const {name, id, imageUrl, quantity, price} = product
    console.log(name, imageUrl, quantity, price)
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext)
    const lowerQuantity = () => {
        removeItemFromCart(product)
    }

    const increaseQuantity = () =>{
        addItemToCart(product)
    }

    const deleteFromCart = () =>{
        deleteItemFromCart(product)
    }
    return(
        <div>
            <img src={imageUrl} alt={`${name}`}/>
            <span>{name}</span>
            <div>
                <p onClick={lowerQuantity}>{`<`}</p>
                <span>{quantity}</span>
                <p onClick={increaseQuantity}>{`>`}</p>

            </div>
            <span>{price}</span>
            <br></br><span onClick={deleteFromCart}>REMOVE</span>

        </div>
    )
}

export default ProductCheckoutItem