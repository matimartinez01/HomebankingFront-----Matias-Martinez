import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from "axios"
import Loan from "../components/Loan"
import Option from "../components/Option"


const Loans = () => {

    const [loansOfAccount, setLoans] = useState([])
    const [loanRequest, setLoansRequest] = useState([])
    const [loanPayments, setLoanPayments] = useState([])
    const [clientAccounts, setClientAccounts] = useState([])
    const [maxAmount, setMaxAcount] = useState([])
    const [textLegendLoan, setLegendLoan] = useState("")
    const [textLegendAccount, setLegendAccount] = useState("")
    const [textLegendPayments, setLegendPayments] = useState("")
    const [textLegendAmount, setLegendAmount] = useState("")

    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
        .then(a => {
            setLoans(a.data.loans)
            setClientAccounts(a.data.accounts.map(a => a.number))
        })
    },[]
    )

    useEffect(() => {
        axios("http://localhost:8080/api/loan/")
        .then(a => {
            setLoansRequest(a.data)
        })        
    }, []
    )



   function selectOption(e){
    let nameLoan = e.target.value
    let loanType = []
    loanType = loanRequest.find(a => a.name == nameLoan)
    let loanTypePayments = loanType?.payments
    let loanMaxAcount = loanType?.maxAmount
    setLoanPayments(loanTypePayments)
    setMaxAcount(loanMaxAcount)
   }

   function submitLoan(e){
    e.preventDefault()
    let loan = {name: "",
    account: "",
    maxAmount: "",
    payments: ""}

    if(select1.value == ""){
        setLegendLoan("You have to choose a loan type")
    }else{
        setLegendLoan("")
    }

    if(select2.value == ""){
        setLegendAccount("You have to choose an account")
    }else{
        setLegendAccount("")
    }

    if(select3.value == ""){
        setLegendPayments("You have to choose how many payments")
    }else{
        setLegendPayments("")
    }

    if(Number(inputMaxAmount.value > Number(inputMaxAmount.max)) || Number(inputMaxAmount.value) <= 0){
        setLegendAmount("The max amount you can take in this loan is: " + inputMaxAmount.max)
    }else{
        setLegendAmount("")
    }


    if(select1.value != "" && select2.value != "" && select3.value != "" && Number(inputMaxAmount.value) <= Number(inputMaxAmount.max) && Number(inputMaxAmount.value) > 0){
        loan.name = select1.value
        loan.account = select2.value
        loan.maxAmount = select3.value
        loan.payments = inputMaxAmount.value
        console.log(loan)
        alert("Loan request is completed")
        select1.value = ""
        select2.value = ""
        select3.value = ""
        inputMaxAmount.value = ""
        //axios.post("http://localhost:8080/api/clients/1", {loan})
    }
   }



    return (
        <>

        <Header/>
        <img src="/src/images/banner_loans.jpg" className="w-full h-[200px] md:h-[350px] lg:h-[500px]"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-8 items-center lg:gap-y-8">
            {loansOfAccount.length > 0 ?
            <h1 className="text-3xl font-bold mt-6">ACTIVE LOANS</h1> :
            <h1 className="text-3xl font-bold mt-6">YOU DON'T HAVE ACTIVE LOANS</h1>}
            <div className="flex flex-col w-full items-center gap-y-2 md:flex-row md:justify-center md:gap-x-4">
            {loansOfAccount.map(a => {
                return <Loan key={a.id} name={a.name} payments={a.payments} amount={a.amount.toLocaleString("en-US", {style:"currency", currency:"USD"})}/>
            })}
            </div>
            <h1 className="text-3xl font-bold mt-6">REQUEST A LOAN</h1>
            <form className="h-[400px] w-11/12 bg-blue-200 mb-4 flex flex-col gap-y-2 items-center md:w-1/2 lg:w-1/5 border-2 border-blue-500 shadow-md shadow-blue-300 rounded">
                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">TYPE OF LOAN:</label>
                    <select className="w-3/4 text-center" onChange={selectOption} id="select1">
                        <option value="">Select an option</option>
                        {loanRequest?.map(a => {
                            return <Option key={a.id} text={a.name} value={a.name} />
                        })}
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendLoan}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">ACCOUNT:</label>
                    <select className="w-3/4 text-center" id="select2">
                        <option value="">Select an account</option>
                        {clientAccounts.map(a => {
                            return <Option text={a} key={a} value={a} /> }
                        )}
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendAccount}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">AMOUNT:</label>
                    <input type="number" className="w-3/4 text-center" placeholder="Type an amount" min={1} max={maxAmount} id="inputMaxAmount"></input>
                    <legend className="text-red-500 italic text-center" id="legendType">{textLegendAmount}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">PAYMENTS:</label>
                    <select className="w-3/4 text-center" id="select3">
                    <option value="">Select an option</option>
                    {loanPayments?.map(a => {
                            return <Option text={a} key={a} value={a} />
                        })}   
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendPayments}</legend>
                </div>

                <button type="submit" className="bg-green-500 w-[200px] h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-green-400" onClick={submitLoan}>REQUEST LOAN</button>
            </form>
        </main>
        <Footer/>

        </>
    )

}

export default Loans