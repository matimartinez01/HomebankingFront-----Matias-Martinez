import Footer from "../components/Footer"
import Header from "../components/Header"
import actions from "../redux/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"
import authReducer from "../redux/reducers/auth.reducer"
import { useState, useEffect } from "react"
import axios from "axios"
import Option from "../components/Option"
import Swal from "sweetalert2"

const Transactions = () => {

    const user = useSelector((store) => store.authReducer.user)
    const dispatch = useDispatch();
    const login = actions.login
    const current = actions.current
    const [account, setAccount] = useState({})
    const [transaction, setTransaction] = useState({sourceAccount: "", description: "", destinationAccount: ""})
    
    const [legendAccount, setLegendAccount] = useState("")
    const [legendAmount, setLegendAmount] = useState("")
    const [legendDescription, setLegendDescription] = useState("")
    const [legendDestinationAccount, setLegendDestinationAccount] = useState("")
    const [legendTransaction, setLegendTransaction] = useState("")

    useEffect(() => {
        if(!user.logged && localStorage.getItem('token')) {
            axios.get("/api/clients/current", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(a => {
                dispatch(current(a.data))
                dispatch(login(localStorage.getItem('token')))
            })
        }
    }, [])

    let maxAmount = 0

    function selectOption(e){
        setAccount(user.accounts?.find(a => a.number == e.target.value))
        setTransaction({...transaction, sourceAccount: e.target.value})
    }

    maxAmount = account?.balance

    function inputText(e){
        setTransaction({...transaction, [e.target.name]: e.target.value})
    }
    function submitTransaction(e){
        e.preventDefault()
        
        if(sourceAccount.value == ""){
            setLegendAccount("Select an account")
        }else{
            setLegendAccount("")
        }

        if(sourceAccount.value == ""){
            setLegendAmount("Select an account")
        }
        else if(Number(amount.value) <= 0){
            setLegendAmount("The amount must be greater than 0")
        }else if (Number(amount.value) > maxAmount){
            setLegendAmount("The amount in this account is: " + maxAmount)
        }
        else{
            setLegendAmount("")
        }

        if(description.value == ""){
            setLegendDescription("You have to write a description")
        }else{
            setLegendDescription("")
        }

        if(destinationAccount.value == ""){
            setLegendDestinationAccount("Select an account")
        }else{
            setLegendDestinationAccount("")
        }

        if(maxAmount === 0){
            setLegendAccount("")
            setLegendDestinationAccount("")
            setLegendDescription("")
            setLegendAmount("")
            setLegendTransaction("You don't have money in this account")
        }else{
            setLegendTransaction("")
        }

        if(sourceAccount.value != "" && amount.value <= maxAmount && amount.value > 0 && description.value != "" && destinationAccount.value != ""){
            axios.post("/api/clients/current/transactions", 
            {destinationAccount: destinationAccount.value, sourceAccount: sourceAccount.value, amount: amount.value, description: description.value},
            {headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )
            .then(a => {
                
                Swal.fire({
                    icon: "success",
                    title: "Transaction completed successfully!",
                  }).then(() => window.location.reload());
            })
            .catch(err => {
                console.log(err.response.data)
                setLegendDestinationAccount(err.response.data)    
            })
        }
    }

    


    return (
        <>
        <Header/>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-8 items-center lg:gap-y-8">
        <form className="pt-4 h-[750px] w-11/12 bg-blue-200 mb-4 mt-16 flex flex-col items-center md:w-2/3 lg:w-2/5 border-2 border-blue-500 shadow-xl shadow-blue-300 rounded gap-y-2 md:h-[750px]" id="transaction" onSubmit={submitTransaction}>
                    <div className="flex items-center flex-col">
                        <img src="/logo2.jpg" className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] ml-5"></img>
                        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl lg:text-4xl">MAKE TRANSACTIONS</h1>
                    </div>
    
                    <div className="flex flex-col items-center mt-4 w-full">
                        <label className="font-bold">FROM ACCOUNT:</label>
                        <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" id="sourceAccount" name="sourceAccount" onChange={selectOption}>
                            <option value="">Select an account</option>
                            {user.accounts?.map(a => {
                                return <Option text={a.number} key={a.number} value={a.number} />
                            })}
                        </select>
                        <legend className="text-red-500 italic" id="legendAccount">{legendAccount}</legend>
                    </div>

    
                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">AMOUNT:</label>
                        <input type="number" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded"  placeholder="Enter the amount..." id="amount" name="amount" onChange={inputText}></input>
                        <legend className="text-red-500 italic" id="legendAccount">{legendAmount}</legend>
                    </div>
                        
                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">DESCRIPTION:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Description..." id="description" name="description" onChange={inputText}></input>
                        <legend className="text-red-500 italic" id="legendAccount">{legendDescription}</legend>
                    </div>

                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">DESTINATION ACCOUNT:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Destination account..." id="destinationAccount" name="destinationAccount" onChange={inputText}></input>
                        <legend className="text-red-500 italic text-center" id="legendAccount">{legendDestinationAccount}</legend>
                    </div>

                    <div className="w-full flex flex-col items-center mt-2">
                    <button type="submit" className="bg-green-500 w-[250px] h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-green-400">MAKE TRANSACTION</button>
                        <legend className="text-red-500 italic text-center" id="">{legendTransaction}</legend>
                    </div>

                    
    
                </form>



        </main>
        
        <Footer/>
        </>
    )
}


export default Transactions