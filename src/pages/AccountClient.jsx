import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import Transaction from "../components/Transaction";
import axios from "axios";
import Account from "../components/Account";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions"

const AccountClient = () => {
    
    const user = useSelector((store) => store.authReducer.user)
    const params = useParams();
    let transactions = {}
    let account = {}
    const login = authActions.login
    const current = authActions.current
    const dispatch = useDispatch()


    useEffect(() => {
        if(!user.logged && localStorage.getItem('token')){
            axios.get("/api/clients/current", {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                dispatch(current(res.data))
                dispatch(login(localStorage.getItem('token')))
            })
        }
    }, []
    )

    account = user.accounts?.find(account => account.id == params.id)
    transactions = account?.transactions
    
        
    return (
        <>
        <Header/>
        <main className="min-h-screen bg-blue-100 flex flex-col items-center gap-y-6 mb-10">
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl">YOUR SELECTED ACCOUNT</h1>
            <Account key={account?.id} number={account?.number} date={account?.creationDate} mount={account?.balance?.toLocaleString("en-US", {style:"currency", currency:"USD"})} id={account?.id} ></Account>
            <div className="flex flex-col gap-y-5 w-full items-center md:flex-row md:gap-x-5 md:flex-wrap md:justify-center">
            {transactions?.length > 0 ? 
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl mb-8 w-3/4">TRANSACTIONS RESUME: </h1> : 
            <h1 className="text-3xl text-center pt-4 font-bold lg:pt-20 lg:text-4xl w-4/5 mb-8">This account doesn't have transactions</h1>}
            {transactions?.length > 0 ?
            <div className="bg-gray-800 w-11/12 min-h-[200px] max-h-[250px] mt-2 flex flex-col gap-y-2 md:w-4/5 text-sm lg:w-1/2 overflow-y-scroll p-1">
            <div className="w-full bg-gray-700 gap-x-1 text-center items-center md:text-lg font-bold text-white flex">
              <p className="w-1/6">TYPE</p>
              <p className="w-1/6 text-right">AMOUNT</p>
              <p className="w-2/6">DATE</p>
              <p className="w-2/6">DESCRIPTION</p>
            </div>
              {transactions?.map(a => {
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