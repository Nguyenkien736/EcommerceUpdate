import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../accountpage/myorder.css"
export default function Orderpage(){
    return(
        <div className="myorderpagebody">  
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="myorderbody">
                <div className="menubar">
                    <div>My order</div>
                    <hr></hr>
                    <div>My info</div>
                    <hr></hr>
                    <div>My ratting</div>
                </div>
                <div className="ordersbarWrapper">
                    <div>Status</div>
                    <div>item</div>
                    <div>Price</div>
                    <div>quanity</div>
                    <div>total</div>
               
                

                </div>
            </div>
        </div>
    )
}