import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from "axios"
import Loan from "../components/Loan"
import Option from "../components/Option"
import { useDispatch, useSelector} from "react-redux"
import authActions from "../redux/actions/auth.actions"
import Swal from "sweetalert2"


const Loans = () => {

    const user = useSelector((store) => store.authReducer.user)
    const [loanRequest, setLoansRequest] = useState([])
    const [loanPayments, setLoanPayments] = useState([])
    const [maxAmount, setMaxAcount] = useState([])
    const [textLegendLoan, setLegendLoan] = useState("")
    const [textLegendAccount, setLegendAccount] = useState("")
    const [textLegendPayments, setLegendPayments] = useState("")
    const [textLegendAmount, setLegendAmount] = useState("")
    const [loanRepeated, setLoanRepeated] = useState("")
    const current = authActions.current
    const login = authActions.login
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

    

    useEffect(() => {
        axios.get("/api/loan")
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
    amount: "",
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
        switch(select1.value){
            case "Mortgage": loan.name = 1; break;
            case "Personal": loan.name = 2; break;
            case "Automotive": loan.name = 3; break;
        }
        loan.account = select2.value
        loan.amount = inputMaxAmount.value
        loan.payments = select3.value
        axios.post("/api/clients/current/loan", 
        {loanID: loan.name, amount: loan.amount, payments: loan.payments, accountDestination: loan.account},
        {headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
        .then(res => {
            Swal.fire({
                icon: "success",
                title: "Loan requested successfully!",
              }).then(() => window.location.reload());
        })
        .catch(err => {
            if(err.response.data.includes("You already have")){
                setLoanRepeated(err.response.data)
            }
            console.log(err.response)
        })
    }
   }



    return (
        <>

        <Header/>
        <img src="/banner_loans.jpg" className="w-full h-[200px] md:h-[350px] lg:h-[500px]"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-8 items-center lg:gap-y-8">
            {user.loans?.length > 0 ?
            <h1 className="text-3xl font-bold mt-6">ACTIVE LOANS</h1> :
            <h1 className="text-3xl font-bold mt-6">YOU DON'T HAVE ACTIVE LOANS</h1>}
            <div className="flex flex-col w-full items-center gap-y-2 lg:flex-row md:justify-center md:gap-x-4">
            {user.loans?.map(a => {
                return <Loan key={a.id} name={a.name} payments={a.payments} amount={a.amount.toLocaleString("en-US", {style:"currency", currency:"USD"})}/>
            })}
            </div>
            <form className="pt-4 h-[680px] w-11/12 bg-blue-200 mb-4 mt-16 flex flex-col items-center md:h-[730px] md:w-3/5 lg:w-2/5 border-2 border-blue-500 shadow-xl shadow-blue-300 rounded gap-y-2">
                    <div className="flex items-center flex-col">
                        <img src="/logo2.jpg" className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] ml-5"></img>
                        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl lg:text-4xl">REQUEST A LOAN</h1>
                    </div>

                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">TYPE OF LOAN:</label>
                    <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" onChange={selectOption} id="select1">
                        <option value="">Select an option</option>
                        {loanRequest?.map(a => {
                            return <Option key={a.id} text={a.name} value={a.name} />
                        })}
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendLoan}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">ACCOUNT:</label>
                    <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" id="select2">
                        <option value="">Select an account</option>
                        {user.accounts?.map(a => {
                            return <Option text={a.number} key={a.number} value={a.number} /> }
                        )}
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendAccount}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">AMOUNT:</label>
                    <input type="number" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Type an amount" min={1} max={maxAmount} id="inputMaxAmount"></input>
                    <legend className="text-red-500 italic text-center" id="legendType">{textLegendAmount}</legend>
                </div>

                <div className="flex flex-col items-center w-full">
                    <label className="font-bold">PAYMENTS:</label>
                    <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" id="select3">
                    <option value="">Select an option</option>
                    {loanPayments?.map(a => {
                            return <Option text={a} key={a} value={a} />
                        })}   
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendPayments}</legend>
                </div>
                
                <div className="flex flex-col items-center mt-4 w-full">
                    <button type="submit" className="bg-green-500 w-[200px] h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-green-400" onClick={submitLoan}>REQUEST LOAN</button>
                    <legend className="text-red-500 italic" id="legendType">{loanRepeated}</legend>
                </div>
                
            </form>
        </main>
        <Footer/>

        </>
    )

}

export default Loans