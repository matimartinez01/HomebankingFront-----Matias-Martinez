import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Account = (props) => {

    return(
        <div className="border-2 border-blue-500 shadow-md shadow-blue-300 rounded text-xl flex flex-col gap-y-6 p-4 pl-6 bg-white h-[280px] w-[350px] md:w-[420px]">
            <p className="text-2xl font-bold text-center text-blue-800 md:text-3xl lg:text-4xl">{props.number}</p>
            <p><span className="font-bold">Creation date: </span>{props.date}</p>
            <div>
                <p><span className="font-bold">Mount: </span> </p>
                <p className="font-bold text-4xl ml-24 text-green-500">{props.mount}</p>
            </div>
            {props.button == true ? 
            <Link key={props.number} to={`/accounts/${props.id}`} className="w-30">
            <button className="w-30 bg-blue-700 p-2 rounded font-bold text-white hover:scale-105 hover:bg-blue-500">+ INFO</button>
            </Link> : ""}
        </div>
    )

}

Account.PropTypes = {
    number: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    mount: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    button: PropTypes.bool.isRequired
}

export default Account