import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
const Logout = () =>{
    const Navigate=useNavigate()
    const handlelog=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("userdetails")
        Navigate('/login')
    }
    return(
        <Button variant="contained" style={{backgroundColor:"red", fontWeight:"bold"}} onClick={handlelog}>
            Logout
        </Button>
    )
}
export default Logout;