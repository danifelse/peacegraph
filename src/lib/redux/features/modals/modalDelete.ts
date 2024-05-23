import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../redux/store"

interface modalState {
    isOpen: boolean;
    id?: string
}

 const initialState: modalState = {
    isOpen: false,
    id: ""
}

export const modalDeleteSlice = createSlice({
    name : "modalDelete",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.id = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.id = ""
        }
    }
})


export const { openModal, closeModal } = modalDeleteSlice.actions

export const selectModalDelete = (state: RootState) => state.modalDelete

export default modalDeleteSlice.reducer