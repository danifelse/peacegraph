import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../redux/store"

interface modalState {
    isOpen: boolean;
    slug: string
}

 const initialState: modalState = {
    isOpen: false,
    slug: ""
}

export const modalDeleteSlice = createSlice({
    name : "modalDelete",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true
            state.slug = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.slug = ""
        }
    }
})


export const { openModal, closeModal } = modalDeleteSlice.actions

export const selectModalDelete = (state: RootState) => state.modalDelete

export default modalDeleteSlice.reducer