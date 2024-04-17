import PropTypes from "prop-types"


const Loan = (props) => {

    return (
        <div className="h-[150px] w-[300px] bg-white border border-blue-500 border-2 rounded flex flex-col text-lg gap-y-2 p-2 md:w-[350px] lg:w-[300px]">
            <h1 className="text-center font-bold text-2xl text-blue-900">{props.name.toUpperCase()}</h1>
            <p className="mx-2"><span className="font-bold text-blue-900">Payments:</span> {props.payments}</p>
            <div className="mx-2">
                <p className="font-bold text-blue-900">Amount:</p>
                <p className="ml-28 font-bold text-red-600 text-2xl text-right"> {props.amount}</p>
            </div>
        </div>

    )

}

Loan.PropTypes = {
    name: PropTypes.string.isRequired,
    payments: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
}

export default Loan