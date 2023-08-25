import { createContext, useState, useEffect } from "react";

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

const deleteCartItem = (cartItems, productToDelete) =>{
    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen:() =>{},
    cartItems: [],
    addItemToCart: () =>{},
    removeItemFromCart: () =>{},
    deleteItemFromCart: () =>{},
    numItems: 0,
    totalCost: 0,
});

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [numItems, setNumItems] = useState(0);
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)
        setNumItems(newCartCount)
        const newCartCost = cartItems.reduce((total, cartItem)=> total + cartItem.price,0)
        setTotalCost(newCartCost)
    }, [cartItems])

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    const deleteItemFromCart = (productToDelete)=>{
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }
    // Access from other files
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemFromCart, 
        deleteItemFromCart,
        cartItems, 
        numItems,
        totalCost};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}