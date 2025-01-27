import { createAction } from '../../util/reducer/reducer.util'
import { CART_ACTION_TYPE } from './cart.types'

//  cartItem: id, name, imageUrl, price, quantity

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItems) => cartItems.id === productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id ===productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id ===productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
        )

}

const deleteCartItem = (cartItems, productToDelete) => cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);


export const addItemToCart = (cartItems, productToAdd) =>{
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToRemove)=>{
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const deleteItemFromCart = (cartItems, productToDelete)=>{
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const clearItemsFromCart = () =>{
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, [])
}

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
