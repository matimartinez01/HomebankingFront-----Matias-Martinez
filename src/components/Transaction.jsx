import PropTypes from "prop-types"


const Transaction = (props) => {
    let type = props.type
    let borderColor = ""
    let textColor = ""
    type = type.toUpperCase()
    type == "DEBIT" ? textColor = "text-green-500" : textColor = "text-red-500"


    return (
        <div className="w-full bg-gray-700 flex gap-x-1 text-center items-center md:text-lg md:font-semibold text-white">
              <p className={"w-1/6 " + textColor}>{props.type}</p>
              <p className="w-1/6">{props.amount}</p>
              <p className="w-2/6">{props.date}</p>
              <p className="w-2/6">{props.description}</p>
            </div>
    )
}

Transaction.PropTypes = {
    type: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}


export default Transaction