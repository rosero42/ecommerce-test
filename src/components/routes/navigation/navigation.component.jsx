import { Fragment, useContext } from "react"
import { useSelector } from "react-redux"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import CartIcon from "../../cart-icon/cart-icon.component"
import CartDropdown from "../../cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../../contexts/cart.context"
import { signOutUser } from "../../../util/firebase/firebase.utils"
import { LogoContainer, NavLink, NavLinkContainer, NavigationContainer } from "./navigation.styles.jsx"
import { selectCurrentUser } from "../../../store/user/user.selector.js"

const Navigation = () =>{
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext)
    const goToCheckout = () =>{

    }
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className="logo"/>
            </LogoContainer>
            <NavLinkContainer>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='auth'>SIGN IN</NavLink>
                    )
                }
            <CartIcon></CartIcon>
            </NavLinkContainer>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation
