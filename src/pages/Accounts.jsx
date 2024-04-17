import React, { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from 'axios';
import Account from "../components/Account";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions"
import Swal from 'sweetalert2'

const Accounts = () => {

    const user = useSelector((store) => store.authReducer.user)
    const dispatch = useDispatch();
    const current = authActions.current
    const login = authActions.login
    const [accountText, setAccountText] = useState("")

    useEffect(() => {
        if(!user.logged && localStorage.getItem('token')){
            axios.get("/api/clients/current", {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            .then(a => {
                dispatch(current(a.data))
                dispatch(login(localStorage.getItem('token')))
            })
        }
    },[]
    )



    function createAccount(e){
        e.preventDefault()
        axios.post("/api/clients/current/accounts",
        {},
        {headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(a => {
            Swal.fire({
                icon: "success",
                title: "Account created successfully!",
              }).then(() => window.location.reload());
            setAccountText("")
    })
        .catch(err => 
            setAccountText(err.response.data),
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have already 3 accounts",
                confirmButtonColor: "#666666"
              })
              )
    }

    return ( 
        <>
        <Header/>
        <img src="/banner_accounts.jpg" className="w-full lg:h-[700px] lg:object-cover"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-8 items-center lg:gap-y-24">
            <div className="flex flex-col">
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl">{"Welcome " + user.firstName + " " + user.lastName + "!"}</h1>
            <p className="text-2xl text-center pt-4">Your accounts:</p>
            </div>
            <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8 lg:flex-wrap lg:justify-center">
            {user.accounts?.map(a => {
                return <Account key={a.id} button={true} id={a.id} number={a.number} date={a.creationDate} mount={a.balance.toLocaleString("en-US", {style:"currency", currency:"USD"})}/>
            })}
            </div>
            <div className="flex flex-col items-center mt-4 w-full mb-6">
                <button onClick={createAccount} type="submit" className=" h-14 w-[250px] bg-green-700 rounded border border-green-800 border-2 font-bold text-white text-xl hover:scale-105 hover:shadow-md hover:shadow-green-300 hover:bg-green-500">CREATE NEW ACCOUNT</button>
                <legend className="text-red-500 italic" id="legendType">{accountText}</legend>
            </div>
        </main>
        <Footer/>
        </>
    )

}


export default Accounts