import { AnyAction } from "redux"
import { UserData } from "../../util/firebase/firebase.utils"
import {
     signInFailed, 
     signInSuccess, 
     signOutFailed, 
     signOutSuccess, 
     signUpFailed 
    } from "./user.action"

export type UserState = {
    readonly currentUser: UserData | null
    readonly isLoading: Boolean
    readonly error: Error | null
}
const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (
    state = USER_INITIAL_STATE, 
    action: AnyAction
    ): UserState =>{
    // const {type, payload} = action
    if(signInSuccess.match(action)){
        return{
            ... state, 
            currentUser: action.payload
        }
    }

    if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)){
        return{
            ...state,
            error: action.payload
        }
    }

    if(signOutSuccess.match(action)){
        return{
            ...state,
            currentUser: null
        }
    }
    return state
}
