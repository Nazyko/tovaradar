import { combineReducers, configureStore } from "@reduxjs/toolkit"
import searchReducer from "./searchSlice"
import cartReducer from "./cartSlice"


const rootReducer = combineReducers({
    search: searchReducer,
    cart: cartReducer,  
})


const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = setupStore()