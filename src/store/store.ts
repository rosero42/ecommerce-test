import {compose, createStore, applyMiddleware, Middleware } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
import { loggerMiddleWare } from './middleware/logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = 
    [process.env.NODE_ENV !== 'production' 
    && loggerMiddleWare, sagaMiddleware].filter((middleWare): middleWare is Middleware=> Boolean(middleWare))

const composeEnhancer = (process.env.NODE_ENV !== 'production' 
&& window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)