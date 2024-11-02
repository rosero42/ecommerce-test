import { createSelector} from "reselect"

export const selectCartReducer = (state) => state.cart
//cartItems
export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

//cartCount
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
) 

//cartTotal
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
)

//isCartOpen
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)