import '../registerpage/register.css'
import axios from 'axios'
import { useState,useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function RegisterPage(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [userfullname,setUserfullname] = useState("")
    const [email,setEmail] = useState("")
    const [newuser,setNewuser] = useState({})
    const [err,setErr] = useState({})
    const [invalid,setInvalid] =useState(false)
    const [status,setStatus] = useState("")
    const {user} = useContext(AuthContext)
    useEffect(()=>{

    },[status])
    
    

    const handleSubmit=async (e)=>{
        e.preventDefault()

        const register= async ()=>{
            const response = await axios.post("/auth/register",{
                username: username,
                password: password,
                userfullname: userfullname,
                email:email,
                role:"client"
            }).catch(error=>{
                console.log(error)
                
            })
            
            const data = await response.data
            const stat = await response.status
            setStatus(stat)
            return data
           

        }
        try{
            const new_user = await register()
            console.log(new_user)
        }catch(e){
            console.log(e)
            setErr(e)
            setInvalid(true)
        }
        
        

    }
    return(
        <div className='body'>
            {
                status==200 && <Navigate to='/login'></Navigate>
            }
            {
                user && <Navigate to={'/home'}></Navigate>
            }
            <div className="templateWrapper">
                <div className="banner">
                    <h2 className='pageTittle'>  
                    Welcome to Ecommerce
                    </h2>
                    

                </div>
                <div className="formWrapper">
                    <form onSubmit={(e)=>{handleSubmit(e)}} className="formBody">
                        <div className='attribute'>
                        <label>Username</label>
                        <input onInput={e=>{setUsername(e.target.value)}}></input>

                        </div>
                        
                        <hr></hr>
                        <div className='attribute'>
                        <label>Your Name</label>
                        <input onInput={e=>{setUserfullname(e.target.value)}}></input>
                        

                        </div>
                        <hr></hr>
                        <div className='attribute'>
                        <label>Email Address</label>
                        <input onInput={e=>{setEmail(e.target.value)}}></input>

                        </div>
                        
                        <hr></hr>
                        <div className='attribute'>
                        <label>Password</label>
                        <input onInput={e=>{setPassword(e.target.value)}}></input>

                        </div>
                        
                        <hr></hr>
                        <input type="submit" value="Create my account" id='summitbutton'></input>
                        {
                            err&&(<div hidden={!invalid}>Invalid</div> )
                        }
                        
                       
                    </form>


                </div>

            </div>
        </div>
    )
}