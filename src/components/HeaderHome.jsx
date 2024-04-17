import { Link } from "react-router-dom"
import Anchor from "./Anchor"
import PropTypes from "prop-types"


const HeaderHome = () => {

    return (
        <header className="flex justify-between items-center px-2 pt-2 bg-blue-200 md:px-4 lg:px-8">
        <img src="/logo2.jpg" className="h-14 md:h-20"/>
            <nav className="flex gap-x-2 md:gap-x-6 lg:gap-x-16">
                {
                    links_header.map(a => {
                       return <Anchor key={a.href} href={a.href} text={a.text}>{a.text}</Anchor>
                    })
                }
            </nav>
        </header>
    )

}


    const links_header = [
        {href:"/login", text:"Login"},
        {href:"/register", text:"Register"},
        ]
          
        
        export default HeaderHome


