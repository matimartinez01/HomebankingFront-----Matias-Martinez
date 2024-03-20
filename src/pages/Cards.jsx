import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from 'axios';
import Card from "../components/Card";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions"
import authReducer from "../redux/reducers/auth.reducer"
import Swal from "sweetalert2";

const Cards = () => {

    const user = useSelector((store) => store.authReducer.user)
    const userCards = user.cards
    const [isActive, setActive] = useState()
    const [textLegendType, setTextLegendType] = useState("")
    const [textLegendColor, setTextLegendColor] = useState("")
    const [card, setCard] = useState({cardColor: "", cardType: ""})
    const [textColorAndType, setColorAndType] = useState("")
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

    function handleChange(e){
        setCard({...card, [e.target.name]: e.target.value.toUpperCase()})
    }




    function submitCard(e){
        e.preventDefault();
        if(cardType.value == ""){
            setTextLegendType("You have to choose a type of card")
            setColorAndType("")
        }else{
            setTextLegendType("")
        }

        if(cardColor.value == ""){
            setTextLegendColor("You have to choose a color of card")
            setColorAndType("")
        }else{
            setTextLegendColor("")
        }
        


        if (cardType.value != "" && cardColor.value != ""){
            
            axios.post("/api/clients/current/cards", 
            {cardColor: card.cardColor, cardType: card.cardType},
            {headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    icon: "success",
                    title: "Card requested successfully!",
                  }).then(() => window.location.reload());
            })
            .catch(err => {
                console.log(err.response)
                if(err.response.data.includes("You already have one card with")){
                    setColorAndType(err.response.data)
                }
            })
        }
    }


    return (
        <>
        <Header/>
        <img src="/banner_cards.jpg" className="object-contain w-full lg:h-[400px] lg:object-fill"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-2 items-center">
        {userCards?.length > 0 ?
        <h1 className="text-3xl font-bold text-center pt-4">YOUR CARDS: </h1> :
        <h1 className="text-3xl font-bold text-center pt-4 mt-4">YOU DON'T HAVE CARDS</h1> }
        <div className="flex flex-col lg:flex-row lg:gap-x-10 lg:flex-wrap mb-10 lg:justify-center lg:w-4/5">
            {userCards?.map(a => {
                    return <Card key={a.id} number={a.number.replaceAll("-", " ")} cardType={a.cardType} cardColor={a.cardColor} nameClient={a.nameClient.toUpperCase()} trhuDate={a.trhuDate.slice(5,7) + "/" + a.trhuDate.slice(2,4)} fromDate={a.fromDate.slice(5,7) + "/" + a.fromDate.slice(2,4)} 
                    cvv={a.cvv} />
            })}
        </div>
        
            <form className="pt-4 h-[500px] w-11/12 bg-blue-200 mb-4 mt-4 flex flex-col items-center md:h-[550px] md:w-2/3 lg:w-2/5 border-2 border-blue-500 shadow-xl shadow-blue-300 rounded gap-y-2 ">
                    <div className="flex items-center flex-col">
                        <img src="/logo2.jpg" className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] ml-5"></img>
                        <h1 className="text-2xl font-extrabold text-blue-800 md:text-3xl lg:text-4xl">REQUEST CARD</h1>
                    </div>
                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">TYPE OF CARD:</label>
                    <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" id="cardType" onChange={handleChange} name="cardType">
                        <option value="">Select an option</option>
                        <option value="debit">DEBIT</option>
                        <option value="credit">CREDIT</option>
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendType}</legend>
                </div>

                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">COLOR OF CARD:</label>
                    <select className="w-3/4 text-center h-[40px] border-2 border-blue-500 rounded" id="cardColor" onChange={handleChange} name="cardColor">
                        <option value="">Select an option</option>
                        <option value="gold">GOLD</option>
                        <option value="silver">SILVER</option>
                        <option value="titanium">TITANIUM</option>
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendColor}</legend>
                </div>

                <div className="flex flex-col items-center mt-4 w-full">
                    <button type="submit" className="bg-green-600 w-[200px] h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-green-500" onClick={submitCard}>REQUEST CARD</button>
                    <legend className="text-red-500 italic text-center" id="legendType">{textColorAndType}</legend>
                </div>

            </form>

        </main>
        <Footer/>
        </>
    )
}

export default Cards