import { createReducer } from "@reduxjs/toolkit";
import authActions from "../actions/auth.actions";

const { login, current, logout } = authActions

const initialState = {
    user: {
        name: "",
        email: "",
        logged: null
    },
    timeStamp: null,
    token: null
}

const authReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(login, (state, action) => {
        return {
            ...state,
            token: action.payload.token,
            timeStamp: action.payload.timeStamp
        }
    })
    .addCase(current, (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    })
})

export default authReducer;