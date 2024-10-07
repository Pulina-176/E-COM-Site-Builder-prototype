import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart.js'
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({cart: cartReducer}) // add here if any more reducers exist

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,  // all reducers are combined
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export const persistor = persistStore(store);