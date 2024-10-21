import { createContext, useReducer } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen:() =>{},
    cartItems: [],
    addItemToCart: () =>{},
    removeItemFromCart: () =>{},
    deleteItemFromCart: () =>{},
    cartCount: 0,
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) =>{
    const { type, payload } = action


    switch(type){
        case CART_USER_ACTIONS.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_USER_ACTIONS.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CART_USER_ACTIONS = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export const CartProvider = ({children}) =>{
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)


    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)

        const newCartTotal = newCartItems.reduce((total, cartItem)=> total + (cartItem.price * cartItem.quantity),0)        

        dispatch({type: CART_USER_ACTIONS.SET_CART_ITEMS, 
            payload: {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            }
        })
    }

    const addItemToCart = (productToAdd) =>{
        updateCartItemsReducer(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (productToRemove)=>{
        updateCartItemsReducer(removeCartItem(cartItems, productToRemove))
    }
    const deleteItemFromCart = (productToDelete)=>{
        updateCartItemsReducer(deleteCartItem(cartItems, productToDelete))
    }
    const setIsCartOpen = (bool) =>{
        dispatch({ type: CART_USER_ACTIONS.SET_IS_CART_OPEN, payload: bool})
    }
    // Access from other files
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemFromCart, 
        deleteItemFromCart,
        cartItems, 
        cartCount,
        cartTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}