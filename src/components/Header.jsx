import { Link, Navigate, useNavigate } from "react-router-dom"
import Anchor from "./Anchor"
import PropTypes from "prop-types"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import authActions from "../redux/actions/auth.actions"


const Header = () => {


    function handleClick(e){
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#666666",
            confirmButtonText: "Yes, logout"
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear()
              window.location.reload()
              }
          });
    }

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
            <img src="/pngegg.png" className="h-4 md:h-8 hover:cursor-pointer hover:scale-105" onClick={handleClick}></img>
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