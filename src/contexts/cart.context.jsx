import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen:() =>{},
    cartItems: [],
    addItemToCart: () =>{},
    numItems: 0,
});

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [numItems, setNumItems] = useState(0);

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)
        setNumItems(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, numItems};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}