import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../accountpage/accountpage.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useEffect } from "react"
import axios from "axios"
import Footer from "../../components/botbar/botbar"

export default function Accountpage() {
    const { user } = useContext(AuthContext)



    const [editable, setEditable] = useState(false)

    const [updateClicked, setUpdateCliked] = useState(false)

    const [userfullname, setUserfullname] = useState(user.userfullname)

    const [username, setUsername] = useState(user.username)

    const [phone, setPhone] = useState(user.phonenumber)

    const [dob, setDob] = useState(user.dob)

    const [email, setEmail] = useState(user.email)

    const [address, setAddress] = useState(user.address)

    useEffect(() => {
        setEditable(false)
        async function fetchdata() {
            const resposne = await axios.get("/user/userinfo/" + user._id)
            setUserfullname(resposne.data.userfullname)
            setUsername(resposne.data.username)
            setPhone(resposne.data.phonenumber)
            setDob(resposne.data.dob)
            setEmail(resposne.data.email)
            setAddress(resposne.data.address)
            console.log(resposne.data.dob)
        }
        fetchdata()
    }, [updateClicked])


    function handleUpdateButtonClicked() {
        setUpdateCliked(true)
        console.log(editable)
        const collection = document.getElementsByClassName("inputfield")
        for (let i = 0; i < collection.length; i++) {
            collection[i].readOnly = false;
        }
        //const updateButt = document.getElementById("updtbutt")
        //updateButt.disabled = true
        //const saveButt = document.getElementById("savebutt")
        //saveButt.disabled = false

    }
    async function handleSaveClicked() {

        const response = await axios.post("/user/updateinfo", {
            userid: user._id,
            username: username,
            userfullname: userfullname,
            phonenumber: phone,
            email: email,
            dob: dob,
            address: address
        })
        if (response.status == 200)
            alert("Update sucessfull")
        setUpdateCliked(false)
        const collection = document.getElementsByClassName("inputfield")
        for (let i = 0; i < collection.length; i++) {
            collection[i].readOnly = true;
        }

    }

    return (
        <div className="accountpagebody">
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="accountbody">
                <div className="menubar">
                    <div><Link to={"/myorder"}>My order</Link></div>
                    <hr></hr>
                    <div><Link to={"/account"}>My info</Link></div>
                    <hr></hr>
                    <div><Link to={"/myratting"}>My Ratting</Link></div>



                </div>
                <div className="infobarWrapper">
                    <div className="infobar">
                        <div className="personalinfo">
                            <div><h2>Your personal info</h2></div>
                            <div className="info">Name: <input readOnly className="inputfield" value={userfullname} onChange={(e) => setUserfullname(e.target.value)}></input></div>
                            <hr></hr>
                            <div className="info">username: <input className="inputfield" readOnly value={username} onChange={(e) => setUsername(e.target.value)}></input></div>
                            <hr></hr>
                            <div className="info">dob: <input readOnly className="inputfield" type="date" value={dob ? (new Date(dob)).toISOString().split('T')[0] : (new Date()).toISOString().split('T')[0]} onChange={(e) => setDob(e.target.value)}></input></div>
                            <hr></hr>
                            <div className="info">Phone num: <input readOnly className="inputfield" value={phone} onChange={(e) => setPhone(e.target.value)}></input></div>
                            <hr></hr>
                        </div>
                        <div className="contact">
                            <div><h2>Your email and adress</h2></div>
                            <div className="info">Email: <input readOnly className="inputfield" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input></div>
                            <hr></hr>
                            <div className="info">Address: <input readOnly className="inputfield" value={address} onChange={(e) => setAddress(e.target.value)}></input></div>
                            <hr></hr>

                        </div>



                    </div>
                    <div className="buttonGroup">
                        <button className="updatebutton" id="updtbutt" disabled={updateClicked} onClick={handleUpdateButtonClicked}>Update your account</button>
                        <button className="updatebutton" id="savedbutt" disabled={!updateClicked} onClick={handleSaveClicked}>Save</button>
                    </div>
                </div>



            </div>
            <Footer></Footer>
        </div>
    )
}