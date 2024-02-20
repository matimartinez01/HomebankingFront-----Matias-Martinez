import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import Transaction from "../components/Transaction";
import axios from "axios";
import Account from "../components/Account";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"


const AccountClient = () => {
    
    const params = useParams();

    let [transactions, setTransactions] = useState([])
    let [account, setAccount] = useState([])


    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
        .then(a => {
            let accounts = a.data.accounts.find(a => a.id == params.id)
            setAccount(accounts)
            setTransactions(accounts.transactions)
        })
    }, []
    )

    
    
    return (
        <>
        <Header/>
        <main className="min-h-screen bg-blue-100 flex flex-col items-center gap-y-6 mb-10">
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl">YOUR SELECTED ACCOUNT</h1>
            <Account key={account.id} number={account.number} date={account.creationDate} mount={account.balance?.toLocaleString("en-US", {style:"currency", currency:"USD"})} id={account.id} ></Account>
            <div className="flex flex-col gap-y-5 w-full items-center md:flex-row md:gap-x-5 md:flex-wrap md:justify-center">
            {transactions.length > 0 ? 
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl mb-8 w-3/4">TRANSACTIONS RESUME: </h1> : 
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl w-4/5 mb-8">This account doesn't have transactions</h1>}
            {transactions.length > 0 ?
            <div className="bg-gray-800 w-11/12 min-h-[200px] mt-10 flex flex-col gap-y-2 md:w-4/5 text-sm lg:w-1/2">
            <div className="w-full bg-gray-700 gap-x-1 text-center items-center md:text-lg font-bold text-white flex">
              <p className="w-1/6">TYPE</p>
              <p className="w-1/6">AMOUNT</p>
              <p className="w-2/6">DATE</p>
              <p className="w-2/6">DESCRIPTION</p>
            </div>
              {transactions.map(a => {
                    return <Transaction key={a.id} type={a.type.toUpperCase()} amount={a.amount?.toLocaleString("en-US", {style:"currency", currency:"USD"})} date={a.date} description={a.description}></Transaction>
            })}
            </div> : ""}
            
            </div>
            <Link to={"/"} className="text-xl text-black bg-blue-600 p-2 font-bold text-white rounded border border-2 border-blue-900 hover:scale-105 hover:shadow-md hover:shadow-blue-300 hover:bg-blue-500">GO TO YOUR ACCOUNTS</Link>
        </main>
        <Footer/>
        </>
    )
}


export default AccountClient