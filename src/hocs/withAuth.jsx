import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"

const withAuth = (Component) => {
    
    let swal = Swal

    const Auth = () => {
        const user = useSelector((store) => store.authReducer.user)
        const token = localStorage.getItem('token')
        if (!token){
            return <Navigate to={"/login"}/>
        }

        const decoded = jwtDecode(token).exp

        if (decoded < new Date().getTime() / 1000) {
            localStorage.removeItem('token')
            return swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your session has expired, please login again',
            })
        }

        return <Component/>
    }

    return Auth

}

export default withAuth