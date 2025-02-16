import { Middleware, AnyAction } from "redux"
import { RootState } from "../store"

export const loggerMiddleWare: Middleware<{}, RootState> = (store) => (next) => (action) => {
    var act = action as AnyAction
    if(!act.type){
        return next(action)
    }

    console.log('type', act.type)
    console.log('payload', act.payload)
    console.log('currentState', store.getState())

    next(action)

    console.log('next state: ', store.getState())
}