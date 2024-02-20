import React, { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from 'axios';
import Account from "../components/Account";

const Accounts = () => {

    let [client, setClient] = useState([]);
    let [accounts, setAccounts] = useState([]);

    useEffect(() => {
    axios("http://localhost:8080/api/clients/1").then(a => {
        setClient(a.data)
        setAccounts(a.data.accounts)})
    }, []
    )

    function createAccount(e){
        e.preventDefault()
        alert("Account created")
    }

    return ( 
        <>
        <Header/>
        <img src="/src/images/banner_accounts.jpg" className="w-full lg:h-[700px] lg:object-cover"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-8 items-center lg:gap-y-24">
            <div className="flex flex-col">
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl">{"Welcome " + client.firstName + " " + client.lastName + "!"}</h1>
            <p className="text-2xl text-center pt-4">Your accounts:</p>
            </div>
            <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
            {accounts.map(a => {
                return <Account key={a.id} button={true} id={a.id} number={a.number} date={a.creationDate} mount={a.balance.toLocaleString("en-US", {style:"currency", currency:"USD"})}/>
            })}
            </div>
            <button onClick={createAccount} type="submit" className="mb-6 h-14 w-[250px] bg-green-700 rounded border border-green-800 border-2 font-bold text-white text-xl hover:scale-105 hover:shadow-md hover:shadow-green-300 hover:bg-green-500">CREATE NEW ACCOUNT</button>
        </main>
        <Footer/>
        </>
    )

}


export default Accounts