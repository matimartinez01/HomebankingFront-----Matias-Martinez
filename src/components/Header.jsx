import { Link } from "react-router-dom"
import Anchor from "./Anchor"
import PropTypes from "prop-types"


const Header = () => {

    return (
        <header className="flex justify-between items-center px-2 pt-2 bg-blue-200 md:px-4 lg:px-8">
        <img src="/src/images/logo2.jpg" className="h-14 md:h-20"/>
            <nav className="flex gap-x-2 md:gap-x-6 lg:gap-x-16">
                {
                    links_header.map(a => {
                       return <Anchor key={a.href} href={a.href} text={a.text}>{a.text}</Anchor>
                    })
                }
            </nav>
        <Link to={"/home"}><img src="/src/images/pngegg.png" className="h-4 md:h-8"></img></Link>           
        </header>
    )


}


const links_header = [
{href:"/", text:"Accounts"}, 
{href:"/cards", text:"Cards"},
{href:"/transaction", text:"Transaction"},
{href:"/loan", text:"Loan"},
]
  

export default Header