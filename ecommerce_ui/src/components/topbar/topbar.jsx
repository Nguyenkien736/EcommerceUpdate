import "../topbar/topbar.css"
import Searchbar from "../searchbar/searchbar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom";

export default function Topbar() {


    const { user } = useContext(AuthContext)
    const [loggedin, setLoggedin] = useState(false)
    //setLoggedin(user)
    useEffect(() => {
        console.log(user)
    }, [user]);


    return (
        <div className="topbarbody">
            {
                console.log(user)
            }
            <div className="logo">
                <Link to={"/"}>
                    <div>E-COMMERCE</div>
                </Link>
            </div>
            <div className="middle">
                <Searchbar></Searchbar>
            </div>
            <div className="right">
                <Link to={"/cartpage"} className="linkright">
                    <Grid container alignItems='center' flexDirection='column'>

                        <ShoppingCartIcon>

                        </ShoppingCartIcon>
                        Shopping cart


                    </Grid>
                </Link>
                <Link to={user ? "/account" : "/register"} className="linkright">
                    <Grid container alignItems="center" flexDirection="column">

                        <AccountCircleIcon></AccountCircleIcon>
                        Your Account

                    </Grid>
                </Link>
                {
                    user ? (
                        <Link to={"/logout"} className="linkright">
                            <Grid container alignItems="center" flexDirection="column">

                                <LogoutIcon>

                                </LogoutIcon>
                                Logout

                            </Grid>
                        </Link>


                    ) : (
                        <Link to={"/login"} className="linkright">
                            <Grid container alignItems="center" flexDirection="column">

                                <LoginIcon>

                                </LoginIcon>
                                Login


                            </Grid>
                        </Link>


                    )

                }


            </div>
        </div>
    )
}