import { Navigate, useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate()
    return(

        <div>
            {
                localStorage.clear()   
            }
            {
                window.location.href = "http://localhost:3000/home"
            }
            {
                console.log("HH")
            }
        
        </div>
    )
}