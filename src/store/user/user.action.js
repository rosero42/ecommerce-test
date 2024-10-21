import { createAction } from "../../util/reducer/reducer.util"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user) =>{
    console.log(`@RLR setCurrentUser ${user}`)
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}