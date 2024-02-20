import PropTypes from "prop-types"

const Option = (props) => {

    function selectOption(e) {
        console.log("hola")
    }


    return (
        <option onSelect={selectOption} value={props.value}>{props.text}</option>

    )
}

Option.PropTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default Option