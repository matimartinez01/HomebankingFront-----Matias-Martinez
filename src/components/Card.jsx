import PropTypes from "prop-types"


const Card = (props) => {
    return(
        <div className="mt-10 w-[312px] h-[200px] flex flex-col rounded" style={{background: `url(/src/images/${props.cardColor}.jpg)`, backgroundSize: "contain"}}>
        <p className="text-xl font-bold text-gray-500 left-[240px] top-[5px] relative w-[70px]">{props.cardType}</p>
        <p className="relative top-[65px] left-[50px] text-xl font-bold text-gray-500 w-[210px]">{props.number}</p>
            <p className="relative top-[70px] font-bold text-gray-500 left-[20px] w-[150px]">{props.nameClient}</p>
            <div className="flex top-[70px] w-full flex-wrap relative gap-x-4 ml-[20px] w-[300px]">
                <p className="text-gray-500 font-bold">From: {props.fromDate}</p>
                <p className="text-gray-500 font-bold">Trhu: {props.trhuDate}</p>  
            </div>
            <p className="text-gray-500 relative top-[70px] left-[20px] font-bold w-[100px]">CVV: {props.cvv}</p>
        </div>
    )
    
}

Card.PropTypes = {
    number: PropTypes.string.isRequired,
    nameClient: PropTypes.string.isRequired,
    fromDate: PropTypes.string.isRequired,
    trhuDate: PropTypes.string.isRequired,
    cvv: PropTypes.string.isRequired,
    cardColor: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired
}


export default Card