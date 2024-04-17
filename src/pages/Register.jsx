import { useState } from "react";
import Footer from "../components/Footer"
import HeaderHome from "../components/HeaderHome"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {

    const [userData, setUserData] = useState({firstName:'', lastName:'', email:'', password:''});

    const navigate = useNavigate()

    const [firstNameLegend, setFirstNameLegend] = useState("")
    const [lastNameLegend, setLastNameLegend] = useState("")
    const [emailLegend, setEmailLegend] = useState("")
    const [passwordLegend, setPasswordLegend] = useState("")

    function inputText(e){
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    
    function submitRegister(e){
        e.preventDefault()


        if (firstName.value == "") {
            setFirstNameLegend("You have to enter a first name")
        } else {
            setFirstNameLegend("")
        }


        if (lastName.value == "") {
            setLastNameLegend("You have to enter a last name")
        } else {
            setLastNameLegend("")
        }


        if (email.value == "" || email.value.indexOf("@") == -1) {
            setEmailLegend("You have to enter an email")
        } else {
            setEmailLegend("")
        }


        if (password.value == "" || password.value.length < 6) {
            setPasswordLegend("You have to enter a password with at least 6 characters")
        } else {
            setPasswordLegend("")
        }





        axios.post("/api/auth/register", userData)
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Your account has been registered successfully!",
                text: "You will be redirecting to the login page",
              }).then(() => navigate("/login")
              )
        })
        .catch((err) => {
            if(err.response.data.includes("There is an account")){
                setEmailLegend("There is an account with this email")
            }
        })    
        }



    
    return(
        <>
        <HeaderHome/>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-2 items-center">
                <form className="pt-4 h-[850px] w-11/12 bg-blue-200 mb-4 mt-16 flex flex-col items-center md:w-2/3 lg:w-2/5 border-2 border-blue-500 shadow-xl shadow-blue-300 rounded gap-y-4 md:h-[870px] lg:h-[900px]" id="registerForm" onSubmit={submitRegister}>
                    <div className="flex items-center flex-col">
                        <img src="/logo2.jpg" className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] ml-5"></img>
                        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl lg:text-4xl lg:text-center">MINDHUB HOMEBANKING</h1>
                        <h1 className="text-2xl font-bold text-blue-800 lg:text-2xl mt-2">REGISTER FORM</h1>

                    </div>
    
    
                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">FIRST NAME:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your first name" id="firstName" name="firstName" onChange={inputText}></input>
                        <legend className="text-red-500 italic" id="legendType">{firstNameLegend}</legend>
                    </div>
    
                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">LAST NAME:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your last name" id="lastName" name="lastName" onChange={inputText}></input>
                        <legend className="text-red-500 italic" id="legendType">{lastNameLegend}</legend>
                    </div>
                        
                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">EMAIL:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your email" id="email" name="email" onChange={inputText}></input>
                        <legend className="text-red-500 italic" id="legendType">{emailLegend}</legend>
                    </div>

                    <div className="flex flex-col items-center w-full gap-y-[5px]">
                        <label className="font-bold">PASSWORD:</label>
                        <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your password" id="password" name="password" onChange={inputText}></input>
                        <legend className="text-red-500 italic text-center" id="legendType">{passwordLegend}</legend>
                    </div>

                    <div className="w-full flex flex-col items-center mt-2">
                        <button type="submit" className="bg-blue-700 w-3/4 h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-blue-500">REGISTER</button>
                        <legend className="text-red-500 italic text-center" id=""></legend>
                        <Link to="/login"><p className="italic text-blue-600 decoration-solid underline hover:text-blue-900 mt-2">Do you have an account? Login here</p></Link>
                    </div>

                    
    
                </form>
    
        </main>
        <Footer/>
        </>
        )
    }


export default Register