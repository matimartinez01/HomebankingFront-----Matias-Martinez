import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import HeaderHome from "../components/HeaderHome"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import authActions from "../redux/actions/auth.actions"



const Login = () => {

    const [userData, setUserData] = useState({email:'', password:''})
    const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const expirated = localStorage.getItem('expirated')
    const [tokenExpirated, setTokenExpirated] = useState("")

    

    useEffect(() => {
        if(expirated){
            setTokenExpirated("Your token has expired. Please, login again")
        }
        else{
            setTokenExpirated("")
        }
    }, [expirated])

    function inputText(e){
        setUserData({...userData, [e.target.name]: e.target.value})
        
    }

    function submitLogin(e){
        e.preventDefault()
        axios.post("/api/auth/login", userData)
        .then((res) => {
            setInvalidEmailOrPassword("")
            dispatch(authActions.login (res.data))
            dispatch(authActions.current(res.data))
            if(res.data){
                axios.get("/api/clients/current", {
                    headers:{
                        Authorization: `Bearer ${res.data}`
                    }
                }
                )
                .then(a => {
                    dispatch(authActions.current(a.data))
                    dispatch(authActions.login(localStorage.getItem('token')))
                })
            }
            navigate("/")
        })
        .catch((err) => {
            setInvalidEmailOrPassword(err.response.data)
        })    
    }





    return(
    <>
    <HeaderHome/>
    <main className="min-h-screen bg-blue-100 flex flex-col gap-y-2 items-center">
            <form className="pt-4 h-[550px] w-11/12 bg-blue-200 mb-4 mt-16 flex flex-col items-center md:h-[570px] lg:h-[590px] md:w-2/3 lg:w-2/5 border-2 border-blue-500 shadow-xl shadow-blue-300 rounded gap-y-4">
                <div className="flex items-center flex-col">
                    <img src="/logo2.jpg" className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] ml-5"></img>
                    <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl lg:text-4xl lg:text-center">MINDHUB HOMEBANKING</h1>
                    <legend className="text-red-500 italic text-center" id="">{tokenExpirated}</legend>

                </div>


                <div className="flex flex-col items-center w-full gap-y-[5px]">
                    <label className="font-bold">EMAIL:</label>
                    <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your email" id="email" name="email" onChange={inputText}></input>
                </div>

                <div className="flex flex-col items-center w-full gap-y-[5px]">
                    <label className="font-bold">PASSWORD:</label>
                    <input type="text" className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" placeholder="Enter your password" id="password" name="password" onChange={inputText}></input>
                </div>
    
                <div className="w-full flex flex-col items-center">
                    <button type="submit" className="bg-blue-700 w-3/4 h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-blue-500" onClick={submitLogin}>LOGIN</button>
                    <legend className="text-red-500 italic text-center" id="">{invalidEmailOrPassword}</legend>
                    <Link to="/register"><p className="italic text-blue-600 decoration-solid underline hover:text-blue-900 mt-2">Don't have an account? Register</p></Link>
                </div>

            </form>

    </main>
    <Footer/>
    </>
    )
}


export default Login