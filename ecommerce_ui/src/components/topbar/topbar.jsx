import "../topbar/topbar.css"
import Searchbar from "../searchbar/searchbar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid } from "@mui/material";
import { useContext,useState,useEffect } from "react";
import {AuthContext} from "../../context/AuthContext"

export default function Topbar(){
    const {user} = useContext(AuthContext)
    
    
    const [loggedin,setLoggedin] = useState(false)
    //setLoggedin(user)
    


    return (
        <div className="topbarbody">
            {
                console.log(user)
            }
            <div className="logo">
                <div>E-COMMERCE</div></div>
            <div className="middle">
                <Searchbar></Searchbar>
            </div>
            <div className="right">
                <Grid container alignItems='center' flexDirection='column'>
                <ShoppingCartIcon>
                    
                    </ShoppingCartIcon>
                    Shopping cart
    

                </Grid>
                <Grid container alignItems="center" flexDirection="column">
                                <AccountCircleIcon></AccountCircleIcon>
                                 Your Account
                                </Grid>
                        {
                            user?(
                                <Grid container alignItems="center" flexDirection="column">
                
                    <LogoutIcon>

                    </LogoutIcon>
                    Logout
                
               
                </Grid>

                            ):(
                                <Grid container alignItems="center" flexDirection="column">
                
                                <LoginIcon>
            
                                </LoginIcon>
                                Login
                            
                           
                            </Grid>

                            )

                        }
                
               
            </div>
        </div>
    )
}