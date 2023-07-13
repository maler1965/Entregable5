import { createSlice } from "@reduxjs/toolkit";

export const darkSlice = createSlice({
    initialState: {
        dark: localStorage.getItem("dark") ?? false,
        nameTrainer: localStorage.getItem("nameTrainer") ?? true,
    },
    name: "dark",
    reducers: {
        setdark: (state, action) => {
            localStorage.setItem("dark", action.payload)
            state.dark = action.payload;
        },

        setNameTrainer: (state, action) => {
            localStorage.setItem("nameTrainer", action.payload)
            state.nameTrainer = action.payload;
        },

    }

}
)


export const { setdark, setNameTrainer } = darkSlice.actions;
export default darkSlice.reducer