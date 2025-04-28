import { screen, fireEvent } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import Navigation from '../navigation.component'
import { renderWithProviders } from '../../../../util/test/test.utils'
import { signOutStart } from '../../../../store/user/user.action'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}))

describe('Navigation tests', () => {
    test('should render a Sign In link and not Sign Out link if there is no currentUser', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i)
        expect(signInLinkElement).toBeInTheDocument()

        const signOutLinkElement = screen.queryByText(/sign out/i)
        expect(signOutLinkElement).toBeNull()  
    })

    test('should render Sign Out and not Sign in if there is a currentUser', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument()

        const signInLinkElement = screen.queryByText(/sign in/i)
        expect(signInLinkElement).toBeNull()    
    })

    test('should render cart dropdown if isCartDropDown is true', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        })

        const cardDropDownElement = screen.getByText(/go to checkout/i)
        expect(cardDropDownElement).toBeInTheDocument()
    })

    test('should not render cart dropdown if isCartDropDown is false', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })

        const cardDropDownElement = screen.queryByText(/go to checkout/i)
        expect(cardDropDownElement).toBeNull()
    })

    test('should dispatch signOutStart action when clicking on the Sign Out link', async () => {
        const mockDispatch = jest.fn()
        useDispatch.mockReturnValue(mockDispatch)
        
    
        renderWithProviders(<Navigation />, {
          preloadedState: {
            user: {
              currentUser: {},
            },
          },
        });
    
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    
        await fireEvent.click(screen.getByText(/sign out/i));
    
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
    
        mockDispatch.mockClear();
    })
})