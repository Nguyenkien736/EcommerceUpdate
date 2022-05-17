import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../accountpage/myratting.css"
export default function Rattingpage(){
    return(
        <div className="myrattingpagebody">  
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="myrattingbody">
                <div className="menubar">
                    <div>My order</div>
                    <hr></hr>
                    <div>My info</div>
                    <hr></hr>
                    <div>My ratting</div>
                </div>
                <div className="rattingsbarWrapper">

                    <div>item</div>
                    <div>Price</div>
                    <div>Ratting</div>
               
                

                </div>
            </div>
        </div>
    )
}