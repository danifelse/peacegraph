import {configureStore } from "@reduxjs/toolkit";
import { modalDeleteSlice } from "./features/modals/modalDelete";

export const makeStore = () => {
    return  configureStore({
        reducer: {
            modalDelete : modalDeleteSlice.reducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']