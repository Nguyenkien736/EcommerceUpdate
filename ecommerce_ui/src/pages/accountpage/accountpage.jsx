import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../accountpage/accountpage.css"
export default function Accountpage(){
    return(
        <div className="accountpagebody">  
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="accountbody">
                <div className="menubar">
                    <div>My order</div>
                    <hr></hr>
                    <div>My info</div>
                    <hr></hr>
                    <div>My ratting</div>
                </div>
                <div className="infobarWrapper">
                <div className="infobar">
                    <div className="personalinfo">
                        <div><h2>Your personal info</h2></div>
                    <div className="info">Name: <input readOnly></input></div>
                <hr></hr>
                <div className="info">username: <input readOnly></input></div>
                <hr></hr>
                <div className="info">dob: <input type="date" readOnly></input></div>
                <hr></hr>
                <div className="info">Phone num: <input readOnly></input></div>
                <hr></hr>
                    </div>
                <div className="contact">
                    <div><h2>Your email and adress</h2></div>
                <div className="info">Adrress: <input readOnly type="email"></input></div>
                <hr></hr>
                <div className="info">email: <input readOnly></input></div>
                <hr></hr>
               
                </div>
               
                

                </div>
                <button className="updatebutton">Update your account</button>
                </div>

                

            </div>
        </div>
    )
}