import { createAction } from "@reduxjs/toolkit";


const current = createAction('CURRENT', (data) => {

    return{
        payload: {
            ...data,
            logged: true,
        }
    }
})

const login = createAction('LOGIN', (token) => {
    localStorage.setItem("token", token)
    localStorage.removeItem("expirated")
    return{
        payload: {
            token,
            timeStamp: Date.now()
        }
    }
})



const actions = {
    current,
    login,
    
}


export default actions