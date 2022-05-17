import '../loginpage/login.css'
import axios from 'axios'
import { useState,useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

export default function LoginPage(){
    const {user} =useContext(AuthContext)
    
    const [password,setPassword] = useState("")
    
    const [email,setEmail] = useState("")
    
    const [err,setErr] = useState({})
    const [invalid,setInvalid] =useState(false)
    const [status,setStatus] = useState("")

    const {isFetching, dispatch} = useContext(AuthContext)
    
    useEffect(()=>{

    },[status])
    
    

    const handleSubmit=async (e)=>{
        e.preventDefault()
        loginCall({
            email:email,
            password:password
        },dispatch)

        const login= async ()=>{
            const response = await axios.post("/auth/login",{  
                password: password,           
                email:email
            }).catch(error=>{
                console.log(error)
                
            })
            
            const data = await response.data
            const stat = await response.status
            setStatus(stat)
            return data
           

        }
        try{
            const new_user = await login()
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
                status==200 && <Navigate to='/home'></Navigate>
                
            }
            {
                user && <Navigate to='/home'></Navigate>
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
                        <label>Email Address</label>
                        <input onInput={e=>{setEmail(e.target.value)}}></input>

                        </div>
                        
                        <hr></hr>
                        <div className='attribute'>
                        <label>Password</label>
                        <input onInput={e=>{setPassword(e.target.value)}}></input>

                        </div>
                        
                        <hr></hr>
                        <input type="submit" value={isFetching?"Loading":"Login"} id='summitbutton'></input>
                        {
                            err&&(<div hidden={!invalid}>Invalid</div> )
                        }
                        
                       
                    </form>


                </div>

            </div>
        </div>
    )
}