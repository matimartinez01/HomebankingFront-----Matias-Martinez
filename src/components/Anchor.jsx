import React from "react"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

const Anchor = (props) => {
    
    return(
        <NavLink to={props.href} className={({isActive, isPendindg}) => 
        isActive ? "text-base font-extrabold md:text-xl text-blue-900 underline decoration-2" : 
        "text-base font-semibold md:text-xl text-blue-900 hover:scale-105 hover:text-white"}>
        {props.text}</NavLink>
    )   
}

//

Anchor.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    children: PropTypes.any
}

export default Anchor