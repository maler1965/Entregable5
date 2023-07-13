

import { configureStore } from "@reduxjs/toolkit";

import darkSlice from "./slices/dark.slice";

export default configureStore({
    reducer: {
        
        darkSlice
    }
})