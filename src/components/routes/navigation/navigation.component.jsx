import { Fragment } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo} from '../../../assets/crown.svg'
import CartIcon from "../../cart-icon/cart-icon.component"
import CartDropdown from "../../cart-dropdown/cart-dropdown.component"
import { LogoContainer, NavLink, NavLinkContainer, NavigationContainer } from "./navigation.styles.jsx"
import { selectCurrentUser } from "../../../store/user/user.selector.js"
import { selectIsCartOpen } from "../../../store/cart/cart.selector.js"
import { signOutStart } from "../../../store/user/user.action.js"

const Navigation = () =>{
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutUser = () =>{
        dispatch(signOutStart())
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
