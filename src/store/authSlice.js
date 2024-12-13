import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    animation: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {   // these are called actions
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        anim: (state) => {
            state.animation = true;
            console.log(state.animation);
        }
    }
})

export const { login, logout, anim } = authSlice.actions
export default authSlice.reducer;