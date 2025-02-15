import { CategoryItem } from '../categories/category.types';
import { 
    createAction,
    ActionWithPayload,
    withMatcher
 } from '../../util/reducer/reducer.util'
import { CART_ACTION_TYPE, CartItem} from './cart.types'

//  cartItem: id, name, imageUrl, price, quantity

const addCartItem = (
    cartItems: CartItem[], 
    productToAdd: CategoryItem
    ): CartItem[] => {
    const existingCartItem = cartItems.find((cartItems) => cartItems.id === productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id ===productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    if(existingCartItem && existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id ===productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
        )

}

const deleteCartItem = (
    cartItems: CartItem[], 
    productToDelete: CartItem
): CartItem[] => 
    cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPE.SET_CART_ITEMS, CartItem[]>
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean>


export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems:CartItem[], productToAdd: CategoryItem): SetCartItems =>{
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): SetCartItems =>{
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return setCartItems(newCartItems)
}

export const deleteItemFromCart = (cartItems: CartItem[], productToDelete: CartItem): SetCartItems =>{
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    return setCartItems(newCartItems)
}

export const clearItemsFromCart = (): SetCartItems =>{
    return setCartItems([])
}

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen  =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool))
