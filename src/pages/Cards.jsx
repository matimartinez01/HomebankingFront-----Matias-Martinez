import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Header from "../components/Header"
import axios from 'axios';
import Card from "../components/Card";
import { text } from "@fortawesome/fontawesome-svg-core";

const Cards = () => {

    const [cardsClient, setCards] = useState([])
    const [isActive, setActive] = useState()
    const [textLegendType, setTextLegendType] = useState("")
    const [textLegendColor, setTextLegendColor] = useState("")


    useEffect(() => {
        axios("http://localhost:8080/api/clients/1")
        .then(a => {
            setCards(a.data.cards)})
    }, []
    )



    function submitCard(e){
        e.preventDefault();
        let card = {cardColor: "", cardType: ""}
        if(selectType.value == ""){
            setTextLegendType("You have to choose a type of card")
        }else{
            setTextLegendType("")
        }

        if(selectColor.value == ""){
            setTextLegendColor("You have to choose a color of card")
        }else{
            setTextLegendColor("")
        }
        

        if (selectType.value != "" && selectColor.value != ""){
            card.cardType = selectType.value.toUpperCase()
            card.cardColor = selectColor.value.toUpperCase()
            alert("Card request is completed")
            console.log(card)
            selectType.value = ""
            selectColor.value = ""
            //axios.post("http://localhost:8080/api/clients/1", {card})
        }
    }


    return (
        <>
        <Header/>
        <img src="/src/images/banner_cards.jpg" className="object-contain w-full lg:h-[400px] lg:object-fill"></img>
        <main className="min-h-screen bg-blue-100 flex flex-col gap-y-2 items-center">
        {cardsClient.length > 0 ?
        <h1 className="text-3xl font-bold text-center pt-4">YOUR CARDS: </h1> :
        <h1 className="text-3xl font-bold text-center pt-4 mt-4">YOU DON'T HAVE CARDS</h1> }
        <div className="flex flex-col lg:flex-row lg:gap-x-10 mb-10">
            {cardsClient.map(a => {
                    return <Card key={a.id} number={a.number.replaceAll("-", " ")} cardType={a.cardType} cardColor={a.cardColor} nameClient={a.nameClient.toUpperCase()} trhuDate={a.trhuDate.slice(5,7) + "/" + a.trhuDate.slice(2,4)} fromDate={a.fromDate.slice(5,7) + "/" + a.fromDate.slice(2,4)} 
                    cvv={a.cvv} />
            })}
        </div>
        
        <h1 className="text-3xl font-bold text-center">REQUEST A CARD:</h1>
        <form className="h-[250px] w-3/4 bg-blue-200 mb-4 flex flex-col gap-y-2 items-center md:w-1/2 lg:w-1/5 border-2 border-blue-500 shadow-md shadow-blue-300 rounded mt-10">
                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">TYPE OF CARD:</label>
                    <select className="w-3/4 text-center" id="selectType">
                        <option value="">Select an option</option>
                        <option value="debit">DEBIT</option>
                        <option value="credit">CREDIT</option>
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendType}</legend>
                </div>

                <div className="flex flex-col items-center mt-4 w-full">
                    <label className="font-bold">COLOR OF CARD:</label>
                    <select className="w-3/4 text-center" id="selectColor">
                        <option value="">Select an option</option>
                        <option value="gold">GOLD</option>
                        <option value="silver">SILVER</option>
                        <option value="titanium">TITANIUM</option>
                    </select>
                    <legend className="text-red-500 italic" id="legendType">{textLegendColor}</legend>
                </div>


                <button type="submit" className="bg-green-600 w-[200px] h-[40px] rounded text-xl font-bold text-white p-1 hover:bg-green-500" onClick={submitCard}>REQUEST CARD</button>
            </form>

        </main>
        <Footer/>
        </>
    )
}

export default Cards