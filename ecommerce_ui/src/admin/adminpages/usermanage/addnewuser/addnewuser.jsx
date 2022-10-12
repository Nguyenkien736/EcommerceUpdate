import "./addnewuser.css"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import Datatable from "../../../admincomponents/itemlist/itemlist"
import { Button } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const AddNewUser = () => {
  const [username, setUsername] = useState()
  const [userfullname, setUserfullname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState()
  const [invalid,setInvalid] = useState(false)
  const [err,setErr] = useState({})
  const [status,setStatus] = useState(0)
  const handleAddUser = async () => {
    const response = await axios.post("/auth/register", {
      username: username,
      password: password,
      userfullname: userfullname,
      email: email,
      role: role
    }).catch(error => {
      console.log(error)
      setErr(err)
      setInvalid(true)
    })
   
    setStatus(response.status)
    if(response.status==200) {
      alert("Create successful!!!")        
    }

  }
  useEffect(()=>{

  },[invalid])
  return (
    
    <div className="add-user-wrapper">
      <AdminSidebar />
      <div className="add-user-body-wrapper">
        <AdminNavbar />
        <div className="add-user-body">
          <div className="add-user-tab">
            <div className="add-user-field">
              <label>User name</label>
              <input onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className="add-user-field">
              <label>Name</label>
              <input onChange={(e) => setUserfullname(e.target.value)}></input>
            </div>

            <div className="add-user-field">
              <label>Email address</label>
              <input onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className="add-user-field">
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="add-user-field">
              <label>Role</label>
              <input onChange={(e) => setRole(e.target.value)}></input>
            </div>
            <div className="function-add-user">
              <Button onClick={handleAddUser}>Add new user</Button>
            </div>
            {
              <div hidden={!invalid}>Invalid</div>
            }
             </div>

        </div>
      </div>
    </div>
  )
}

export default AddNewUser