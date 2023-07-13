import { createSlice } from "@reduxjs/toolkit";



export const nameTrainerSlice = createSlice({
    initialState: {
       
        nameTrainer: localStorage.getItem("nameTrainer") ?? "Pedro",
        dark: localStorage.getItem("dark") ?? false,
    },
    name: "nameTrainer",
    reducers: {
        setNameTrainer: (state, action) => {
            localStorage.setItem("nameTrainer", action.payload)
            state.nameTrainer = action.payload;

        },

        setdark: (state, action) => {
            localStorage.setItem("dark", action.payload)
            state.dark = action.payload;
        },

    }
}) 


export const { setNameTrainer, setdark } = nameTrainerSlice.actions;
export default nameTrainerSlice.reducer